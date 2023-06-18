import { config } from './config';
import { prisma } from './database';
import { startServer } from './server';

async function main() {
    await startServer(config.server);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
