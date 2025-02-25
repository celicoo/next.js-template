import type { JWT } from "@auth/core/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth, { type Session } from "next-auth";
import Resend from "next-auth/providers/resend";

import prisma from "~/libs/prisma";
import { sendMagicLinkEmail } from "~/libs/resend";

import env from "~/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Resend({
      from: env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier,
        url,
      }): globalThis.Promise<void> =>
        sendMagicLinkEmail({ to: identifier, url }),
    }),
  ],
  callbacks: {
    jwt: ({ token, user }): JWT => {
      if (user) token.id = user.id;
      return token;
    },
    session: ({ session, token }): Session => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  }
});
