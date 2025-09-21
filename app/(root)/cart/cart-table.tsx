'use client'
import { Cart } from '@/types'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { removeItemFromCart } from '@/lib/actions/cart.actions';
import { toast } from '@/hooks/use-toast';
import AddToCart from '@/components/shared/product/add-to-cart';

const CartTable = ({ cart }: { cart?: Cart }) => {
    // console.log(cart);
    const [isPending, startTransition] = useTransition()

    return (
        <>
            <h1 className="py-4 h2-bold">Shopping Cart</h1>
            {!cart || cart.items.length === 0 ? (
                <div>
                    Cart is empty. <Link href='/'>Shop Now!</Link>
                </div>
            ) : (
                // md:grid-cols-4 md:gap-5
                <div className="grid">
                    {/* overflow-x-auto md:col-span-3 */}
                    <div className="">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className=''>Item</TableHead>
                                    <TableHead className=''>Quantity</TableHead>
                                    <TableHead className=''>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) => (
                                    <TableRow key={item.slug}>

                                        <TableCell>
                                            <Link href={`/product/${item.slug}`} className='flex items-center gap-2'>
                                                <Image src={item.image} alt={item.name} width={50} height={50} />
                                                <span>{item.name}</span>
                                            </Link>
                                        </TableCell>

                                        <TableCell>
                                            <AddToCart cart={cart} item={item} />
                                        </TableCell>

                                        <TableCell>$ {item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div >
            )}
        </>
    )
}

export default CartTable