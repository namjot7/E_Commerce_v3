'use server';

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { shippingAddressSchema, signInFormSchema, signUpFormSchema } from "../validators";
import { auth, signIn, signOut } from "@/auth.config";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcryptjs";
import { formatError } from "../utils";
import { ShippingAddress } from "@/types";

// Sign user in
export async function signInWithCredentials(
    prevState: unknown,
    formData: FormData
) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });
        // console.log(user, formData);

        await signIn('credentials', user); // check in DB
        return { success: true, message: "User signed in successfully." }
    }
    catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: "Email or password in incorrect." }
    }
}

// Sign user out
export async function signOutUser() {
    await signOut();
}

// Sign Up User
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        })
        const plainPassword = user.password;

        // encrypt password before adding to DB
        user.password = hashSync(user.password, 2);

        // create the user in DB using Prisma
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })
        // sign in user
        await signIn('credentials', {
            email: user.email,
            password: plainPassword
        });

        return { success: true, message: "user created successfully." }
    }
    catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        // console.log(error);
        // console.log(error.errors);
        // console.log(error.code);
        // console.log(error.name);
        // console.log(error.meta?.target);

        return { success: false, message: formatError(error) };
    }
}

// Get User by ID
export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({
        where: { id: userId }
    });
    if (!user) throw new Error('User not found');
    return user;
}

// Update user address
export async function updateUserAddress(data: ShippingAddress) {
    try {
        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: { id: session?.user?.id }
        })
        if (!currentUser) throw new Error('User not Found');

        const address = shippingAddressSchema.parse(data);

        await prisma.user.update({
            where: { id: currentUser.id },
            data: { address }
        })
        return { success: true, message: "User address updated successfully." };
    }
    catch (error) {
        return { success: false, message: formatError(error) }
    }
}