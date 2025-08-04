export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Store Name";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "E-commerce store created using Next.js and Sql";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
    email: 'admin@gmail.com',
    password: '000000'
}
export const signUpDefaultValues = {
    name: '',
    email: '',
    password: '000000',
    confirmPassword: '000000',
}