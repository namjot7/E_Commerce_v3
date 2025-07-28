import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductPrice from '@/components/shared/product/product-price';
import {CartIcon} from '@/components/shared/icons';

const ProductDetailsPage = async (props: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await props.params;

    const product = await getProductBySlug(slug)
    if (!product) return notFound();

    return (
        <div className='grid grid-cols-1 md:grid-cols-5'>

            {/* First section: Images */}
            <div className="col-span-2">
                <img className='w-80 m-auto' src="/images/sample-products/p1-1.jpg" alt="" />
                <div className="flex-center gap-4">
                    <img className='w-20 border border-gray-300 rounded-md' src="/images/sample-products/p1-1.jpg" alt="" />
                    <img className='w-20 border border-gray-300 rounded-md' src="/images/sample-products/p1-1.jpg" alt="" />
                    <img className='w-20 border border-gray-300 rounded-md' src="/images/sample-products/p1-1.jpg" alt="" />
                </div>
            </div>

            {/* Second section: Details */}
            <div className="col-span-2 p-5">
                <div className="flex flex-col gap-5">
                    <p>{product.brand} {product.category}</p>
                    <h1 className='h3-bold'>{product.name}</h1>
                    <p>{product.rating} Stars of {product.numReviews} reviews</p>
                    {/* DO NOT know the purpose of this div below */}
                    {/*  flex-col sm:flex-row items-center gap-3 */}
                    <div className="flex">
                        <ProductPrice
                            value={Number(product.price)}
                            className='text-green-800 bg-green-100 py-2 px-5 rounded-full'
                        />
                    </div>
                    <div className="mt-10">
                        <p className='font-semibold'>Description:</p>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>

            {/* Third section - Checkout */}
            <div className="">
                <Card>
                    <CardContent className='p-4'>
                        <div className='flex justify-between mb-2'>
                            <div>Price:</div>
                            <div><ProductPrice value={Number(product.price)} /></div>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <div>Status</div>
                            {product.stock > 0
                                ? <Badge variant={'outline'}>In Stock</Badge>
                                : <Badge variant={'destructive'}>Out of stock</Badge>}
                        </div>
                        {product.stock > 0 && (
                            <div className='flex-center'>
                                <Button className='w-full'><CartIcon/> Add to Cart</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProductDetailsPage