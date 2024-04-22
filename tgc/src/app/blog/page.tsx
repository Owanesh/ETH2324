import articles from "@/app/blog/data/articles.json"; // Importing the JSON file
import ArticleCardComponent from "@/components/articleCard"; // Importing Article component
import ArticleType from "@/app/blog/data/types"; // Importing Article type
import { Metadata } from "next";
import BlogHeader from "@/components/blogHeader";

export const metadata: Metadata = {
  title: "Blog – TGC",
}

export default function BlogPage() {
  return (
    <main className="bg-white dark:bg-black">
    <BlogHeader></BlogHeader>
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4">
        {articles.map((article: ArticleType, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <ArticleCardComponent article={article} />
          </div>
        ))}
      </div>
    </div>
</main>
  );
}
