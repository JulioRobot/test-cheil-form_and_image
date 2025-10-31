# 🎣 useSubmission Hook - Quick Reference

## Import

```typescript
import { useSubmission } from "./hooks/useSubmission";
// or
import { useSubmission } from "./hooks";
```

## Usage

```typescript
const {
  // State
  isSubmitting, // boolean
  uploadProgress, // number (0-100)
  submitSuccess, // boolean
  submitError, // string
  submittedData, // Submission | null

  // Functions
  submitForm, // (data: SubmissionFormData) => Promise<void>
  resetSubmission, // () => void
} = useSubmission();
```

## Example

```typescript
import { useSubmission } from "@/hooks";

function MyForm() {
  const { submitForm, isSubmitting, submitSuccess, submitError } =
    useSubmission();

  const handleSubmit = async (formData) => {
    try {
      await submitForm(formData);
      // Success! Do something...
    } catch (error) {
      // Error is already stored in submitError state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}

      {isSubmitting && <Spinner />}
      {submitSuccess && <p>Success!</p>}
      {submitError && <p>Error: {submitError}</p>}

      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
}
```

## Validations

The hook automatically validates:

- ✅ Image is required
- ✅ File size ≤ 5MB
- ✅ File type: JPG, PNG, or WEBP

## Error Messages

Common error messages:

- `"Gambar wajib diupload"` - No image provided
- `"Ukuran gambar maksimal 5MB"` - File too large
- `"Format gambar harus JPG, PNG, atau WEBP"` - Invalid file type
- `"Tidak dapat terhubung ke server"` - Network error

## Progress Tracking

```typescript
const { uploadProgress } = useSubmission();

// uploadProgress updates automatically during upload
// Range: 0-100

<ProgressBar value={uploadProgress} />;
```

## Reset State

```typescript
const { resetSubmission } = useSubmission();

// Reset all states to initial values
const handleReset = () => {
  resetSubmission();
  // Also reset your form fields
};
```

## Full Example

```typescript
import { useForm } from "react-hook-form";
import { useSubmission } from "@/hooks";

function SubmissionForm() {
  const { register, handleSubmit, reset } = useForm();
  const {
    submitForm,
    isSubmitting,
    uploadProgress,
    submitSuccess,
    submitError,
    resetSubmission,
  } = useSubmission();

  const onSubmit = async (data) => {
    try {
      await submitForm(data);

      // Auto-reset after 3 seconds
      setTimeout(() => {
        reset();
        resetSubmission();
      }, 3000);
    } catch (error) {
      console.error("Submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input {...register("email")} />
      <input {...register("phone")} />
      <input type="file" {...register("image")} />

      {isSubmitting && (
        <div>
          <Spinner />
          <ProgressBar value={uploadProgress} />
          <p>Uploading... {uploadProgress}%</p>
        </div>
      )}

      {submitSuccess && (
        <div className="alert-success">✅ Submission successful!</div>
      )}

      {submitError && <div className="alert-error">❌ {submitError}</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

## TypeScript Types

```typescript
interface SubmissionFormData {
  name: string;
  email: string;
  phone: string;
  image: File | null;
}

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  imageName: string;
  createdAt: string;
  updatedAt: string;
}
```

## Tips

1. **Always handle errors in try-catch**

   ```typescript
   try {
     await submitForm(data);
   } catch (error) {
     // Error already in submitError state
   }
   ```

2. **Reset after success**

   ```typescript
   if (submitSuccess) {
     setTimeout(() => {
       reset();
       resetSubmission();
     }, 3000);
   }
   ```

3. **Disable button during submission**

   ```typescript
   <button disabled={isSubmitting}>Submit</button>
   ```

4. **Show progress during upload**
   ```typescript
   {
     isSubmitting && uploadProgress > 0 && (
       <ProgressBar value={uploadProgress} />
     );
   }
   ```

## Environment Variables

Make sure these are set in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_MAX_FILE_SIZE=5242880
```

## Backend Requirements

Backend must:

- Accept `multipart/form-data`
- Have endpoint `POST /api/submissions`
- Return format:
  ```json
  {
    "success": true,
    "message": "Submission created successfully",
    "data": { ... }
  }
  ```

---

**Need more details?** See `frontend/src/hooks/README.md`
