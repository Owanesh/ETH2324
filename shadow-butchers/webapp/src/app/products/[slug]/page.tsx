'use client'
import { useState } from 'react';
import products from '@/app/data/products.json'; 
 import { Product } from '@/app/data/types/productType';
type Props = {
  params: { slug: string }
}
 

export default function ProductPage({ params }: Props) {
  const product = products.find((product:Product) => product.slug === params.slug);
  if (!product) {
    return <h1>Product not found</h1>;
  }

  const [showGif, setShowGif] = useState(false);

   const handleAddToCart = () => {
     setShowGif(true);
    setTimeout(() => setShowGif(false), 4000);  
  };
  return(
    <main className="bg-white dark:bg-stone-900 text-black dark:text-stone-200"> 
<div className="min-h-screen flex items-center justify-center">
  <div className="max-w-5xl w-full mx-auto p-8 flex space-x-8">
    
    <div className="w-1/2 p-4 flex justify-center items-center border border-black p-4 border-black  dark:border-stone-100 border-4 p-3.5   hover:bg-white dark:hover:bg-stone-900 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]  ">

      {/* Product Image */}
      <img
        className="w-full "
        src={`${product.image}`}
        alt="Product"
      />
    </div>
    <div className="w-1/2 p-4 flex flex-col justify-center items-center">
      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-center sm:ml-4">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-sm mb-2">Category: {product.category}</p>

              <p className="text-lg mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-2">Price: {product.price}</p>
             
              <button onClick={handleAddToCart} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">                Add to Cart
              </button>
            </div>
      <div className="flex-1 flex flex-col justify-right sm:ml-4 w-full">

            <p className="text-sm text-right mb-2">Rating: {product.rating}</p>
              <p className="text-sm text-right  mb-2">Number of Reviews: {product.numReviews}</p>
              </div>
    </div>
  </div>
</div>
{showGif && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <img src="/imgs/meme/clippy.gif" alt="Loading" />
        </div>
      )}
</main>
  )
}