// =====================================================
// SUBMISSION TYPES - Cetak Biru Data untuk Form
// =====================================================
// File ini mendefinisikan "bentuk" data yang kita gunakan
// Seperti blueprint rumah sebelum dibangun

// ===== Interface untuk Data Submission =====
// Interface = kontrak yang menjelaskan struktur data
export interface Submission {
  id: string;                // ID unik dari database
  name: string;              // Nama user
  email: string;             // Email user
  phone: string;             // Nomor telepon
  imageUrl: string;          // Path/URL gambar yang diupload
  imageName: string;         // Nama file gambar original
  createdAt: string;         // Kapan data dibuat (timestamp)
  updatedAt: string;         // Kapan data terakhir diupdate
}

// ===== Interface untuk Form Input =====
// Ini data yang USER isi di form (sebelum kirim ke backend)
export interface SubmissionFormData {
  name: string;
  email: string;
  phone: string;
  image: File | null;        // File gambar, bisa kosong (null)
}

// ===== Interface untuk Response dari Backend =====
// Ketika backend kirim response, formatnya seperti ini

// Response Sukses (201 Created atau 200 OK)
export interface SubmissionResponse {
  success: true;
  message: string;
  data: Submission;          // Data submission yang berhasil dibuat
}

// Response Error (400, 404, 500, dll)
export interface ErrorResponse {
  success: false;
  message: string;           // Pesan error utama
  errors?: string[];         // Array error detail (optional)
}

// ===== Interface untuk Response GET All Submissions =====
// Kalau kita ambil banyak data sekaligus (dengan pagination)
export interface PaginationMetadata {
  page: number;              // Halaman ke berapa
  limit: number;             // Berapa data per halaman
  total: number;             // Total semua data
}

export interface SubmissionsListResponse {
  success: true;
  data: Submission[];        // Array berisi banyak submission
  pagination: PaginationMetadata;
}

// ===== Union Type untuk API Response =====
// Response bisa sukses atau error, ini gabungan keduanya
export type ApiResponse = SubmissionResponse | ErrorResponse;

// ===== Type untuk Status Upload =====
// Status saat upload gambar
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

// 'idle' = belum upload
// 'uploading' = sedang proses upload
// 'success' = upload berhasil
// 'error' = upload gagal

