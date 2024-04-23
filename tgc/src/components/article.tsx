
import ArticleType from "@/app/blog/data/types";
import Image from "next/image";
import Link from "next/link";

export default function ArticleComponent({ article }: { article: ArticleType }) {
    return (
        <>
            <section className="relative bg-stone-200 dark:bg-teal-800 text-white py-16">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center z-0">
                        <Image
                            src={article.image}
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                    </div>
                    <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{article.title}</h1>
                        <p className="text-lg mb-8">{article.description}</p>
                        <p className="text-sm">Written by <Link href={`/blog/author/${article.nickname}`}>{article.author}</Link> on {article.date} </p>
                        {article.tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-blue-800 dark:bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2">{tag}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <p className="text-lg mb-4">{article.content}</p>
                </div>
            </section>
            <section className="bg-gray-100 dark:bg-zinc-900 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6  dark:text-stone-400">Comments</h2>
                    {article.comments.map((comment, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 dark:bg-stone-600">
                            <p className="text-gray-800 dark:text-stone-200"><strong>{comment.author}</strong> on {comment.date}</p>
                            <p className="text-gray-800 dark:text-stone-200">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </section>

        </>
    );
}

