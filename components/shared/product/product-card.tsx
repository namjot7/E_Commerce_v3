import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";

const ProductCard = ({ product }: { product: Product }) => { // Product type is self creation in Types folder
    const priceString = product.price.toString();
    // const [wholeVal, decimalVal] = priceString.split('.');

    return (
        <Card className="w-full">
            <CardHeader>
                <Link href={`/product/${product.slug}`}>
                    <Image src={product.images[0]} alt={product.name} width={300} height={300} priority />
                </Link>
            </CardHeader>
            <CardContent className="grid gap-2">
                <div className="text-xs">{product.brand}</div>
                <Link href={`/product/${product.slug}`}>
                    <h2 className="font-medium">{product.name}</h2>
                    {/* {(product.name.length < 30) ? product.name : product.name.slice(0, 25) + "..."} */}
                </Link>
                <div className="flex-between">
                    <p>{product.rating} Stars</p>
                    {product.stock > 0 ? (
                        <ProductPrice value={Number(product.price)} />
                    ) : (<p className="text-destructive">Out of stock</p>)}
                </div>
            </CardContent>
        </Card >
    );
}
export default ProductCard;