// =====================================================
// VALIDATION RULES - Aturan Validasi Form
// =====================================================
// File ini berisi aturan untuk mengecek apakah input user benar
// Menggunakan library ZOD untuk validasi TypeScript

import { z } from 'zod';

// ===== Konfigurasi Validasi File =====
// Aturan untuk file gambar yang boleh diupload
const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB dalam bytes (1MB = 1024KB, 1KB = 1024 bytes)
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// ===== Schema Validasi dengan ZOD =====
// Schema = template aturan validasi
// Setiap field punya aturannya masing-masing

export const submissionSchema = z.object({
  // ----- Field Name (Nama) -----
  name: z
    .string()                                          // Harus berupa text
    .min(2, 'Nama minimal 2 karakter')                 // Minimal 2 huruf
    .max(100, 'Nama maksimal 100 karakter')            // Maksimal 100 huruf
    .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh huruf dan spasi'),  // Hanya huruf & spasi

  // ----- Field Email -----
  email: z
    .string()
    .min(1, 'Email wajib diisi')                       // Tidak boleh kosong
    .email('Format email tidak valid')                 // Harus format email yang benar
    .max(255, 'Email terlalu panjang'),

  // ----- Field Phone (Nomor Telepon) -----
  phone: z
    .string()
    .min(1, 'Nomor telepon wajib diisi')
    // Regex untuk nomor telepon Indonesia:
    // ^(\+62|62|0) = diawali +62, 62, atau 0
    // [0-9]{9,12}$ = diikuti 9-12 digit angka
    .regex(
      /^(\+62|62|0)[0-9]{9,12}$/,
      'Format nomor telepon tidak valid (contoh: 08123456789 atau +628123456789)'
    ),

  // ----- Field Image (File Gambar) -----
  image: z
    .instanceof(File, { message: 'Gambar wajib diupload' })  // Harus berupa File object
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,            // Cek ukuran file
      'Ukuran file maksimal 5MB'
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),  // Cek tipe file
      'Format file harus JPG, PNG, atau WEBP'
    )
    .optional()  // Optional karena saat edit bisa tidak upload image baru
    .or(z.null()) // Atau bisa null (kosong)
});

// ===== Type untuk Form Data =====
// Tipe data yang dihasilkan dari schema di atas
// z.infer = ambil type dari zod schema
export type SubmissionFormData = z.infer<typeof submissionSchema>;

// ===== Fungsi Helper untuk Validasi Manual =====
// Fungsi ini bisa dipanggil manual kalau butuh validasi di luar react-hook-form

/**
 * Validasi Email secara manual
 * @param email - String email yang mau dicek
 * @returns true jika valid, false jika tidak
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validasi Phone secara manual
 * @param phone - String nomor telepon yang mau dicek
 * @returns true jika valid, false jika tidak
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone);
};

/**
 * Validasi File Image
 * @param file - File object dari input
 * @returns Object dengan isValid dan errorMessage
 */
export const validateImageFile = (
  file: File
): { isValid: boolean; errorMessage?: string } => {
  // Cek ukuran file
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      errorMessage: `File terlalu besar. Maksimal 5MB. Ukuran file Anda: ${(
        file.size /
        1024 /
        1024
      ).toFixed(2)}MB`,
    };
  }

  // Cek tipe file
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      errorMessage: `Format file tidak didukung. Gunakan JPG, PNG, atau WEBP. Format Anda: ${file.type}`,
    };
  }

  return { isValid: true };
};

// ===== Export Constants =====
// Export konstanta agar bisa dipakai di file lain
export { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES };

