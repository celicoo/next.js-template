import type { JSX } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TinaMarkdown } from "tinacms/rich-text";

import client from "~/tina/__generated__/client";
import type { LegalPageQuery } from "~/tina/__generated__/types";

import env from "~/env";

type LegalPageProps = {
  params: globalThis.Promise<{
    slug: string;
  }>;
};

async function getLegalPageFromParams(
  props: LegalPageProps,
): globalThis.Promise<LegalPageQuery["legalPage"]> {
  try {
    const { slug } = await props.params;
    const { data } = await client.queries.legalPage({
      relativePath: `${slug}.md`,
    });
    return data.legalPage;
  } catch (error: unknown) {
    globalThis.console.error(
      "Unknown error occurred while fetching legal page:",
      error,
    );
    notFound();
  }
}

export async function generateMetadata(
  props: LegalPageProps,
): globalThis.Promise<Metadata> {
  const { title, description, ...page } = await getLegalPageFromParams(props);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${env.NEXT_PUBLIC_URL}/${page._sys.filename}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LegalPage(
  props: LegalPageProps,
): globalThis.Promise<JSX.Element> {
  const page = await getLegalPageFromParams(props);

  return (
    <article
      className={`
        prose
        m-auto
        px-7
        py-[65px]
        lg:prose-lg
        lg:px-0
        lg:py-[130px]
      `}
    >
      <header>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </header>
      <TinaMarkdown content={page.body} />
    </article>
  );
}
