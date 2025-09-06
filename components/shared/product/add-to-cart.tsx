'use client'
import { Button } from "@/components/ui/button"
import { CartItem } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { addItemtoCart } from "@/lib/actions/cart.actions"
import { CartIcon } from "../icons"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter } from "next/navigation"


const AddToCart = ({ item }: { item: CartItem }) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleAddToCart = async () => {
        const res = await addItemtoCart(item);

        // Failed to add product to cart
        if (!res.success) {
            toast({
                variant: 'destructive',
                description: res.message,
            })
            return;
        }
        // Successfully added to cart 
        toast({
            description: `${item.name} added to cart successfully.`,
            action: (
                <ToastAction className="bg-primary text-white hover:bg-gray-800 rounded-md py-2 px-1 w-1/2" altText="go to cart button"
                    onClick={() => router.push('/cart')}>
                    Go to Cart
                </ToastAction>),
        })
    }
    return (
        <Button className="w-full" onClick={() => handleAddToCart()} type="button">
            <CartIcon /> Add to Cart
        </Button>
    )
}

export default AddToCart