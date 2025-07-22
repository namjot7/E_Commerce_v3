import { z } from 'zod'

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

});