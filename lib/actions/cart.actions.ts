'use server';

import { CartItem } from "@/types";

export async function addItemtoCart(data: CartItem) {
    return {
        success: true,
        message: 'Successsfully item added'
    }
}