// =====================================================
// Prisma Seed Script for Example Database
// Cheil Submission Form & Image Upload
// =====================================================
// 
// This script seeds the database with example data for testing.
// 
// To run this seed script:
//   npx prisma db seed
// 
// Make sure to configure seed script in package.json:
//   "prisma": { "seed": "node prisma/seed.js" }
// =====================================================

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const exampleSubmissions = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0100',
    imagePath: 'uploads/images/image-1761780132541-919051091_processed.jpg',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+44-20-7946-0958',
    imagePath: 'uploads/images/images/image-1761782301659-123877744-WhatsApp_Image_2025-02-02_at_19.55.17_9fa961e1_processed.jpg',
  },
  {
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    phone: '+62-812-3456-7890',
    imagePath: 'uploads/images/images/image-1761789255148-788934067-Screenshot_2025-10-30_085003_processed.jpg',
  },
  {
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '+1-555-0200',
    imagePath: 'uploads/images/images/image-1761789631164-615020112-Screenshot_2025-10-30_061221_processed.jpg',
  },
  {
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+81-90-1234-5678',
    imagePath: 'uploads/images/images/image-1761790288265-382869269-Screenshot_2025-10-30_061221_processed.jpg',
  },
  {
    name: 'Ahmad Rahman',
    email: 'ahmad.rahman@example.com',
    phone: '+62-821-1234-5678',
    imagePath: 'uploads/images/image-sample-indonesia.jpg',
  },
  {
    name: 'Maria Garcia Lopez',
    email: 'maria.garcia@example.com',
    phone: '+34-912-345-678',
    imagePath: 'uploads/images/image-sample-spain.jpg',
  },
  {
    name: 'Jean-Pierre Dubois',
    email: 'jean.dubois@example.com',
    phone: '+33-1-23-45-67-89',
    imagePath: 'uploads/images/image-sample-france.jpg',
  },
  {
    name: 'Test User No Image',
    email: 'test.noimage@example.com',
    phone: '+1-555-9999',
    imagePath: null, // Edge case: no image
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Clearing existing submissions...');
  await prisma.submission.deleteMany({});

  // Insert example data
  console.log('📝 Inserting example submissions...');
  
  for (const submission of exampleSubmissions) {
    try {
      await prisma.submission.create({
        data: submission,
      });
      console.log(`✅ Created submission for ${submission.name}`);
    } catch (error) {
      console.error(`❌ Failed to create submission for ${submission.name}:`, error.message);
    }
  }

  // Display summary
  const count = await prisma.submission.count();
  console.log(`\n✨ Seed completed! Total submissions: ${count}`);
}

main()
  .catch((error) => {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

