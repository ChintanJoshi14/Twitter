import NextAuth from "next-auth/next";
import TwitterProvider from 'next-auth/providers/twitter';


export default NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            secret: process.env.TWITTER_CLIENT_SECRET,
            version: "2.0",
        }),
    ],
})