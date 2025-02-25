import env from "~/env";

export default {
  name: "Project",
  description: "My Project",
  url: env.NEXT_PUBLIC_URL,
  links: {
    x: "https://x.com/project",
  },
} as const;
