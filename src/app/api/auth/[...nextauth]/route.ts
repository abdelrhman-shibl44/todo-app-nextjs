import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/lib/config/models/UserModel";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/lib/config/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await ConnectDB();
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const user = await UserModel.findOne({ email });
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;
          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],

  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.name && session?.email) {
        token.name = session.name;
        token.email = session.email;
        await UserModel.findByIdAndUpdate(
          token.id,
          {
            $set: {
              name: token.name,
            },
          },
          { new: true }
        );
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/Auth/login",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
