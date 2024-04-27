import Image from "next/image";
import ScrollingText from "./components/scrollingText";
import Link from "next/link";

export default function Home() {
  return (
<div className="relative isolate overflow-hidden h-screen">
  <video autoPlay muted loop className="absolute inset-0 object-cover w-full h-full z-0">
    <source src="/hero.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black opacity-50 z-0"></div>  
  <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 relative z-10 justify-center">
    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
      <h1 className="mt-10 text-4xl font-bold text-center text-white sm:text-6xl">We are you Shad0w Butchler</h1>
      <div className="mt-10 flex items-center gap-x-6 justify-center">
        <Link href="/products" className="rounded-md bg-stone-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Buy some dead aninal</Link>
        <Link href="/manifesto" className="text-sm font-semibold leading-6 text-white">Explore our manifesto <span aria-hidden="true">→</span></Link>
      </div>
    </div>
    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
      <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
      </div>
    </div>
  </div>
</div>
  );
}