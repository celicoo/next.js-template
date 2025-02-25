import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";

import { z } from "zod";

export default createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_TRUST_HOST: z.string().url(),
    EMAIL_FROM: z.string().min(1),
    EMAIL_REPLY_TO: z.string().min(1),
    GTM_ID: z.string(),
    NEXT_RUNTIME: z.enum(["edge", "nodejs"]),
    NODE_ENV: z.enum(["development", "production"]),
    POSTGRES_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    TINA_PUBLIC_IS_LOCAL: z.coerce.boolean(),
    TINA_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production"]),
    NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_URL: z.string().min(1),
  },
  shared: {},
  experimental__runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  extends: [vercel()],
} as const);
