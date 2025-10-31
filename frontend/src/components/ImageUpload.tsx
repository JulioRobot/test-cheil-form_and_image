// =====================================================
// IMAGE UPLOAD COMPONENT
// =====================================================
// Component untuk upload gambar dengan fitur:
// - Preview gambar sebelum upload
// - Drag & drop
// - Validasi ukuran & tipe file
// - Remove/replace image
// - Error handling

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { validateImageFile, ACCEPTED_IMAGE_TYPES } from '../utils/validation';

// ===== Props Interface =====
interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;  // Callback ketika gambar dipilih
  error?: string;                               // Error message dari form validation
  disabled?: boolean;                           // Disable upload saat submit
  value?: File | null;                          // Current file value from form
}

// ===== Component =====
export const ImageUpload = ({ 
  onImageSelect, 
  error, 
  disabled = false,
  value 
}: ImageUploadProps) => {
  // ----- State Management -----
  const [preview, setPreview] = useState<string | null>(null);  // URL preview gambar
  const [dragActive, setDragActive] = useState(false);          // Status drag & drop
  const [localError, setLocalError] = useState<string>('');     // Error lokal component
  const [fileName, setFileName] = useState<string>('');         // Nama file yang dipilih

  // ----- Ref untuk input file (hidden) -----
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ===== Effect: Reset preview when value becomes null (form reset) =====
  useEffect(() => {
    // Jika value dari parent menjadi null, reset preview
    if (value === null) {
      setPreview(null);
      setFileName('');
      setLocalError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [value]);

  // ===== Handle File Selection =====
  const handleFileChange = (file: File | null) => {
    // Reset error
    setLocalError('');

    // Kalau tidak ada file (cancel/remove)
    if (!file) {
      resetUpload();
      return;
    }

    // Validasi file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setLocalError(validation.errorMessage || 'File tidak valid');
      resetUpload();
      return;
    }

    // Set preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Set file name
    setFileName(file.name);

    // Kirim file ke parent component (form)
    onImageSelect(file);
  };

  // ===== Handle Input Change (manual select) =====
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  // ===== Handle Drag Events =====
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  // ===== Handle Click to Browse =====
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // ===== Handle Remove Image =====
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event bubbling
    resetUpload();
  };

  // ===== Reset Upload =====
  const resetUpload = () => {
    setPreview(null);
    setFileName('');
    setLocalError('');
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ===== Determine Error Message =====
  const errorMessage = error || localError;

  // ===== Render Component =====
  return (
    <div className="image-upload-container">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={handleInputChange}
        className="image-upload-input"
        disabled={disabled}
        aria-label="Upload gambar"
      />

      {/* Upload Area */}
      <div
        className={`image-upload-area ${dragActive ? 'drag-active' : ''} ${
          errorMessage ? 'has-error' : ''
        } ${disabled ? 'disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        {preview ? (
          // Preview Mode - Show Image
          <div className="image-preview">
            <img src={preview} alt="Preview" className="preview-image" />
            <div className="image-overlay">
              <p className="image-filename">{fileName}</p>
              <button
                type="button"
                onClick={handleRemove}
                className="btn-remove"
                disabled={disabled}
                aria-label="Hapus gambar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Hapus
              </button>
            </div>
          </div>
        ) : (
          // Upload Mode - Show Upload UI
          <div className="upload-placeholder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="upload-icon"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="upload-text-primary">
              {dragActive ? 'Lepaskan file di sini' : 'Klik atau drag & drop gambar'}
            </p>
            <p className="upload-text-secondary">JPG, PNG, atau WEBP (Maks. 5MB)</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

