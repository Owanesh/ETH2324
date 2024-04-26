export default function Product({ product }) {
<div className="min-h-screen bg-gray-900 flex items-center justify-center">
  <div className="max-w-5xl w-full mx-auto p-8 flex space-x-8">
    <div className="w-1/2 p-4 flex justify-center items-center">
      {/* Product Image */}
      <img
        className="w-full rounded-lg shadow-xl"
        src="product_image.jpg"
        alt="Product"
      />
    </div>
    <div className="w-1/2 p-4 flex justify-center items-center">
      {/* Product Details */}
      <div className="text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Product Name</h1>
        <p className="text-lg mb-4">Product Description</p>
        <p className="text-lg font-bold mb-4">Price: $XX.XX</p>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>
}