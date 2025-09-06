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

// Schema for Sign In users
export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be atleast 4 characters')
})

// Schema for Sign Up a user
export const signUpFormSchema = z
    .object({
        name: z.string().min(3, 'Name must be atleast 3 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(4, 'Password must be atleast 4 characters'),
        confirmPassword: z.string().min(4, 'Password must be atleast 4 characters')
    })
    .refine((data) => data.password == data.confirmPassword, {
        message: "Passwords do not match.",
        path: ['confirmPassword']
    });

// Cart schemas
export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    qty: z.number().int().nonnegative('Quantity must be a positive number'),
    image: z.string().min(1, 'Image is required'),
    price: currency,
});

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'Session cart id is required'),
    userId: z.string().optional().nullable(),

});