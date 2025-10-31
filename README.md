# Cheil Submission Form & Image Upload

Aplikasi fullstack untuk form submission dengan upload gambar. Dibangun dengan **React + TypeScript** (frontend) dan **Express.js + PostgreSQL + Prisma** (backend).

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Prerequisites](#-prerequisites)
- [Cara Install & Setup](#-cara-install--setup)
  - [Langkah 1: Clone Repository](#langkah-1-clone-repository)
  - [Langkah 2: Install Dependencies](#langkah-2-install-dependencies)
  - [Langkah 3: Setup Database PostgreSQL](#langkah-3-setup-database-postgresql)
  - [Langkah 4: Setup Environment Variables](#langkah-4-setup-environment-variables)
  - [Langkah 5: Setup Database Schema](#langkah-5-setup-database-schema)
  - [Langkah 6: Jalankan Aplikasi](#langkah-6-jalankan-aplikasi)
- [Struktur Project](#-struktur-project)
- [Scripts yang Tersedia](#-scripts-yang-tersedia)
- [Testing API](#-testing-api)
- [Troubleshooting](#-troubleshooting)
- [Kontribusi](#-kontribusi)

---

## ✨ Fitur

- ✅ Form submission dengan validasi real-time
- ✅ Upload gambar dengan preview
- ✅ Validasi file (ukuran maks 5MB, format: JPG, PNG, WEBP)
- ✅ Responsive design untuk mobile dan desktop
- ✅ Error handling yang user-friendly
- ✅ Rate limiting untuk keamanan API
- ✅ Database PostgreSQL dengan Prisma ORM

---

## 🛠 Teknologi yang Digunakan

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM untuk database
- **Multer** - File upload handling
- **Sharp** - Image processing
- **Express Validator** - Input validation

---

## 📦 Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

1. **Node.js** (versi 18 atau lebih baru)

   - Download: [nodejs.org](https://nodejs.org/)
   - Cek versi: `node --version`

2. **PostgreSQL** (versi 14 atau lebih baru)

   - Download: [postgresql.org](https://www.postgresql.org/download/)
   - Cek versi: `psql --version`

3. **npm** atau **yarn** (biasanya sudah terinstall dengan Node.js)

   - Cek versi: `npm --version`

4. **Git** (untuk clone repository)
   - Download: [git-scm.com](https://git-scm.com/)

---

## 🚀 Cara Install & Setup

### Langkah 1: Clone Repository

```bash
git clone <repository-url>
cd test-cheil-form_and_image
```

### Langkah 2: Install Dependencies

Install dependencies untuk backend dan frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

**Windows PowerShell:**

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..\frontend
npm install
```

### Langkah 3: Setup Database PostgreSQL

1. **Buat Database PostgreSQL**

   Buka terminal/command prompt dan login ke PostgreSQL:

   ```bash
   psql -U postgres
   ```

   Atau jika menggunakan password:

   ```bash
   psql -U postgres -h localhost
   ```

2. **Buat Database Baru**

   Di dalam PostgreSQL prompt, jalankan:

   ```sql
   CREATE DATABASE cheil_db;
   \q
   ```

   **Catatan:**

   - Ganti `postgres` dengan username PostgreSQL Anda jika berbeda
   - Pastikan PostgreSQL service sudah berjalan

### Langkah 4: Setup Environment Variables

#### A. Backend Environment Variables

1. **Buat file `.env` di folder `backend/`**

   **Windows (PowerShell):**

   ```powershell
   cd backend
   Copy-Item .env.example .env
   ```

   **Mac/Linux:**

   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit file `backend/.env`** dan sesuaikan dengan konfigurasi Anda:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration (PostgreSQL)
   # GANTI password dengan password PostgreSQL Anda yang sebenarnya!
   DATABASE_URL="postgresql://postgres:password@localhost:5432/cheil_db"

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173

   # Upload Configuration
   UPLOAD_DIR=uploads/images
   MAX_FILE_SIZE=5242880

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

   **⚠️ PENTING:**

   - Ganti `password` di `DATABASE_URL` dengan password PostgreSQL Anda
   - Jika username berbeda, ganti juga `postgres`
   - Pastikan nama database `cheil_db` sesuai dengan database yang Anda buat

   **Contoh `DATABASE_URL` yang benar:**

   ```env
   DATABASE_URL="postgresql://postgres:rahasia123@localhost:5432/cheil_db"
   ```

#### B. Frontend Environment Variables

1. **Buat file `.env` di folder `frontend/`**

   **Windows (PowerShell):**

   ```powershell
   cd frontend
   Copy-Item .env.example .env
   ```

   **Mac/Linux:**

   ```bash
   cd frontend
   cp .env.example .env
   ```

2. **Edit file `frontend/.env`** (biasanya sudah benar, tapi cek kembali):

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_MAX_FILE_SIZE=5242880
   ```

   **Catatan:** Pastikan `VITE_API_URL` sesuai dengan `PORT` di backend `.env` (default: 5000)

### Langkah 5: Setup Database Schema

Jalankan migration Prisma untuk membuat tabel di database:

```bash
cd backend
npx prisma migrate deploy
```

Atau jika ingin membuat migration baru:

```bash
cd backend
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

**Verifikasi Database:**

- Database sudah dibuat ✓
- Migration sudah dijalankan ✓
- Prisma Client sudah di-generate ✓

### Langkah 6: Jalankan Aplikasi

#### A. Jalankan Backend Server

Buka terminal pertama:

```bash
cd backend
npm run dev
```

Backend akan berjalan di: **http://localhost:5000**

Anda akan melihat pesan seperti:

```
✓ Connected to database
Server running on port 5000
```

#### B. Jalankan Frontend Server

Buka terminal kedua (terminal baru):

```bash
cd frontend
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**

Browser akan otomatis terbuka ke `http://localhost:5173`

---

## 📁 Struktur Project

```
test-cheil-form_and_image/
├── backend/                  # Backend Express.js
│   ├── prisma/              # Prisma schema & migrations
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   ├── src/
│   │   ├── config/          # Konfigurasi (database, multer)
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── routes/          # API routes
│   │   └── server.js        # Entry point server
│   ├── uploads/             # Folder upload gambar (gitignored)
│   ├── .env                 # Environment variables (buat manual)
│   ├── .env.example         # Template environment variables
│   └── package.json
│
├── frontend/                 # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main component
│   │   └── main.tsx         # Entry point
│   ├── .env                 # Environment variables (buat manual)
│   ├── .env.example         # Template environment variables
│   └── package.json
│
└── README.md                # File ini
```

---

## 📜 Scripts yang Tersedia

### Backend Scripts

```bash
cd backend

npm run dev          # Jalankan development server (nodemon)
npm start            # Jalankan production server
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:seed       # Seed database (jika ada)
```

### Frontend Scripts

```bash
cd frontend

npm run dev          # Jalankan development server
npm run build        # Build untuk production
npm run preview      # Preview production build
```

---

## 🧪 Testing API

### Menggunakan Postman

File Postman collection tersedia di:

- `backend/Cheil_API_Collection.postman_collection.json`
- `backend/Cheil_API_Environment.postman_environment.json`

Import file-file ini ke Postman untuk testing API.

### API Endpoints

#### POST `/api/submissions`

Membuat submission baru dengan upload gambar

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `name` (string, required)
  - `email` (string, required)
  - `phone` (string, required)
  - `image` (file, required)

**Response:**

```json
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "imagePath": "uploads/images/...",
    "createdAt": "2025-01-30T..."
  }
}
```

#### GET `/api/submissions`

Mendapatkan semua submissions (optional)

#### GET `/api/submissions/:id`

Mendapatkan submission berdasarkan ID (optional)

---

## 🆘 Troubleshooting

### 1. Error: "Cannot connect to database"

**Solusi:**

- Pastikan PostgreSQL service sudah berjalan
- Cek `DATABASE_URL` di `backend/.env` sudah benar
- Pastikan database `cheil_db` sudah dibuat
- Cek username dan password PostgreSQL

**Cek koneksi database:**

```bash
cd backend
node test-db.js
```

### 2. Error: "Prisma Client not generated"

**Solusi:**

```bash
cd backend
npx prisma generate
```

### 3. Error: "Port 5000 already in use" (Backend)

**Solusi:**

- Ganti `PORT` di `backend/.env` ke port lain (contoh: `5001`)
- Jangan lupa update `VITE_API_URL` di `frontend/.env` juga

### 4. Error: "Port 5173 already in use" (Frontend)

**Solusi:**

- Edit `frontend/vite.config.ts` dan ubah port:
  ```typescript
  server: {
    port: 3001, // Ganti dengan port lain
  }
  ```

### 5. Error: "Module not found" atau Dependencies Error

**Solusi:**
Hapus `node_modules` dan install ulang:

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Windows PowerShell:**

```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### 6. Error: "Migration failed" atau "Table already exists"

**Solusi:**

```bash
cd backend
npx prisma migrate reset  # ⚠️ Hati-hati: ini akan menghapus semua data!
npx prisma migrate dev
```

### 7. Upload gambar gagal atau tidak tersimpan

**Solusi:**

- Pastikan folder `backend/uploads/images` sudah dibuat (biasanya dibuat otomatis)
- Cek permission folder uploads
- Cek `UPLOAD_DIR` di `backend/.env`

### 8. CORS Error di Browser

**Solusi:**

- Pastikan `CORS_ORIGIN` di `backend/.env` sesuai dengan URL frontend
- Default: `http://localhost:5173`
- Jika frontend berjalan di port lain, update `CORS_ORIGIN`

### 9. Environment Variables tidak terbaca

**Solusi:**

- Pastikan file `.env` ada di folder yang benar (`backend/` atau `frontend/`)
- Pastikan nama file benar: `.env` (dengan titik di depan)
- Restart development server setelah mengubah `.env`
- Untuk frontend, variable harus dimulai dengan `VITE_`

---

## 📝 Checklist Setup

Gunakan checklist ini untuk memastikan semua langkah sudah dilakukan:

- [ ] Node.js terinstall (versi 18+)
- [ ] PostgreSQL terinstall dan service berjalan
- [ ] Repository sudah di-clone
- [ ] Dependencies backend sudah diinstall (`cd backend && npm install`)
- [ ] Dependencies frontend sudah diinstall (`cd frontend && npm install`)
- [ ] Database PostgreSQL `cheil_db` sudah dibuat
- [ ] File `backend/.env` sudah dibuat dan dikonfigurasi
- [ ] File `frontend/.env` sudah dibuat dan dikonfigurasi
- [ ] `DATABASE_URL` di `backend/.env` sudah benar (username, password, database name)
- [ ] Migration Prisma sudah dijalankan (`npx prisma migrate deploy`)
- [ ] Prisma Client sudah di-generate (`npx prisma generate`)
- [ ] Backend server berjalan tanpa error (`npm run dev` di folder backend)
- [ ] Frontend server berjalan tanpa error (`npm run dev` di folder frontend)
- [ ] Bisa akses frontend di browser: `http://localhost:5173`
- [ ] Form submission dan upload gambar berfungsi

---

## 🔍 Verifikasi Setup Berhasil

Setelah semua langkah dilakukan, verifikasi dengan:

1. **Backend berjalan:**

   - Buka terminal backend
   - Harus melihat: `✓ Connected to database` dan `Server running on port 5000`

2. **Frontend berjalan:**

   - Buka browser ke `http://localhost:5173`
   - Halaman form harus muncul

3. **Database terhubung:**

   - Cek di terminal backend: `✓ Connected to database`
   - Tidak ada error connection

4. **Test upload gambar:**
   - Isi form di frontend
   - Upload gambar
   - Submit form
   - Harus mendapat success message

---

## 📚 Dokumentasi Tambahan

- **Frontend:** Lihat `frontend/README.md`
- **Backend Setup:** Lihat `backend/SETUP_ENV.md`
- **Postman Collection:** `backend/POSTMAN_DOCUMENTATION.md`
- **Database Example:** `backend/EXAMPLE_DATABASE_README.md`

---

## 🤝 Kontribusi

Jika menemukan bug atau ingin menambahkan fitur, silakan buat issue atau pull request.

---

## 📄 License

ISC

---
