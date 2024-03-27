import { users } from "@/components/users";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { User } from "@/model/User";
import DataBase from "@/config/db";
import { signIn } from "next-auth/react";
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "credientals",
      name: "credientals",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await DataBase();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordMatch) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credientals") {
        return true;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
