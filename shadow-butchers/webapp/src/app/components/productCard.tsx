import Link from 'next/link';
import React from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  category?: string;
  location?: string;
  price: number;
  description: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const trimDescription = (description: string) => {
    // Implement your description trimming logic here
    return description;
  };

  return (
    <div key={product.id} className="border border-black p-4 border-black border-4 p-3.5   hover:bg-white dark:bg-stone-700 dark:hover:bg-stone-400 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]  ">

      <img
        src={`${product.image}`}
        alt={product.name}
        className="w-full h-auto mb-2"
      />
      <span className="text-yellow-600  font-bold text-xs ">
   // {product.category}
      </span>
      <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
      <p className=""><span className="text-blue-500 text-sm">${product.price}</span></p>
      <p className="text-gray-800">  </p>

      <p className="text-gray-500 dark:text-stone-300">Rating: {product.rating} ({product.numReviews} reviews)</p>
      {product.countInStock > 0 ? (
        <span className="inline-block bg-green-300   text-black px-4  border-2 border-black uppercase font-bold text-xs ">
          In Stock: {product.countInStock}
        </span>
      ) : (
        <span className="inline-block bg-red-500   text-white px-4  border-2 border-black uppercase font-bold text-xs ">
          Out of stock
        </span>
      )}
      <Link href={"/products/" + product.slug}> <span className="inline-block bg-black hover:bg-pink-500 text-white px-4   border-2 border-black uppercase font-bold text-xs  transition-transform hover:translate-x-1">
    ->
      </span>
      </Link>
    </div>
  );
};

export default ProductCard;
