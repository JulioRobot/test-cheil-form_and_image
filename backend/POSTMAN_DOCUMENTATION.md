# Postman Documentation - Cheil Submission API

Dokumentasi lengkap untuk testing API menggunakan Postman Collection.

## 📦 File Collection

1. **Cheil_API_Collection.postman_collection.json** - Postman Collection dengan semua endpoints
2. **Cheil_API_Environment.postman_environment.json** - Environment variables untuk development

## 🚀 Quick Start

### 1. Import Collection ke Postman

1. Buka Postman
2. Klik **Import** (tombol di kiri atas)
3. Pilih file `Cheil_API_Collection.postman_collection.json`
4. Klik **Import**

### 2. Import Environment

1. Klik **Environments** di sidebar kiri
2. Klik **Import**
3. Pilih file `Cheil_API_Environment.postman_environment.json`
4. Klik **Import**
5. Pilih environment **Cheil API - Development** dari dropdown di kanan atas

### 3. Setup Environment Variables

Pastikan environment variables sudah diset dengan benar:

- `base_url`: `http://localhost:5000` (atau sesuai PORT di `.env`)
- `submission_id`: Akan otomatis di-set setelah membuat submission baru
- `submission_email`: Akan otomatis di-set setelah membuat submission baru

## 📋 API Endpoints

### 1. Health Check

**GET** `{{base_url}}/`

Mengecek apakah API sedang berjalan.

**Response:**

```json
{
  "message": "Cheil Backend API is running",
  "timestamp": "2025-10-29T12:00:00.000Z"
}
```

---

### 2. Create Submission

**POST** `{{base_url}}/api/submissions`

Membuat submission baru dengan mengupload form data dan gambar.

**Request Type:** `multipart/form-data`

**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | ✅ Yes | Nama lengkap (2-100 karakter) |
| `email` | string | ✅ Yes | Email yang valid (unique) |
| `phone` | string | ✅ Yes | Nomor telepon (10-15 digit) |
| `image` | file | ✅ Yes | File gambar (JPG, PNG, WEBP, max 5MB) |

**Success Response (201):**

```json
{
  "success": true,
  "message": "Submission berhasil dibuat",
  "data": {
    "id": "clx1234567890abcdef",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+6281234567890",
    "imagePath": "image-1761780132541-919051091_processed.jpg",
    "imageUrl": "/uploads/image-1761780132541-919051091_processed.jpg",
    "createdAt": "2025-10-29T12:00:00.000Z",
    "updatedAt": "2025-10-29T12:00:00.000Z"
  }
}
```

**Error Response (400 - Validation Error):**

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    {
      "field": "name",
      "message": "Nama harus diisi"
    },
    {
      "field": "email",
      "message": "Format Email tidak valid"
    }
  ]
}
```

**Error Response (400 - Missing Image):**

```json
{
  "success": false,
  "message": "Gambar tidak boleh kosong"
}
```

**Validation Rules:**

- **Name:** Required, 2-100 karakter
- **Email:** Required, format email valid, harus unique
- **Phone:** Required, format valid (0-9, +, -, spasi, kurung), 10-15 digit
- **Image:** Required, file JPG/PNG/WEBP, maksimal 5MB

**Tips di Postman:**

1. Pilih method **POST**
2. Di tab **Body**, pilih **form-data**
3. Tambahkan field:
   - `name`: text
   - `email`: text
   - `phone`: text
   - `image`: File (klik untuk memilih file gambar)
4. Klik **Send**

---

### 3. Get All Submissions

**GET** `{{base_url}}/api/submissions`

Mengambil semua submission dengan pagination.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | ❌ No | 1 | Nomor halaman |
| `limit` | number | ❌ No | 10 | Jumlah item per halaman |

**Example:**

```
GET {{base_url}}/api/submissions?page=1&limit=10
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Data submissions berhasil diambil",
  "data": [
    {
      "id": "clx1234567890abcdef",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+6281234567890",
      "imagePath": "image-1761780132541-919051091_processed.jpg",
      "imageUrl": "/uploads/image-1761780132541-919051091_processed.jpg",
      "createdAt": "2025-10-29T12:00:00.000Z",
      "updatedAt": "2025-10-29T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

---

### 4. Get Submission By ID

**GET** `{{base_url}}/api/submissions/:id`

Mengambil submission berdasarkan ID.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ Yes | ID submission (UUID/CUID) |

**Example:**

```
GET {{base_url}}/api/submissions/clx1234567890abcdef
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Submission berhasil diambil",
  "data": {
    "id": "clx1234567890abcdef",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+6281234567890",
    "imagePath": "image-1761780132541-919051091_processed.jpg",
    "imageUrl": "/uploads/image-1761780132541-919051091_processed.jpg",
    "createdAt": "2025-10-29T12:00:00.000Z",
    "updatedAt": "2025-10-29T12:00:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Submission tidak ditemukan"
}
```

---

## 🧪 Automated Tests

Collection ini sudah dilengkapi dengan automated tests untuk setiap endpoint:

### Create Submission Tests

- ✅ Status code is 201
- ✅ Response has success field
- ✅ Response contains data with id, name, email, phone, imageUrl
- ✅ Auto-save submission_id dan submission_email ke environment

### Get All Submissions Tests

- ✅ Status code is 200
- ✅ Response has success field
- ✅ Response contains data array
- ✅ Response contains pagination info

### Get Submission By ID Tests

- ✅ Status code is 200
- ✅ Response has success field
- ✅ Response contains submission data dengan semua field required

### Error Handling Tests

- ✅ Validation error returns 400
- ✅ Not found returns 404

## 📝 Tips & Best Practices

### 1. Testing Flow

1. **Health Check** - Pastikan API berjalan
2. **Create Submission** - Buat submission baru (akan auto-save ID ke environment)
3. **Get All Submissions** - Cek semua submissions
4. **Get Submission By ID** - Cek submission yang baru dibuat (menggunakan saved ID)

### 2. File Upload Testing

- Gunakan file gambar dengan format JPG, PNG, atau WEBP
- Pastikan ukuran file tidak melebihi 5MB
- Test dengan berbagai ukuran dan format untuk memastikan validasi bekerja

### 3. Environment Variables

- Collection menggunakan variable `{{base_url}}` untuk base URL
- `{{submission_id}}` akan otomatis di-set setelah create submission
- `{{submission_email}}` akan otomatis di-set setelah create submission
- Pastikan environment dipilih sebelum menjalankan request

### 4. Error Testing

- Test dengan data kosong untuk validation error
- Test dengan email yang sudah ada untuk unique constraint
- Test dengan ID yang tidak valid untuk 404 error
- Test dengan file terlalu besar untuk file size validation

### 5. Running Collection

1. Klik kanan pada collection **Cheil Submission API**
2. Pilih **Run collection**
3. Pilih environment yang akan digunakan
4. Klik **Run Cheil Submission API**
5. Lihat hasil di tab **Test Results**

## 🔧 Troubleshooting

### API tidak merespons

- Pastikan server backend sedang berjalan di `http://localhost:5000`
- Cek PORT di file `.env` apakah sesuai dengan `base_url` di environment
- Test dengan endpoint Health Check terlebih dahulu

### File upload gagal

- Pastikan file yang diupload adalah gambar (JPG, PNG, WEBP)
- Pastikan ukuran file tidak melebihi 5MB
- Pastikan field name di form-data adalah `image` (bukan `file` atau lainnya)

### Environment variable tidak ter-set

- Pastikan environment **Cheil API - Development** sudah dipilih
- Pastikan request **Create Submission** berhasil (status 201)
- Cek di tab **Environment** apakah variable sudah terset

### CORS Error

- Pastikan CORS_ORIGIN di `.env` sesuai dengan origin yang digunakan
- Untuk Postman, CORS tidak menjadi masalah karena Postman bukan browser

### Database Error

- Pastikan PostgreSQL database sudah berjalan
- Pastikan DATABASE_URL di `.env` sudah benar
- Pastikan migrations sudah dijalankan: `npx prisma migrate dev`

## 📚 Additional Resources

- [Postman Documentation](https://learning.postman.com/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)

---

**Last Updated:** October 29, 2025
**API Version:** 1.0.0
