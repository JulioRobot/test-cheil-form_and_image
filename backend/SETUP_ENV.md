# 🔐 Setup Environment Variables - Panduan Lengkap

## 📝 Langkah 1: Buat File `.env`

Karena file `.env` berisi informasi sensitif (password database), Anda harus membuatnya **secara manual**.

### Cara Membuat File `.env`:

1. Buka folder `backend/`
2. Buat file baru bernama `.env` (dengan titik di depan!)
3. Copy paste isi berikut ke dalam file `.env`:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/cheil_db"

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# CORS Configuration (Frontend URL)
CORS_ORIGIN=http://localhost:5173
```

### ⚠️ PENTING: Ganti Password Database!

Ganti `password` di `DATABASE_URL` dengan password PostgreSQL Anda yang sebenarnya:

```
DATABASE_URL="postgresql://postgres:PASSWORD_ANDA@localhost:5432/cheil_db"
```

**Contoh:**

- Jika username PostgreSQL Anda: `postgres`
- Jika password PostgreSQL Anda: `rahasia123`
- Jika database name: `cheil_db`

Maka `DATABASE_URL` nya:

```
DATABASE_URL="postgresql://postgres:rahasia123@localhost:5432/cheil_db"
```

---

## 📚 Penjelasan Environment Variables

| Variabel        | Arti                         | Default               | Keterangan                                    |
| --------------- | ---------------------------- | --------------------- | --------------------------------------------- |
| `PORT`          | Port server backend          | 5000                  | Port tempat Express.js berjalan               |
| `NODE_ENV`      | Environment mode             | development           | `development` atau `production`               |
| `DATABASE_URL`  | PostgreSQL connection string | -                     | Format: `postgresql://user:pass@host:port/db` |
| `UPLOAD_DIR`    | Folder penyimpanan upload    | ./uploads             | Lokasi gambar disimpan                        |
| `MAX_FILE_SIZE` | Max ukuran file (bytes)      | 5242880               | 5MB = 5 _ 1024 _ 1024 bytes                   |
| `CORS_ORIGIN`   | URL frontend yang diizinkan  | http://localhost:5173 | Vite default port                             |

---

## ✅ Apa yang Sudah Diimplementasikan?

### 1. Environment Variables Setup ✅

- File `.env.example` sebagai template
- File `.gitignore` untuk protect `.env`
- Semua konfigurasi menggunakan `process.env.*`

### 2. File Upload Security ✅

- **Path Traversal Protection**: Filename disanitize (hapus `../`, karakter berbahaya)
- **File Type Validation**: Double check (MIME type + extension)
- **File Size Limit**: Maksimal 5MB (configurable via `.env`)
- **Unique Filename**: Timestamp + random number
- **Whitelist Extensions**: Hanya `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### 3. Server Security ✅

- **Helmet.js**: Security headers (XSS, clickjacking protection)
- **CORS**: Hanya frontend yang authorized bisa akses API
- **Rate Limiting**: Maksimal 100 request per 15 menit per IP
- **Body Size Limit**: Maksimal 10MB untuk request body
- **Graceful Shutdown**: Disconnect database sebelum server mati

### 4. Database Security ✅

- **Connection String**: Disimpan di `.env` (tidak di kode)
- **Prisma ORM**: Automatic SQL injection prevention
- **Graceful Disconnect**: Disconnect Prisma saat shutdown

---

## 🧪 Testing Security

### Test 1: Environment Variables Loaded

```bash
cd backend
npm run dev
```

Cek di console, seharusnya muncul:

```
🚀 Server is running on port 5000
📱 Environment: development
Connected to database
```

### Test 2: File Upload - Size Limit

Coba upload file > 5MB → harus error.

### Test 3: File Upload - Type Validation

Coba upload file `.exe`, `.pdf`, atau `.txt` → harus error dengan message:

```
"Hanya file gambar (JPG, PNG, GIF, WEBP) yang diperbolehkan!"
```

### Test 4: Path Traversal Protection

Coba upload file dengan nama: `../../etc/passwd.jpg`

Seharusnya filename akan disanitize menjadi: `image-1234567890-___etc_passwd.jpg`

### Test 5: CORS Protection

Coba akses API dari domain selain `http://localhost:5173` → harus error CORS.

### Test 6: Rate Limiting

Kirim 101 request dalam 15 menit → request ke-101 harus error:

```json
{
  "success": false,
  "message": "Terlalu banyak request. Silakan coba lagi nanti."
}
```

---

## 🚨 Security Checklist

Sebelum deploy ke production:

- [ ] Ganti `NODE_ENV=production` di `.env`
- [ ] Ganti password database dengan password yang kuat
- [ ] Update `CORS_ORIGIN` ke domain production (misal: `https://yourdomain.com`)
- [ ] Pastikan `.env` ada di `.gitignore`
- [ ] Jangan pernah commit file `.env` ke Git/GitHub
- [ ] Setup SSL/HTTPS untuk production
- [ ] Setup automated database backups
- [ ] Review rate limiting settings (adjust jika perlu)
- [ ] Setup error logging (Winston/Sentry)
- [ ] Use cloud storage untuk uploads (AWS S3/Cloudinary) di production

---

## 🔥 Troubleshooting

### Error: "Cannot find module 'dotenv'"

```bash
npm install dotenv
```

### Error: "Database connection failed"

1. Pastikan PostgreSQL sudah running
2. Cek username, password, database name di `DATABASE_URL`
3. Test connection: `psql -U postgres -d cheil_db`

### File `.env` tidak kebaca

1. Pastikan nama file benar: `.env` (dengan titik di depan)
2. Pastikan file `.env` ada di folder `backend/` (root backend)
3. Pastikan ada `require('dotenv').config();` di `server.js`

### Upload folder tidak terbuat otomatis

Tidak masalah, folder akan otomatis dibuat saat ada upload pertama.

---

## 📖 Resources

- [dotenv documentation](https://github.com/motdotla/dotenv)
- [Helmet.js security guide](https://helmetjs.github.io/)
- [OWASP File Upload Security](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

**Dibuat**: Oktober 29, 2025  
**Status**: Tahap 5 Environment & Security ✅ COMPLETE
