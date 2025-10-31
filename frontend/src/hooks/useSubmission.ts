// =====================================================
// CUSTOM HOOK: useSubmission
// =====================================================
// Hook ini menghandle semua logic untuk submission form
// Memisahkan business logic dari UI component
// Membuat code lebih reusable dan testable

import { useState, useCallback } from 'react';
import { createSubmission } from '../services/api';
import type { SubmissionFormData, Submission } from '../types/submission.types';

// ===== Interface untuk Return Value Hook =====
interface UseSubmissionReturn {
  // State
  isSubmitting: boolean;
  uploadProgress: number;
  submitSuccess: boolean;
  submitError: string;
  submittedData: Submission | null;

  // Functions
  submitForm: (data: SubmissionFormData) => Promise<void>;
  resetSubmission: () => void;
}

// ===== Custom Hook =====
/**
 * Custom hook untuk handle submission form
 * 
 * Features:
 * - Track loading state (isSubmitting)
 * - Track upload progress (0-100%)
 * - Handle success state
 * - Handle error state
 * - Store submitted data
 * 
 * Cara pakai:
 * const { submitForm, isSubmitting, uploadProgress, submitSuccess, submitError } = useSubmission();
 * 
 * await submitForm(formData);
 */
export const useSubmission = (): UseSubmissionReturn => {
  // ----- State Management -----
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<Submission | null>(null);

  // ===== Submit Form Function =====
  /**
   * Function untuk submit form data ke backend
   * 
   * @param data - Form data (name, email, phone, image)
   * @throws Error jika submission gagal
   */
  const submitForm = useCallback(async (data: SubmissionFormData) => {
    try {
      // Reset error state
      setSubmitError('');
      setIsSubmitting(true);
      setUploadProgress(0);
      setSubmitSuccess(false);

      // Validate: Image wajib ada
      if (!data.image) {
        throw new Error('Gambar wajib diupload');
      }

      // Validate: Image size (max 5MB)
      const maxFileSize = Number(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880; // 5MB default
      if (data.image.size > maxFileSize) {
        throw new Error(`Ukuran gambar maksimal ${Math.round(maxFileSize / 1024 / 1024)}MB`);
      }

      // Validate: Image type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(data.image.type)) {
        throw new Error('Format gambar harus JPG, PNG, atau WEBP');
      }

      console.log('📤 Submitting form data...', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        imageSize: data.image.size,
        imageType: data.image.type,
      });

      // Call API dengan progress callback
      const response = await createSubmission(data, (progress) => {
        setUploadProgress(progress);
        console.log(`⏳ Upload Progress: ${progress}%`);
      });

      // Success!
      console.log('✅ Submission Success:', response);
      setSubmittedData(response.data);
      setSubmitSuccess(true);
      setUploadProgress(100);

    } catch (error) {
      // Handle error
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Terjadi kesalahan saat submit. Silakan coba lagi.';
      
      setSubmitError(errorMessage);
      console.error('❌ Submission Error:', error);
      
      // Re-throw error untuk error handling di component
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // ===== Reset Submission Function =====
  /**
   * Reset semua state ke initial value
   * Berguna setelah success atau untuk clear error
   */
  const resetSubmission = useCallback(() => {
    setIsSubmitting(false);
    setUploadProgress(0);
    setSubmitSuccess(false);
    setSubmitError('');
    setSubmittedData(null);
    console.log('🔄 Submission state reset');
  }, []);

  // ===== Return Hook Values =====
  return {
    // State
    isSubmitting,
    uploadProgress,
    submitSuccess,
    submitError,
    submittedData,

    // Functions
    submitForm,
    resetSubmission,
  };
};

// ===== Default Export =====
export default useSubmission;

