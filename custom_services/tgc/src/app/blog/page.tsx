import Image from "next/image";
import Link from "next/link";
import BlogHeader from "./blogHeader";
import articles from "@/app/blog/data/articles.json"; // Importing the JSON file
import ArticleComponent from "@/components/article"; // Importing Article component
import ArticleType from "@/app/blog/data/types"; // Importing Article type


export default function BlogPage() {
  return (
    <main className="bg-white dark:bg-black">
    <BlogHeader></BlogHeader>
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4">
        {articles.map((article: ArticleType, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <ArticleComponent article={article} />
          </div>
        ))}
      </div>
    </div>
</main>
  );
}
