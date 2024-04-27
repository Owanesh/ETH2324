 
import React from 'react';
import products from '../data/products.json'; // Importa i dati dei prodotti
import ProductCard from '../components/productCard';
import Hero from '../components/hero';
import ScrollingText from '../components/scrollingText';
import { Product } from '../data/types/productType';

const ProdutPage: React.FC = () => {
 
  return (
    <main className='dark:bg-stone-900'>
      <ScrollingText text="The profound delight experienced by grill enthusiasts transcends that of vegans in its solemn majesty." />

      <section className="bg-repeat bg-center py-24 relative" style={{ backgroundImage: "url('/imgs/hero.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-35 dark:opacity-75"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-mono font-bold text-white mb-4">
            Your butcher just a click away
          </h1>
          <p className="text-lg text-white mb-8">
            Honor to intricate symbiosis between humans and the animal kingdom.
          </p>
        </div>
      </section>

      <div className='container mx-auto'>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 m-8">
    {products.map((product:Product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

    </main>
  );
};

export default ProdutPage;
