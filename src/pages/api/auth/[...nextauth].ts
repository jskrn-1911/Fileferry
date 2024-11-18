import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/utils/mongoDb"
import User from "@/models/User"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async signIn({ user }) {
            await connectToDatabase();

            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image
                })
            }
            return true;
        },
        async session({ session, token }) {
            await connectToDatabase();

            const user = await User.findOne({ email: token.email });
            session.user = user;
            return session;
        },
        async jwt({ token, user }){
            if(user) {
                token.email = user.email;
            }
            return token;
        },
    },
});

