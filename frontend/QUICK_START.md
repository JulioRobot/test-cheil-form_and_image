# 🚀 Quick Start Guide - Cheil Submission Form

## Prerequisites

- Node.js 16+ installed
- PostgreSQL database running
- Backend server configured and running

## Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Make sure `.env` file exists with correct backend URL:
```env
VITE_API_URL=http://localhost:5000/api
VITE_MAX_FILE_SIZE=5242880
```

### 3. Start Development Server
```bash
npm run dev
```

The application will start on: **http://localhost:5173**

## Testing the Application

### ✅ Test Case 1: Valid Submission
1. Open http://localhost:5173 in your browser
2. Fill in the form:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Phone:** 08123456789
   - **Image:** Upload a JPG/PNG/WEBP file (< 5MB)
3. Click **Submit**
4. Watch the progress bar fill to 100%
5. Success notification should appear
6. Form should reset after 3 seconds

**Expected:** ✅ Submission successful, data saved to database

### ❌ Test Case 2: Validation Errors
1. Try to submit empty form
   - **Expected:** All fields show error messages
2. Enter "John123" in name field
   - **Expected:** "Nama hanya boleh huruf dan spasi"
3. Enter "invalid-email" in email field
   - **Expected:** "Format email tidak valid"
4. Enter "123" in phone field
   - **Expected:** "Format nomor telepon tidak valid"
5. Upload a 10MB image
   - **Expected:** "Ukuran file maksimal 5MB"
6. Upload a PDF file
   - **Expected:** "Format file harus JPG, PNG, atau WEBP"

### 🎨 Test Case 3: Image Upload
1. Click the upload area
   - **Expected:** File browser opens
2. Drag & drop an image
   - **Expected:** Image preview appears
3. Hover over preview
   - **Expected:** Dark overlay with filename and remove button
4. Click remove button
   - **Expected:** Preview clears, back to upload state
5. Upload new image
   - **Expected:** New preview replaces old one

### 📱 Test Case 4: Responsive Design
1. Resize browser to mobile size (< 480px)
   - **Expected:** Form adapts, buttons stack vertically
2. Resize to tablet size (768px)
   - **Expected:** Form looks good, proper spacing
3. Resize to desktop (> 800px)
   - **Expected:** Form centered, full features visible

### ⌨️ Test Case 5: Accessibility
1. Use Tab key to navigate
   - **Expected:** All fields are reachable, focus visible
2. Press Enter on image upload area
   - **Expected:** File browser opens
3. Submit form with errors
   - **Expected:** First error field gets focus

## Common Issues & Solutions

### Issue: "Network Error" when submitting
**Solution:** Make sure backend server is running on port 5000
```bash
cd backend
npm run dev
```

### Issue: "CORS Error" in console
**Solution:** Check backend `.env` has correct CORS_ORIGIN:
```env
CORS_ORIGIN=http://localhost:5173
```

### Issue: Image upload fails
**Solution:** 
1. Check image size (< 5MB)
2. Check image format (JPG, PNG, WEBP only)
3. Check backend `uploads/` folder exists and is writable

### Issue: Frontend doesn't start
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between fields |
| `Shift + Tab` | Navigate backwards |
| `Enter` | Submit form (when not in text field) |
| `Esc` | Cancel file selection |
| `Space` | Open file browser (on upload area) |

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── SubmissionForm.tsx      # Main form component
│   │   ├── ImageUpload.tsx         # Image upload component
│   │   └── index.ts                # Component exports
│   ├── services/
│   │   └── api.ts                  # API client
│   ├── types/
│   │   └── submission.types.ts     # TypeScript types
│   ├── utils/
│   │   └── validation.ts           # Zod schemas
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── style.css                   # Global styles
├── .env                            # Environment variables
├── .env.example                    # Example env file
└── package.json                    # Dependencies
```

## API Endpoints Used

### POST /api/submissions
Creates a new submission with image upload

**Request:** multipart/form-data
- `name` (string)
- `email` (string)
- `phone` (string)
- `image` (file)

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "08123456789",
    "imageUrl": "/uploads/images/...",
    "createdAt": "2025-10-30T..."
  }
}
```

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder, ready to deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## Need Help?

Check these files:
- 📖 `STEP_8_COMPLETION.md` - Detailed component documentation
- 📖 `src/components/README.md` - Component API reference
- 📖 `README.md` - Full project documentation

---

Happy coding! 🎉

