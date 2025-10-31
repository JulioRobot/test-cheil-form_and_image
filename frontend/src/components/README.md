# Components

This directory contains all React components for the Cheil Submission Form application.

## Component Structure

### Main Components

#### 1. SubmissionForm.tsx
Main form component that handles the complete submission workflow.

**Features:**
- Form validation using `react-hook-form` + `zod`
- Real-time validation feedback
- Loading states during submission
- Upload progress tracking
- Success/Error notifications
- Form reset functionality

**Props:** None (self-contained)

**Usage:**
```tsx
import { SubmissionForm } from './components/SubmissionForm';

function App() {
  return <SubmissionForm />;
}
```

#### 2. ImageUpload.tsx
Specialized component for image upload with preview functionality.

**Features:**
- Drag & drop support
- Click to browse files
- Image preview before upload
- File validation (size & type)
- Remove/Replace image
- Accessible keyboard navigation
- Error handling

**Props:**
```typescript
interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;  // Callback when image is selected/removed
  error?: string;                               // Error message to display
  disabled?: boolean;                           // Disable upload during submission
}
```

**Usage:**
```tsx
import { ImageUpload } from './components/ImageUpload';

function MyForm() {
  const [image, setImage] = useState<File | null>(null);
  
  return (
    <ImageUpload 
      onImageSelect={setImage}
      error={errors.image?.message}
      disabled={isSubmitting}
    />
  );
}
```

### Common Components

The `common/` directory is reserved for reusable, shared components like:
- Buttons
- Input fields
- Loading spinners
- Modals
- Cards
- etc.

## Component Guidelines

1. **Naming Convention:** PascalCase (e.g., `SubmissionForm.tsx`)
2. **File Structure:** One component per file
3. **Props:** Use TypeScript interfaces for type safety
4. **Accessibility:** Include ARIA labels and keyboard support
5. **Styling:** Use CSS classes from `style.css`
6. **Comments:** Document complex logic with clear comments

## Testing

Before deployment, test:
- ✅ Form validation (empty fields, invalid formats)
- ✅ Image upload (size limits, file types, preview)
- ✅ Error handling (network errors, API errors)
- ✅ Loading states and progress indicators
- ✅ Success notifications
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility (keyboard navigation, screen readers)

## Dependencies

- `react` - UI library
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod resolver for react-hook-form

## Related Files

- **Types:** `src/types/submission.types.ts`
- **Validation:** `src/utils/validation.ts`
- **API:** `src/services/api.ts`
- **Styles:** `src/style.css`

