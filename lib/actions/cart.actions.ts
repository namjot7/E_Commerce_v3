'use server';
import { CartItem } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth.config";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validators";

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
        taxPrice = round2(0.15 * itemsPrice), // 15% tax
        shippingPrice = round2(itemsPrice > 100 ? 0 : 10), // if total amount is more than $100, then free shipping. Otherwise, $10 charge.
        totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

    return {
        itemsPrice: itemsPrice.toFixed(2), // AGAIN to make sure it is still 2 decimal only
        taxPrice: taxPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    }
}

export async function addItemtoCart(data: CartItem) {
    try {
        // Check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('Cart session not found');

        // Get session and user ID
        const session = await auth();
        const userId = (session?.user?.id) ? (session.user.id as string) : undefined;

        // Get cart
        const cart = await getCart();

        // Parse and validate item
        const item = cartItemSchema.parse(data);

        // Find product in database
        const product = await prisma.product.findFirst({
            where: { id: item.productId }
        })
        if (!product) throw new Error("Product not found");

        // Testing
        console.log({
            "sessionCartid": sessionCartId,
            "userId": userId,
            "Requested Item": item,
            "Product Found": product
        });


        return {
            success: true,
            message: 'Successsfully item added'
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

export async function getCart() {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    // Get session and user ID
    const session = await auth();
    const userId = (session?.user?.id) ? (session.user.id as string) : undefined;

    // Get user cart from database
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
    })
    if (!cart) return undefined;

    // convert decimals and return
    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        totalPrice: cart.totalPrice.toString(),
        itemsPrice: cart.itemsPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    });
}
