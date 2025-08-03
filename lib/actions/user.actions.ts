'use server';

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema } from "../validators";
import { signIn, signOut } from "@/auth.config";

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
        console.log('working trye', user, formData);

        await signIn('credentials', user);
        // const result=await res.json()
        // console.log(res);

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