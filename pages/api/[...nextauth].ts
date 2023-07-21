import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GitHubProvider from "@next-auth/providers/github";
import GoogleProvider from "@next-auth/providers/google";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
9
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as String,
            clientSecret: process.env.GITHUB_SECRET as String,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as String,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as String,
        }),

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"},
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }   
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })    
        
    ],
    pages: {
        signIn: '/',
    },

    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

};

export default NextAuth(authOptions);