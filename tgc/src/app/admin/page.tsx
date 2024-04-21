import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sito sottoposto a sequestro – TGC",
  }

export default function Manifesto() {


    return (
       <img src="/imgs/meme/seized.jpg" alt="seized" className="w-full h-full object-cover" />
    );
}
