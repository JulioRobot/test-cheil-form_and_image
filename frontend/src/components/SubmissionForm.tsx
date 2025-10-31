// =====================================================
// SUBMISSION FORM COMPONENT
// =====================================================
// Form utama untuk submission dengan fitur:
// - Validasi menggunakan react-hook-form + zod
// - Image upload integration
// - Loading states
// - Error handling
// - Success notification

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submissionSchema } from '../utils/validation';
import { useSubmission } from '../hooks/useSubmission';
import { ImageUpload } from './ImageUpload';
import type { SubmissionFormData } from '../types/submission.types';

// ===== Component =====
export const SubmissionForm = () => {
  // ----- Custom Hook untuk Submission Logic -----
  const {
    submitForm,
    isSubmitting,
    uploadProgress,
    submitSuccess,
    submitError,
    resetSubmission,
  } = useSubmission();

  // ----- React Hook Form Setup -----
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      image: null,
    },
  });

  // Watch image field untuk sync dengan ImageUpload component
  const imageFile = watch('image');

  // ===== Handle Image Select =====
  const handleImageSelect = (file: File | null) => {
    setValue('image', file, { shouldValidate: true });
  };

  // ===== Handle Form Submit =====
  const onSubmit = async (data: SubmissionFormData) => {
    try {
      // Submit menggunakan custom hook
      await submitForm(data);

      // Reset form setelah 3 detik jika success
      setTimeout(() => {
        reset();
        resetSubmission();
      }, 3000);
    } catch (error) {
      // Error sudah dihandle di custom hook
      // Bisa tambah logic tambahan di sini jika perlu
      console.error('Form submission failed:', error);
    }
  };

  // ===== Handle Reset Form =====
  const handleReset = () => {
    reset();
    resetSubmission();
  };

  // ===== Render Component =====
  return (
    <div className="submission-form-container">
      {/* Success Notification */}
      {submitSuccess && (
        <div className="notification notification-success" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div>
            <h4>Submission Berhasil!</h4>
            <p>Data Anda telah berhasil dikirim.</p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {submitError && (
        <div className="notification notification-error" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <h4>Submission Gagal</h4>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="submission-form" noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nama Lengkap <span className="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="Masukkan nama lengkap Anda"
            disabled={isSubmitting}
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="error-text" id="name-error" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            placeholder="contoh@email.com"
            disabled={isSubmitting}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="error-text" id="email-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Nomor Telepon <span className="required">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={`form-input ${errors.phone ? 'input-error' : ''}`}
            placeholder="08123456789 atau +628123456789"
            disabled={isSubmitting}
            {...register('phone')}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <span className="error-text" id="phone-error" role="alert">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Image Upload Field */}
        <div className="form-group">
          <label className="form-label">
            Upload Gambar <span className="required">*</span>
          </label>
          <ImageUpload
            onImageSelect={handleImageSelect}
            error={errors.image?.message}
            disabled={isSubmitting}
            value={imageFile}
          />
        </div>

        {/* Progress Bar */}
        {isSubmitting && uploadProgress > 0 && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
                role="progressbar"
                aria-valuenow={uploadProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <span className="progress-text">{uploadProgress}% Uploaded</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" />
                Mengirim...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

