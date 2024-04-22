import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Our Manifesto – TGC",
}

export default function About() {


    return (
        <main className="bg:white dark:bg-zinc-900 flex justify-center py-8">
            <div className="flex-col center text-center">
                <h1
                    className="mt-4 text-4xl  text-gray-900 dark:text-zinc-400 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <p className="sm:block">about  <span className="text-green-500 dark:text-teal-300  font-extrabold uppercase">
                        TGC</span></p>

                    <p className="font-extrabold text-rose-600 text-xl dark:text-rose-500 md:block">some disclaimers</p>
                </h1>

                <div className="max-w-lg py-4">
                    <p className="text-base font-mono text-gray-600 dark:text-zinc-100 sm:text-xl lg:text-lg xl:text-xl">
                        The images of individuals featured are sourced randomly from various online platforms, particularly social media. No individuals are directly involved or associated with this project in any capacity.
                    </p>
                </div>
                <div className="max-w-lg py-4">
                    <p className="text-base font-mono text-gray-600 dark:text-zinc-100 sm:text-xl lg:text-lg xl:text-xl">
                        The textual content presented, including this statement, is primarily generated using OpenAI's technology. This includes the information, descriptions, and any accompanying narratives or explanations.
                    </p>
                </div>
                <div className="max-w-lg py-4">
                    <p className="text-base font-mono text-gray-600 dark:text-zinc-100 sm:text-xl lg:text-lg xl:text-xl">
                        This project is developed by Group 0xe, an entity responsible for its creation and management. The group utilizes various tools and technologies to curate and present content for its intended purposes.                                        </p>
                </div>
            </div>


        </main>
    );
}
