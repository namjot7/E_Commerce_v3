"use client";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
    console.log(images);
    const [current, setCurrent] = useState(0);

    return (
        <div>
            <div className="space-y-4">
                <Image
                    src={images[current]}
                    alt="product image"
                    width={1000}
                    height={1000}
                    className="min-h-[300px]"
                />
                <div className="flex gap-3">
                    {images.map((image, idx) => (
                        <div
                            key={image}
                            onClick={() => setCurrent(idx)}
                            className={`border hover:border-orange-500 cursor-pointer 
                                ${current == idx ? "border-orange-500" : ""}
                                `}
                        >
                            <Image
                                src={image}
                                alt="product image"
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductImages;
