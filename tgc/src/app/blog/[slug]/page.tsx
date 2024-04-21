import Image from "next/image";
import Link from "next/link";
import ArticleType from "@/app/blog/data/types"; // Importing Article type
import articles from "@/app/blog/data/articles.json"; // Importing the JSON file
import ArticleComponent from "@/components/article";
import { Metadata, ResolvingMetadata } from "next";


type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const article = articles.find((article) => article.slug === params.slug);
  if (!article) {
    return {
      title: "Article not found",
    }
  }
  else {
    return {
      title: article.title,
    }
  }

}

export default function BlogPagePage({ params }: Props) {
  const article = articles.find((article) => article.slug === params.slug);
  if (!article) {
    return <h1>{params.slug} not found {params.slug}</h1>;
  }

  return (
    <>
      <main className=" bg-white text-black dark:bg-zinc-900 dark:text-zinc-300 min-h-screen">
        <ArticleComponent article={article} />
      </main>
    </>
  );
}
