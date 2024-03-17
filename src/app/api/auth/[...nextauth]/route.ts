import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/lib/config/models/UserModel";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/lib/config/db";
import { sendEmail } from "@/lib/mailer";
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
          if (!user) {
            throw new Error("Invalid credentials.");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid credentials.");
          }

          if (!user.isVerified) {
            const currentDate = new Date();
            if (user.verifyTokenExpiry < currentDate) {
              await sendEmail({ email, emailType: "VERIFY", userId: user._id });
            }
            throw new Error(
              "Email verification required. Please Check your inbox"
            );
          }
          return user;
        } catch (err: any) {
          throw err;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github" || account?.provider == "google") {
        await ConnectDB();
        try {
          const existingUser = await UserModel.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = await UserModel.create({
              name: user.name,
              email: user.email,
            });
            if (newUser) {
              return true;
            }
          }
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return user;
    },
    async jwt({ token, user, trigger, session, account }) {
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
        token.email = user.email;
        token.name = user.name;
        token.provider = account?.provider;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const sessionUser = await UserModel.findOne({ email: token.email });
      if (session.user) {
        session.user.id = sessionUser.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.provider = token.provider;
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
