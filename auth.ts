import NextAuth from "next-auth";
import { prisma } from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcryptjs";
import { use } from "react";
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

export const config = {
    pages: {
        signIn: 'sign-in',
        error: 'sign-in',// redirect to sign-in page when there is an error
    },
    session: {
        strategy: 'jwt', // default option
        maxAge: 30 * 24 * 60 * 60, // 30 days
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
                        const isMatch = compareSync(credentials.password, user.password);

                        if (isMatch) {
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                            }
                        }
                        // If user does not exists or password is wrong
                        return null;
                    }
                }
            })
        ],
        callbacks: {
            async session({ session, token, user, trigger }: any) {
                // Set the user ID from the token
                session.user.id = token.sub;

                // If there is an update, set the user name
                if (trigger === 'update') {
                    session.user.name = user.name;
                }
                return session;
            }
        }
    }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
