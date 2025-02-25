import { defineConfig } from "tinacms";

export default defineConfig({
  branch: globalThis.process.env.VERCEL_GIT_COMMIT_REF ?? "development",
  clientId: globalThis.process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: globalThis.process.env.TINA_TOKEN,
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "",
    },
  },
  schema: {
    collections: [
      {
        name: "legalPage",
        path: "content/legal/",
        label: "Legal Pages",
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            required: true,
            isTitle: true,
          },
          {
            name: "description",
            type: "string",
            label: "Description",
            required: true,
          },
          {
            name: "body",
            type: "rich-text",
            label: "Body",
            required: true,
            isBody: true,
          },
          {
            name: "updatedAt",
            type: "datetime",
            label: "Updated At",
            required: true,
          },
        ],
        ui: {
          filename: {
            readonly: false,
          },
          beforeSubmit: async ({
            values,
          }): globalThis.Promise<Record<string, unknown>> => {
            return {
              ...values,
              updatedAt: new globalThis.Date().toISOString(),
            };
          },
          router: ({
            document,
          }): globalThis.Promise<string | undefined> | string | undefined => {
            return `/${document?._sys?.filename}`;
          },
        },
      },
    ],
  },
});
