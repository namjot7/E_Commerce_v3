import { z } from 'zod'
import { formatNumberWithDecimal } from './utils';

const currency = z.string()
    .refine(value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value)))
        , "Price must have exactly 2 decimal places"
    );

// schema for inserting products
export const insertProductSchema = z.object({
    name: z.string().min(3, "Name should have atleast 3 characters"),
    slug: z.string().min(3, "slug should have atleast 3 characters"),
    category: z.string().min(3, "category should have atleast 3 characters"),
    brand: z.string().min(3, "brand should have atleast 3 characters"),
    description: z.string().min(3, "description should have atleast 3 characters"),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, "Product must have atleast one image"),
    isFeatured: z.boolean(),
    banner: z.string().nullable(), // nullable means optional
    price: currency,
});

// Schema for signing users in
export const signInFormSchema=z.object({
    email:z.string().email('Invalid email address'),
    password:z.string().min(6,'Password must be atleast 6 characters')
}) 