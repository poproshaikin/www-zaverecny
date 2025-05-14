import NextAuth, {User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions} from "next-auth";
import prisma from '../../../../db/prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { username, password } = credentials;

                const user = await prisma.user.findFirst({
                    where: {
                        username
                    }
                });
                if (!user) return null;

                if (!await bcrypt.compare(password, user.password)) return null;
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                } as User;
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: '/log-in'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };