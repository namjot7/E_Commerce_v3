import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
    const priceString = product.price.toString();
    const [wholeVal, decimalVal] = priceString.split('.');

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
                </Link>
                <div className="flex-between">
                    <p>{product.rating} Stars</p>
                    {product.stock > 0 ? (
                        <p className="text-2xl">
                            <span className="text-xs align-super">$</span>
                            {wholeVal}
                            <span className="text-xs">.{decimalVal}</span>
                        </p>
                    ) : (
                        <p className="text-destructive">Out of stock</p>
                    )}
                </div>
            </CardContent>

        </Card >

    );
}

export default ProductCard;