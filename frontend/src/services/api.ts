// =====================================================
// API SERVICE - Jembatan Komunikasi dengan Backend
// =====================================================
// File ini mengatur semua request HTTP ke backend
// Menggunakan library AXIOS untuk HTTP client

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  SubmissionFormData,
  SubmissionResponse,
  SubmissionsListResponse,
  ErrorResponse,
} from '../types/submission.types';

// ===== Konfigurasi Base URL =====
// URL backend, diambil dari environment variable
// Default: http://localhost:5000/api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ===== Buat Instance Axios =====
// Instance = object axios yang sudah dikonfigurasi
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,              // Base URL untuk semua request
  timeout: 30000,                     // Timeout 30 detik (30000 milliseconds)
  headers: {
    'Content-Type': 'application/json', // Default header
  },
});

// ===== REQUEST INTERCEPTOR =====
// Interceptor = fungsi yang jalan sebelum request dikirim
// Berguna untuk: tambah token, log request, dll
apiClient.interceptors.request.use(
  (config) => {
    // Log request (berguna untuk debugging)
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });

    // Kalau ada token authentication, bisa ditambahkan di sini
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    // Kalau ada error sebelum request dikirim
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ===== RESPONSE INTERCEPTOR =====
// Interceptor = fungsi yang jalan setelah dapat response dari backend
// Berguna untuk: handle error, transform data, dll
apiClient.interceptors.response.use(
  (response) => {
    // Log response sukses (untuk debugging)
    console.log('✅ API Response:', {
      status: response.status,
      data: response.data,
    });

    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Log error response
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors,
    });

    // Bisa handle error spesifik di sini
    // Misal: redirect ke login kalau 401 Unauthorized

    return Promise.reject(error);
  }
);

// =====================================================
// API FUNCTIONS - Fungsi untuk Request ke Backend
// =====================================================

/**
 * CREATE SUBMISSION - Kirim data form ke backend
 * 
 * @param formData - Data dari form (name, email, phone, image)
 * @param onUploadProgress - Callback untuk track progress upload
 * @returns Promise dengan response submission yang berhasil dibuat
 * 
 * Cara pakai:
 * const result = await createSubmission(formData, (progress) => {
 *   console.log(`Upload ${progress}%`);
 * });
 */
export const createSubmission = async (
  formData: SubmissionFormData,
  onUploadProgress?: (progressPercent: number) => void
): Promise<SubmissionResponse> => {
  try {
    // Buat FormData object (untuk kirim file)
    // FormData = format khusus untuk upload file
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    
    // Append image kalau ada
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    // Kirim POST request ke backend
    const response = await apiClient.post<SubmissionResponse>(
      '/submissions',  // Endpoint: POST /api/submissions
      formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Header khusus untuk file upload
        },
        // Track progress upload
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onUploadProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(percentCompleted);
          }
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle error dan throw dengan format yang consistent
    handleApiError(error);
    throw error; // TypeScript butuh ini setelah handleApiError
  }
};

/**
 * GET ALL SUBMISSIONS - Ambil semua data submission
 * 
 * @param page - Nomor halaman (default: 1)
 * @param limit - Jumlah data per halaman (default: 10)
 * @returns Promise dengan list submissions dan pagination info
 * 
 * Cara pakai:
 * const result = await getAllSubmissions(1, 10);
 */
export const getAllSubmissions = async (
  page: number = 1,
  limit: number = 10
): Promise<SubmissionsListResponse> => {
  try {
    const response = await apiClient.get<SubmissionsListResponse>(
      '/submissions',
      {
        params: { page, limit }, // Query params: ?page=1&limit=10
      }
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

/**
 * GET SUBMISSION BY ID - Ambil 1 submission berdasarkan ID
 * 
 * @param id - ID submission yang mau diambil
 * @returns Promise dengan data submission
 * 
 * Cara pakai:
 * const submission = await getSubmissionById('uuid-123');
 */
export const getSubmissionById = async (
  id: string
): Promise<SubmissionResponse> => {
  try {
    const response = await apiClient.get<SubmissionResponse>(
      `/submissions/${id}` // Endpoint: GET /api/submissions/:id
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// =====================================================
// ERROR HANDLER - Fungsi untuk Handle Error
// =====================================================

/**
 * Handle API Error dengan format consistent
 * Fungsi ini mengubah error axios jadi format yang mudah dibaca
 */
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    // Kalau ada response dari backend
    if (axiosError.response) {
      const errorData = axiosError.response.data;
      
      // Throw error dengan message dari backend
      throw new Error(
        errorData?.message || 'Terjadi kesalahan pada server'
      );
    }

    // Kalau request dikirim tapi tidak ada response (network error)
    if (axiosError.request) {
      throw new Error(
        'Tidak dapat terhubung ke server. Cek koneksi internet Anda.'
      );
    }
  }

  // Error lain yang tidak expected
  throw new Error('Terjadi kesalahan yang tidak diketahui');
};

// ===== Export apiClient untuk custom request =====
// Kalau butuh custom request di luar fungsi yang sudah dibuat
export default apiClient;

