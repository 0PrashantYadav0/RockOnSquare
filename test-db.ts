import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findFirst({
        select: { id: true },
    });
    console.log("Database query succeeded:", !!user);
}

main()
    .catch((error) => {
        console.error("Database query failed:", error.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });