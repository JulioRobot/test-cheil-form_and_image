# Example Database for Testing

This directory contains example database data for testing the Cheil Submission Form application.

## Files

### 1. `example_database.sql`
PostgreSQL SQL dump file with INSERT statements containing 10 example submissions.

**Usage:**
```bash
# Using psql command line
psql -U postgres -d cheil_db -f example_database.sql

# Or using Prisma CLI
npx prisma db execute --file example_database.sql --schema prisma/schema.prisma
```

### 2. `prisma/seed.js`
Prisma seed script for programmatic database seeding.

**Usage:**
```bash
# Using Prisma CLI (recommended)
npx prisma db seed

# Or directly
npm run prisma:seed
```

## Example Data Included

The example data includes:

- **10 test submissions** with:
  - Various names (English, Indonesian, Spanish, French)
  - Different email addresses
  - International phone numbers (US, UK, Indonesia, Japan, Spain, France)
  - Image paths (some referencing existing uploads, some sample paths)
  - Different creation dates (for date range testing)
  - One entry with NULL imagePath (edge case testing)

## Before Seeding

1. **Ensure database is set up:**
   ```bash
   npx prisma migrate deploy
   # or for development
   npx prisma migrate dev
   ```

2. **Optional: Clear existing data**
   - The seed script (`prisma/seed.js`) automatically clears existing submissions
   - The SQL dump file has a commented TRUNCATE statement you can uncomment if needed

## Verification

After seeding, verify the data:

```bash
# Using Prisma Studio
npx prisma studio

# Or using SQL
psql -U postgres -d cheil_db -c "SELECT COUNT(*) FROM submissions;"
```

## Testing Scenarios

The example data supports testing for:

✅ **Basic CRUD operations** - All standard submissions  
✅ **Date filtering** - Submissions from different dates  
✅ **Edge cases** - NULL imagePath  
✅ **International formats** - Various phone number formats  
✅ **Unicode/Character handling** - Names with special characters  

## Notes

- All IDs use Prisma's cuid() format (automatically generated)
- Email addresses are unique (as per schema constraints)
- Image paths reference the uploads directory structure
- Timestamps are in PostgreSQL TIMESTAMP(3) format

## Troubleshooting

**Error: "relation 'submissions' does not exist"**
- Run migrations first: `npx prisma migrate dev`

**Error: "duplicate key value violates unique constraint"**
- Clear existing data before seeding
- Or modify the seed script to handle duplicates

**Error: "connection refused"**
- Check your DATABASE_URL in `.env` file
- Ensure PostgreSQL is running

