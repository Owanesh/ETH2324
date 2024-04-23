import articles from "@/app/blog/data/articles.json"; // Importing the JSON file
import ArticleCardComponent from "@/components/articleCard"; // Importing Article component
import ArticleType from "@/app/blog/data/types"; // Importing Article type
import { Metadata, ResolvingMetadata } from "next";
import BlogHeader from "@/components/blogHeader";

type Props = {
    params: { slug: string }
  }
  
  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const article = articles.find((article) => article.nickname === params.slug);
    if (!article) {
      return {
        title: "Article not found",
      }
    }
    else {
      return {
        title: "Article by " + article.nickname,
      }
    }
  
  }
  
  export default function BlogAuthorPage({ params }: Props) {
    const filteredArticles = articles.filter((article) => article.nickname === params.slug);
    if (filteredArticles.length <1 ) {
      return      (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl pt-10 font-bold mb-8">Not Found</h1>
        <h3 className="mb-4">Sorry, not sorry</h3>
        <img className="mb-4" height="500px" width="800px" src="/imgs/meme/zeb.gif" alt="Not Found" />
      </div>
      
      )
    }
  
  return (
    <main className="bg-white dark:bg-black  ">
            <div className="text-center">
      <h1 className="text-3xl pt-10 font-bold mb-8">Article of {params.slug}</h1>
      
    </div>
    <div className="container pt-10 mx-auto px-4">
      <div className="flex flex-wrap -mx-4">
        {filteredArticles.map((article: ArticleType, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <ArticleCardComponent article={article} />
          </div>
        ))}
      </div>
    </div>
</main>
  );
}
