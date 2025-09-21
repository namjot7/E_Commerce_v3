import NextAuth, { NextAuthConfig } from "next-auth";
import { prisma } from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials"

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',// redirect to sign-in page when there is an error
    },
    session: {
        strategy: 'jwt' as const, // default option
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: "email" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                if (credentials == null) return null;

                // Find User in database
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });
                // Check if user exists and password matches
                if (user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password);

                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        }
                    }
                }
                // If user does not exists or password is wrong
                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, token, user, trigger }: any) {
            // Send properties to the client from the provider
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;
            // console.log(token);

            // If there is an update, set the user name
            if (trigger === 'update') {
                session.user.name = user.name;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }: any) {
            // Assign user fields to token
            if (user) {
                token.role = user.role;

                // If user has no name then use the email
                if (user.name === 'NO_NAME') {
                    token.name = user.email!.split('@')[0]; // ! means user.email definitely exists

                    // Update database to reflect token name
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { name: token.name }
                    })
                }
            }
            return token;
        },
    }
} satisfies NextAuthConfig;

// Only call NextAuth once and export the result
export const { auth, signIn, signOut, handlers } = NextAuth(config);