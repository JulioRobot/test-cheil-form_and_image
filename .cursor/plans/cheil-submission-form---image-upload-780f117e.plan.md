<!-- 780f117e-c910-4a22-af4e-a533410487e9 bf1f614d-a976-43bc-84f9-b9b7e27d23c1 -->
# Rencana Implementasi: Cheil Submission Form & Image Upload

## Overview

Membangun aplikasi fullstack dengan frontend React (TypeScript + Vite) dan backend Express (JavaScript + PostgreSQL + Prisma) untuk submission form dengan upload image.

## Struktur Project

- `backend/` - Express server dengan Prisma ORM
- `frontend/` - React + TypeScript + Vite application
- `index.js` - Akan di-refactor atau digantikan oleh backend structure

## Backend Setup & Implementation

### 1. Setup Backend Structure

- Membuat folder structure `backend/` sesuai guidelines
- Install dependencies: express, cors, helmet, dotenv, multer, express-validator, @prisma/client, sharp
- Install dev dependencies: nodemon, prisma
- Setup package.json dengan scripts (dev, start, prisma:generate, prisma:migrate)

### 2. Database Configuration

- Setup Prisma: `npx prisma init`
- Create `prisma/schema.prisma` dengan model Submission (sesuai spec di rules)
- Setup `src/config/database.js` untuk Prisma Client instance
- Create database PostgreSQL (cheil_db)
- Run migration: `npx prisma migrate dev --name init`
- Generate Prisma Client

### 3. Backend Middleware & Config

- Setup multer untuk file upload di `src/config/multer.js`
- Setup validation middleware di `src/middleware/validation.js`
- Setup error handler di `src/middleware/errorHandler.js`
- Setup upload middleware di `src/middleware/upload.js`
- Configure CORS, helmet, rate limiting di `src/server.js`

### 4. Backend Routes & Controllers

- Create `src/controllers/submission.controller.js`:
- POST `/api/submissions` - Create submission dengan image upload
- GET `/api/submissions` - Get all submissions (optional)
- GET `/api/submissions/:id` - Get single submission (optional)
- Create `src/routes/submission.routes.js`
- Setup routes di `src/server.js`

### 5. Environment & Security

- Create `backend/.env` dan `backend/.env.example`
- Setup environment variables (DATABASE_URL, PORT, CORS_ORIGIN, UPLOAD_DIR, MAX_FILE_SIZE)
- Create `backend/.gitignore`
- Implement file upload security (path traversal prevention, MIME type validation)

## Frontend Setup & Implementation

### 6. Setup Frontend Structure

- Create React + TypeScript project dengan Vite di folder `frontend/`
- Install dependencies: axios, react-hook-form, zod (untuk validation)
- Setup folder structure sesuai guidelines (components, services, hooks, types, utils)
- Configure `vite.config.ts` dan `tsconfig.json`

### 7. Frontend Types & Utilities

- Create `src/types/submission.types.ts` dengan TypeScript interfaces
- Create `src/utils/validation.ts` untuk client-side validation rules
- Create `src/services/api.ts` untuk centralized API client dengan axios

### 8. Frontend Components

- Create `src/components/SubmissionForm.tsx`:
- Form dengan fields: name, email, phone, image
- Client-side validation dengan react-hook-form + zod
- Loading states dan error handling
- Success message setelah submission
- Create `src/components/ImageUpload.tsx`:
- Image preview sebelum upload
- Upload progress indicator
- File validation (size, type)
- Remove/replace image functionality
- Setup `src/App.tsx` dan `src/main.tsx`

### 9. Frontend Hooks & Integration

- Create `src/hooks/useSubmission.ts` custom hook untuk submission logic
- Connect frontend ke backend API endpoint
- Setup environment variables (`VITE_API_URL`, `VITE_MAX_FILE_SIZE`)

### 10. UI/UX & Styling

- Implement responsive design (mobile, tablet, desktop)
- Add loading spinners dan progress bars
- Style form dengan modern, clean design
- Implement error messages display
- Accessibility features (ARIA labels, keyboard navigation)

## Testing & Finalization

### 11. Testing & Validation

- Test form validation (empty fields, invalid formats)
- Test image upload (size limits, file types, preview)
- Test error handling (network errors, validation errors)
- Test database operations
- Test responsive design

### 12. Documentation & Cleanup

- Update README dengan setup instructions
- Clean up unused files (old `index.js` jika tidak diperlukan)
- Ensure `.gitignore` proper untuk uploads, .env, node_modules

## Files to be Created/Modified

### Backend:

- `backend/package.json` (new)
- `backend/src/server.js` (new)
- `backend/src/config/database.js` (new)
- `backend/src/config/multer.js` (new)
- `backend/src/controllers/submission.controller.js` (new)
- `backend/src/routes/submission.routes.js` (new)
- `backend/src/middleware/validation.js` (new)
- `backend/src/middleware/errorHandler.js` (new)
- `backend/src/middleware/upload.js` (new)
- `backend/prisma/schema.prisma` (new)
- `backend/.env.example` (new)
- `backend/.gitignore` (new)

### Frontend:

- `frontend/package.json` (new)
- `frontend/vite.config.ts` (new)
- `frontend/tsconfig.json` (new)
- `frontend/src/main.tsx` (new)
- `frontend/src/App.tsx` (new)
- `frontend/src/components/SubmissionForm.tsx` (new)
- `frontend/src/components/ImageUpload.tsx` (new)
- `frontend/src/types/submission.types.ts` (new)
- `frontend/src/services/api.ts` (new)
- `frontend/src/hooks/useSubmission.ts` (new)
- `frontend/src/utils/validation.ts` (new)
- `frontend/.env.example` (new)

### Root:

- Update atau remove `index.js` (existing)
- Update root `package.json` jika perlu untuk workspace scripts

### To-dos

- [ ] Setup backend structure: create folder, install dependencies (express, prisma, multer, etc.), setup package.json scripts
- [ ] Setup Prisma: initialize schema with Submission model, create database config, run migrations
- [ ] Create backend middleware: multer config, validation, error handler, upload middleware, CORS/helmet setup
- [ ] Implement backend routes and controllers: POST /api/submissions with image upload, GET endpoints
- [ ] Setup backend environment variables (.env.example, .gitignore) and security configurations
- [ ] Create React + TypeScript + Vite project, install dependencies (axios, react-hook-form, zod), setup folder structure
- [ ] Create TypeScript types, validation utilities, and API service layer for frontend
- [ ] Build SubmissionForm and ImageUpload components with validation, preview, and error handling
- [ ] Create custom hooks, connect frontend to backend API, setup environment variables
- [ ] Implement responsive design, loading states, progress indicators, and modern UI styling
- [ ] Test form validation, image upload, error handling, database operations, and responsive design
- [ ] Update README with setup instructions, cleanup unused files, verify .gitignore