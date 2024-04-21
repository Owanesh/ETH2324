import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sito sottoposto a sequestro – TGC",
  }

export default function Manifesto() {


    return (
       <img src="/imgs/meme/sequestro.jpg" alt="sequestro" className="w-full h-full object-cover" />
    );
}
