'use client'
import { Button } from "@/components/ui/button"
import { Cart, CartItem } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { addItemtoCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { CartIcon } from "../icons"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter } from "next/navigation"
import { Loader, Minus, Plus } from "lucide-react"
import { useTransition } from "react"


const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition()

    const handleAddToCart = async () => {
        startTransition(async () => {
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
                description: res.message,
                action: (
                    <ToastAction className="bg-primary text-white hover:bg-gray-800 rounded-md py-2 px-1 w-1/2" altText="go to cart button"
                        onClick={() => router.push('/cart')}>
                        Go to Cart
                    </ToastAction>),
            })
        })
    }
    // Handle Remove from cart button
    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            toast({
                variant: res.success ? 'default' : 'destructive',
                description: res.message,
            })
            return;
        })
    }
    // Check if item is in cart
    const existItem = cart && cart.items.find(x => x.productId === item.productId);

    return existItem ? (
        <div>
            <Button type='button' variant='outline' onClick={() => handleRemoveFromCart()}>
                {isPending ? <Loader className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
            </Button>
            <span className="px-2">{existItem.qty}</span>
            <Button type='button' variant='outline' onClick={() => handleAddToCart()}>
                {isPending ? <Loader className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
        </div>
    ) : (
        <Button className="w-full" onClick={() => handleAddToCart()} type="button">
            {isPending ? <Loader className="h-4 w-4" /> : <CartIcon />} Add to Cart
        </Button>
    )
}

export default AddToCart