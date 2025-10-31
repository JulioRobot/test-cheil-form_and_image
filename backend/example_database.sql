-- =====================================================
-- Example Database Dump for Testing
-- Cheil Submission Form & Image Upload
-- =====================================================
-- 
-- This file contains example data for testing purposes.
-- To restore this data:
--   1. Ensure your database is set up (run Prisma migrations)
--   2. Run: psql -U postgres -d cheil_db -f example_database.sql
--   3. Or use: npx prisma db execute --file example_database.sql
-- 
-- Note: This will INSERT data, so make sure to clear existing data
--       or adjust the script to avoid duplicates.
-- =====================================================

-- Clear existing data (optional - uncomment if needed)
-- TRUNCATE TABLE submissions CASCADE;

-- Insert example submissions data
-- =====================================================

-- Example 1: Basic submission
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx1234567890abcdef',
    'John Doe',
    'john.doe@example.com',
    '+1-555-0100',
    'uploads/images/image-1761780132541-919051091_processed.jpg',
    '2025-01-15 10:30:00.000',
    '2025-01-15 10:30:00.000'
);

-- Example 2: Submission with different region phone
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx2345678901bcdefg',
    'Jane Smith',
    'jane.smith@example.com',
    '+44-20-7946-0958',
    'uploads/images/images/image-1761782301659-123877744-WhatsApp_Image_2025-02-02_at_19.55.17_9fa961e1_processed.jpg',
    '2025-01-16 14:20:00.000',
    '2025-01-16 14:20:00.000'
);

-- Example 3: Recent submission
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx3456789012cdefgh',
    'Michael Johnson',
    'michael.johnson@example.com',
    '+62-812-3456-7890',
    'uploads/images/images/image-1761789255148-788934067-Screenshot_2025-10-30_085003_processed.jpg',
    '2025-01-20 09:15:00.000',
    '2025-01-20 09:15:00.000'
);

-- Example 4: Another submission
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx4567890123defghi',
    'Sarah Williams',
    'sarah.williams@example.com',
    '+1-555-0200',
    'uploads/images/images/image-1761789631164-615020112-Screenshot_2025-10-30_061221_processed.jpg',
    '2025-01-21 16:45:00.000',
    '2025-01-21 16:45:00.000'
);

-- Example 5: Latest submission
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx5678901234efghij',
    'David Brown',
    'david.brown@example.com',
    '+81-90-1234-5678',
    'uploads/images/images/image-1761790288265-382869269-Screenshot_2025-10-30_061221_processed.jpg',
    '2025-01-22 11:30:00.000',
    '2025-01-22 11:30:00.000'
);

-- Example 6: Submission with Indonesian phone number
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx6789012345fghijk',
    'Ahmad Rahman',
    'ahmad.rahman@example.com',
    '+62-821-1234-5678',
    'uploads/images/image-sample-indonesia.jpg',
    '2025-01-23 08:00:00.000',
    '2025-01-23 08:00:00.000'
);

-- Example 7: Submission with longer name
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx7890123456ghijkl',
    'Maria Garcia Lopez',
    'maria.garcia@example.com',
    '+34-912-345-678',
    'uploads/images/image-sample-spain.jpg',
    '2025-01-24 13:20:00.000',
    '2025-01-24 13:20:00.000'
);

-- Example 8: Submission with special characters in name
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx8901234567hijklm',
    'Jean-Pierre Dubois',
    'jean.dubois@example.com',
    '+33-1-23-45-67-89',
    'uploads/images/image-sample-france.jpg',
    '2025-01-25 15:10:00.000',
    '2025-01-25 15:10:00.000'
);

-- Example 9: Submission without image path (edge case)
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx9012345678ijklmn',
    'Test User No Image',
    'test.noimage@example.com',
    '+1-555-9999',
    NULL,
    '2025-01-26 10:00:00.000',
    '2025-01-26 10:00:00.000'
);

-- Example 10: Old submission (for date range testing)
INSERT INTO submissions (id, name, email, phone, "imagePath", "createdAt", "updatedAt")
VALUES (
    'clx0123456789jklmno',
    'Old Submission',
    'old.submission@example.com',
    '+1-555-0001',
    'uploads/images/image-old-2024.jpg',
    '2024-12-01 09:00:00.000',
    '2024-12-01 09:00:00.000'
);

-- =====================================================
-- Verification Queries (for testing)
-- =====================================================

-- Count total submissions
-- SELECT COUNT(*) as total_submissions FROM submissions;

-- Get all submissions ordered by date
-- SELECT id, name, email, phone, "imagePath", "createdAt", "updatedAt" 
-- FROM submissions 
-- ORDER BY "createdAt" DESC;

-- Get submissions with null imagePath
-- SELECT * FROM submissions WHERE "imagePath" IS NULL;

-- Get submissions by date range
-- SELECT * FROM submissions 
-- WHERE "createdAt" >= '2025-01-01' AND "createdAt" < '2025-02-01'
-- ORDER BY "createdAt" DESC;

-- =====================================================
-- Notes:
-- - All IDs use cuid() format (starts with 'clx')
-- - Phone numbers use international format with country codes
-- - Image paths reference the uploads directory structure
-- - Timestamps are in PostgreSQL TIMESTAMP(3) format
-- - Some entries have NULL imagePath for edge case testing
-- =====================================================

