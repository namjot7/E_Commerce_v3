'use server';
// import { PrismaClient } from "@prisma/client"; // done using Serverless Envrionment config
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// GET latest products
export async function getLatestProducts() {
    // const prisma = new PrismaClient();

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc', }
    })
    return convertToPlainObject(data);
}

// GET single products by it's slug
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug },
    })
}