import { getCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'My Cart',
};

const CartPage = async () => {
    const cart = await getCart();

    return (
        <>
            <CartTable cart={cart} />
        </>
    )
}

export default CartPage