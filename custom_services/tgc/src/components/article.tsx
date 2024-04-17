
import ArticleType from "@/app/blog/data/types";
import Image from "next/image";
import Link from "next/link";

export default function ArticleComponent({ article }: { article: ArticleType }) {
// create component that display the single article page

  
  return (
<>
    <section className="bg-zinc-200 dark:bg-teal-800 text-zinc-800 dark:text-zinc-100 py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{article.title}</h1>
                <p className="text-lg mb-8">{article.description}</p>
                <p className="text-sm">Written by {article.author} on {article.date} </p>
                <div className="relative" >
                    <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/UN2aG3ImJBY"
                        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
                {article.tags.map((tag, index) => (
                <span key={index} class="inline-block bg-blue-800 dark:bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2">{tag}</span>

                    ))}
            </div>
        </div>
    </section>


    <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-4">{article.content}</p>
        </div>
    </section>
</>
  );
}

