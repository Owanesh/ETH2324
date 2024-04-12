import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
<div className="relative isolate overflow-hidden h-screen bg-green-500">
  <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
      <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">We are The Green Crusaders</h1>
      <div className="mt-10 flex items-center gap-x-6">
        <a href="#" className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Get started</a>
        <a href="#" className="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
      <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
      </div>
    </div>
  </div>
</div>
</>
  );
}
