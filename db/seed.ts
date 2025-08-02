import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
    const prisma = new PrismaClient();

     // clear existing data
    await prisma.product.deleteMany();
    await prisma.user.deleteMany(); 
    // await prisma.account.deleteMany(); 
    // await prisma.session.deleteMany(); 
    // await prisma.verificationToken.deleteMany(); 

    // seed the sample data
    await prisma.product.createMany({ data: sampleData.products });
    await prisma.user.createMany({ data: sampleData.users });

    console.log("Database seeded with sample data.");
}
main();