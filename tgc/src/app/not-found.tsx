import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 – TGC",
  }

export default function notFound() {


    return (
       <img src="/imgs/meme/john.gif" alt="sequestro" className="w-full h-full object-cover" />
    );
}
