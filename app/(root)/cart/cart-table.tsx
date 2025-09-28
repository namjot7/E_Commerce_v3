'use client'
import { Cart } from '@/types'
import Link from 'next/link'
import Image from 'next/image';
import { useTransition } from 'react';
import AddToCart from '@/components/shared/product/add-to-cart';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader } from 'lucide-react';

const CartTable = ({ cart }: { cart?: Cart }) => {
    // console.log(cart);
    const router = useRouter()
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
                <div className="grid md:grid-cols-4 md:gap-5">
                    {/* overflow-x-auto md:col-span-3 */}
                    <div className="overflow-x-auto md:col-span-3">
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
                    <Card>
                        <CardContent className='p-4'>
                            <div className="text-xl flex justify-between ">
                                Subtotal: ({cart.items.reduce((a, c) => a + Number(c.qty), 0)})
                                <span className="font-bold">
                                    {formatCurrency(cart.itemsPrice)}
                                </span>
                            </div>
                            <Button disabled={isPending} className='w-full my-5'
                                onClick={() => startTransition(async () => router.push('/shipping-address'))}>
                                {isPending ? (
                                    <Loader className='w-4 h-4 animate-spin' />
                                ) : (
                                    <ArrowRight className='w-4 h-4' />
                                )} Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </div >
            )}
        </>
    )
}

export default CartTable