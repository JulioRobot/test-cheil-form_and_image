const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function connectDB() { 
    try {
        await prisma.$connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed to connect to database', error);
        process.exit(1);
    }
}

async function disconnectDB() { 
    try {
        await prisma.$disconnect();
        console.log('Disconnected from database');
    } catch (error) {
        console.error('Failed to disconnect from database', error);
        
    }
}

module.exports = { prisma, connectDB, disconnectDB };