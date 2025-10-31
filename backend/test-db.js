const { connectDB, prisma, disconnectDB } = require('./src/config/database');

async function testDatabase() { 
    console.log('Testing database connection...');

    try {
        await connectDB();

        const testSubmission = await prisma.submission.create({
            data: {
                name: 'Test Submission',
                email: 'test@example.com',
                phone: "21233123",
                imagePath: 'test-image.jpg',
            }
        });

        console.log('Submission created:', testSubmission);

        // test read data 
        const submissions = await prisma.submission.findMany();
        console.log('All submissions:', submissions);

        // test hapus data
        await prisma.submission.delete({
            where: { id: testSubmission.id }
        });

        console.log('Submission deleted:', testSubmission);
    } catch (error) {
        console.error('Error testing database:', error);
    } finally {
        await disconnectDB();
    }
}

testDatabase();