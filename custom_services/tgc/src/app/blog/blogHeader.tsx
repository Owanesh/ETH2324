import Link from 'next/link';
import React from 'react';

const BlogHeader = () => {
  return (
    <header>
        <div className="h-screen font-sans flex flex-col items-center justify-center">
          
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 pt-12 lg:pt-0">
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
          <div className="">
            <div className="flex flex-col items-center justify-center">
          
              <h1
                className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-zinc-400 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                <p className="sm:block">We are a movment</p><span className="text-zinc-500 dark:text-zinc-100 md:block">new,
                  full of culture an love</span>
                <p className="text-green-600 dark:text-green-500 md:block">Be part of the change</p>
              </h1>
            </div>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <Link href="/"
                className="inline-flex items-center text-white bg-green-500 justify-center mx-2 rounded-md text-sm p-2 ">
                Read the most loved article</Link>
                <Link href="/manifesto"
                className="inline-flex bg-gray-600 text-white items-center justify-center rounded-md p-2">
                Read the Manifesto
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 ml-6 sm:mt-24 lg:mt-0 lg:col-span-5">
          <p className="text-base ml-12 text-gray-600 dark:text-zinc-100 sm:text-xl lg:text-lg xl:text-xl">
          Each day, each year people kill animals for their benefits, we want to avoid all of this, and below there reported some of the numbers of homicides caused by people
          </p>
          <div className="mt-12 ml-8">
            <div className="grid grid-cols-3 gap-6 sm:gap-6 xl:gap-8">
              <div className="text-center sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <div
                      className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-red-600 bg-red-100 rounded-full">
                      Animal Killed
                    </div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">16M+</p>
                  </div>
                </div>
              </div>
              <div className="text-center sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <div
                      className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-red-600 bg-red-100 rounded-full">
                        Soup of tortoise
                        </div>
                    <p className="text-4xl font-bold ml-4 text-gray-900 dark:text-gray-100">28K Lt</p>
                  </div>
                </div>
              </div>
              <div className="text-center sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <div
                      className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-red-600 bg-red-100 rounded-full">
                      Sashimi
                    </div>
                    <p className="text-4xl font-bold ml-4 text-gray-900 dark:text-gray-100">18Tons</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center space-x-3">
            <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full"><img
                className="aspect-square h-full w-full" alt="User 1"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40" /></span><span
              className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full"><img
                className="aspect-square h-full w-full" alt="User 2"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40" /></span><span
              className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full"><img
                className="aspect-square h-full w-full" alt="User 3"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40" /></span><span
              className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full"><img
                className="aspect-square h-full w-full" alt="User 4"
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40" /></span>
            <img className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full"
              src="https://images.unsplash.com/photo-1527718641255-324f8e2d0421?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="5" />
          </div>
        </div>
      </div>
    </div>
  </div>

    </header>
  );
};

export default BlogHeader;
