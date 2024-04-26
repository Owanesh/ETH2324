import Image from "next/image";
import ScrollingText from "./components/scrollingText";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
                 <ScrollingText text="All products are to be understood as replicas, in compliance with local laws." />
    </main>
  );
}
