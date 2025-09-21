'use server';
import { CartItem } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth.config";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

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
        // console.log(cart);

        // Parse and validate item
        const item = cartItemSchema.parse(data);

        // Find product in database
        const product = await prisma.product.findFirst({
            where: { id: item.productId }
        })
        if (!product) throw new Error("Product not found");

        if (!cart) {
            // Create new cart object
            const newCart = insertCartSchema.parse({
                userId: userId,
                items: [item],
                sessionCartId: sessionCartId,
                ...calcPrice([item])
            });
            // console.log(newCart);

            // Add to DB
            await prisma.cart.create({
                data: newCart
            });
            // Revalidate product page
            revalidatePath(`/product/${product.slug}`);

            // Testing
            // console.log({
            //     "sessionCartid": sessionCartId,
            //     "userId": userId,
            //     "Requested Item": item,
            //     "Product Found": product
            // });
            return {
                success: true,
                message: `${product.name} added to cart.`
            }
        } else {
            // Check if item is already in cart
            const existItem = (cart.items as CartItem[]).find(x => x.productId == item.productId);

            if (existItem) {
                // check stock
                if (product.stock < existItem.qty + 1) {
                    throw new Error("Not enough stock");
                }
                // Increase the quantity
                (cart.items as CartItem[]).find(x => x.productId == item.productId)!.qty = existItem.qty + 1;
            }
            // If item does not exist in cart
            else {
                // check stock
                if (product.stock < 1) throw new Error("Not enough stock");

                // Add item to the cart.items
                cart.items.push(item);
            }
            // Save to database
            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: cart.items as Prisma.CartUpdateitemsInput[],
                    ...calcPrice(cart.items as CartItem[])
                }
            });
            revalidatePath(`/product/${product.slug}`);

            return {
                success: true,
                message: `${product.name} ${existItem ? ' updated in' : ' added to'} cart`
            };
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
export async function removeItemFromCart(productId: string) {
    try {
        // Check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('Cart session not found');

        // Get product
        const product = await prisma.product.findFirst({
            where: { id: productId }
        });
        if (!product) throw new Error('Product not found');

        // Get User cart
        const cart = await getCart();
        if (!cart) throw new Error('Cart not found');

        // Check for item
        const exist = (cart.items as CartItem[]).find(x => x.productId === productId);
        if (!exist) throw new Error('Item not found');

        // When qty is 1, Remove from cart
        if (exist.qty == 1) {
            cart.items = (cart.items as CartItem[]).filter(x => x.productId != exist.productId)
        }
        else { // decrease qty
            (cart.items as CartItem[]).find(x => x.productId === exist.productId)!.qty = exist.qty - 1;
        }
        // Update cart in database
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: cart.items as Prisma.CartUpdateitemsInput[],
                ...calcPrice(cart.items as CartItem[])
            }
        })
        revalidatePath(`/product/${product.slug}`);

        return {
            success: true,
            message: `${product.name} removed from cart`
        }

    } catch (error) {
        return { success: false, message: formatError(error) };
    }
}