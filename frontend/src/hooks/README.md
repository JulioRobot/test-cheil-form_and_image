# Custom Hooks Directory

Folder ini berisi custom React hooks yang digunakan di aplikasi.

## 📁 Struktur

```
hooks/
├── index.ts               # Export semua hooks
├── useSubmission.ts       # Hook untuk submission form logic
└── README.md              # Dokumentasi ini
```

## 🎣 Available Hooks

### `useSubmission`

Custom hook untuk handle submission form dengan image upload.

**Features:**
- ✅ Track loading state
- ✅ Track upload progress (0-100%)
- ✅ Handle success state
- ✅ Handle error state with user-friendly messages
- ✅ Store submitted data
- ✅ Client-side validation (file size, type)

**Usage:**

```typescript
import { useSubmission } from '@/hooks';
// atau
import { useSubmission } from '@/hooks/useSubmission';

function MyForm() {
  const {
    // State
    isSubmitting,
    uploadProgress,
    submitSuccess,
    submitError,
    submittedData,
    
    // Functions
    submitForm,
    resetSubmission,
  } = useSubmission();

  const handleSubmit = async (data: SubmissionFormData) => {
    try {
      await submitForm(data);
      console.log('Success!');
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  return (
    <div>
      {isSubmitting && <p>Uploading... {uploadProgress}%</p>}
      {submitSuccess && <p>Success!</p>}
      {submitError && <p>Error: {submitError}</p>}
      
      <button onClick={() => handleSubmit(formData)}>
        Submit
      </button>
      
      <button onClick={resetSubmission}>
        Reset
      </button>
    </div>
  );
}
```

**Return Values:**

| Property | Type | Description |
|----------|------|-------------|
| `isSubmitting` | `boolean` | Apakah sedang proses submit |
| `uploadProgress` | `number` | Progress upload (0-100) |
| `submitSuccess` | `boolean` | Apakah submit berhasil |
| `submitError` | `string` | Error message jika ada error |
| `submittedData` | `Submission \| null` | Data yang berhasil disubmit |
| `submitForm` | `(data) => Promise<void>` | Function untuk submit form |
| `resetSubmission` | `() => void` | Function untuk reset semua state |

**Client-side Validations:**

Hook ini melakukan validasi berikut:
- ✅ Image wajib ada (required)
- ✅ Image size maksimal 5MB (sesuai VITE_MAX_FILE_SIZE)
- ✅ Image type harus JPG, PNG, atau WEBP

**Error Handling:**

Hook akan throw error jika:
- Image tidak ada
- Image size melebihi batas
- Image type tidak valid
- Network error
- Server error

Error message akan disimpan di `submitError` state.

## 🔧 Best Practices

### 1. Separation of Concerns
Custom hooks memisahkan business logic dari UI component. Ini membuat:
- Component lebih fokus ke rendering
- Logic lebih mudah di-test
- Code lebih reusable

### 2. Naming Convention
- Gunakan prefix `use` untuk custom hooks
- Gunakan camelCase: `useSubmission`, `useAuth`
- Nama harus descriptive

### 3. Return Consistent Data Structure
Return object dengan property yang jelas:
```typescript
return {
  // State dulu
  data,
  loading,
  error,
  
  // Kemudian functions
  fetchData,
  resetData,
};
```

### 4. Use TypeScript
Selalu define types untuk:
- Parameter function
- Return value
- Internal state

### 5. Handle Cleanup
Jika hook menggunakan subscriptions/timers, cleanup di useEffect:
```typescript
useEffect(() => {
  const timer = setTimeout(() => {...}, 1000);
  return () => clearTimeout(timer);
}, []);
```

## 📝 Adding New Hooks

Untuk menambah custom hook baru:

1. **Buat file baru** di folder `hooks/`:
   ```typescript
   // useMyHook.ts
   export const useMyHook = () => {
     // ... logic here
     return { ... };
   };
   ```

2. **Export di index.ts**:
   ```typescript
   export { useMyHook } from './useMyHook';
   ```

3. **Dokumentasikan** di README ini

4. **Test** hook dengan integration tests

## 🧪 Testing Hooks

Untuk testing custom hooks, gunakan `@testing-library/react-hooks`:

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useSubmission } from './useSubmission';

test('should submit form successfully', async () => {
  const { result } = renderHook(() => useSubmission());
  
  await act(async () => {
    await result.current.submitForm(mockData);
  });
  
  expect(result.current.submitSuccess).toBe(true);
});
```

## 📚 Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Testing React Hooks](https://react-hooks-testing-library.com/)

---

**Last Updated:** October 30, 2025
**Maintained by:** Development Team

