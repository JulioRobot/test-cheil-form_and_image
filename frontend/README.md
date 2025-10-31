# Cheil Submission Form - Frontend

Frontend application untuk Cheil submission form dengan upload gambar, dibangun dengan React, TypeScript, dan Vite.

## 🚀 Teknologi yang Digunakan

- **React 19** - Library UI untuk membuat tampilan interaktif
- **TypeScript** - JavaScript dengan type safety
- **Vite** - Build tool yang cepat dan modern
- **Axios** - HTTP client untuk komunikasi dengan backend
- **React Hook Form** - Library untuk handle form dengan mudah
- **Zod** - Schema validation untuk form

## 📁 Struktur Folder

```
frontend/
├── src/
│   ├── components/        # Komponen React
│   │   └── common/        # Komponen reusable
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types/interfaces
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Komponen utama
│   ├── main.tsx           # Entry point aplikasi
│   └── style.css          # Global styles
├── public/                # Static assets
├── .env                   # Environment variables (local)
├── .env.example           # Template environment variables
├── vite.config.ts         # Konfigurasi Vite
└── tsconfig.json          # Konfigurasi TypeScript
```

## 🔧 Setup & Installation

### 1. Install Dependencies

Pastikan Anda sudah berada di folder `frontend/`:

```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

Buat file `.env` dari template `.env.example`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

Sesuaikan nilai di file `.env` jika diperlukan:

```env
VITE_API_URL=http://localhost:3000/api
VITE_MAX_FILE_SIZE=5242880
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:5173`

Browser akan otomatis terbuka.

## 📝 Available Scripts

- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build

## 🎯 Cara Kerja (Untuk Pemula)

### 1. **main.tsx** (Entry Point)

File ini adalah "pintu masuk" aplikasi. Di sini React di-render ke HTML.

### 2. **App.tsx** (Komponen Utama)

File ini adalah komponen utama yang menampung semua komponen lain.

### 3. **Components** (Komponen-komponen)

Folder ini akan berisi komponen-komponen UI seperti:

- `SubmissionForm.tsx` - Form input data
- `ImageUpload.tsx` - Upload gambar dengan preview

### 4. **Services** (API Communication)

Folder ini akan berisi code untuk komunikasi dengan backend API.

### 5. **Types** (TypeScript Interfaces)

Folder ini berisi definisi tipe data untuk TypeScript.

### 6. **Utils** (Helper Functions)

Folder ini berisi fungsi-fungsi pembantu seperti validasi.

## 🌐 Environment Variables

| Variable                  | Description                  | Default                           |
| ------------------------- | ---------------------------- | --------------------------------- |
| `VITE_API_URL`            | URL endpoint backend API     | `http://localhost:3000/api`       |
| `VITE_MAX_FILE_SIZE`      | Maximum ukuran file (bytes)  | `5242880` (5MB)                   |
| `VITE_ALLOWED_FILE_TYPES` | Tipe file yang diperbolehkan | `image/jpeg,image/png,image/webp` |

## 📚 Langkah Selanjutnya

Setelah setup frontend selesai, langkah berikutnya adalah:

1. ✅ Setup struktur frontend (SELESAI)
2. 🔄 Buat TypeScript types dan utilities
3. 🔄 Buat API service untuk komunikasi dengan backend
4. 🔄 Buat komponen SubmissionForm
5. 🔄 Buat komponen ImageUpload
6. 🔄 Integrasi dengan backend API

## 🆘 Troubleshooting

### Port 5173 sudah digunakan?

Edit `vite.config.ts` dan ubah port:

```typescript
server: {
  port: 3001, // Ganti dengan port lain
}
```

### Dependencies error?

Hapus `node_modules` dan install ulang:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📖 Resources untuk Belajar

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Hook Form](https://react-hook-form.com/)

---

**Happy Coding! 🎉**
