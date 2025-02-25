import { Resend } from "resend";

import MagicLinkEmail from "~/emails/magic-link";

import siteConfig from "~/configs/site";

import env from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendMagicLinkEmail({
  to,
  url,
}: {
  to: string;
  url: string;
}): globalThis.Promise<void> {
  await resend.emails.send({
    from: `"${siteConfig.name}" <${env.EMAIL_FROM}>`,
    to,
    replyTo: env.EMAIL_REPLY_TO,
    subject: "Log in with this magic link",
    react: MagicLinkEmail({ url }),
    headers: {
      // Set this to prevent Gmail from threading emails.
      // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
      "X-Entity-Ref-ID": new Date().getTime().toString(),
    },
  });
}
