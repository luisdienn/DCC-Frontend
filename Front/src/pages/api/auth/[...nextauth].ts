import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Account, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ account, user }: { account: Account | null; user: User }) {
      if (account?.provider === "google") {
        const response = await fetch("http://localhost:8080/auth/google-login", {
          method: "POST",  // 📌 Asegurar que es POST
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, name: user.name }),
        });

        if (!response.ok) {
          console.error("❌ Error en el backend:", await response.text());
          return false;
        }
      }
      return true;
    },
    // async redirect({ baseUrl }) {
    //   return `${baseUrl}/Profesores`;
    // },
    async session({ session }) {
      console.log("📌 Session Data:", session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
