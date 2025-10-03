import { SupabaseAdapter } from "@auth/supabase-adapter"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  adapter: (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
    ? SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
      })
    : undefined,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password || !supabase) {
          return null;
        }

        // For Supabase, we'll use RLS policies instead of direct queries
        // This is a simplified version - in production you'd want proper RLS
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (error || !user || !(user as any).password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (user as any).password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          id: (user as any).id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          email: (user as any).email,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name: (user as any).name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          username: (user as any).username,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          role: (user as any).role || 'user',
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.username = (user as any).username;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.sub;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).username = token.username;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
