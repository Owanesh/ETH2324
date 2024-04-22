import { Metadata } from "next";
import { cookies } from 'next/headers'
import crypto from 'crypto';
 
 
export const metadata: Metadata = {
    title: "Sito sottoposto a sequestro – TGC",
  }

export default async function Private() {

    return (
       <img onLoad={create} src="/imgs/meme/sequestro.jpg" alt="sequestro" className="w-full h-full object-cover" />
    );
}
