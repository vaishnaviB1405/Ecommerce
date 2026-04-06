import { useParams } from "react-router-dom";
import { products } from "../data/products";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <NotFound />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">

      {/* PRODUCT IMAGE */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md object-contain 
          drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* PRODUCT DETAILS */}
      <div>
        <h1 className="font-heading text-4xl mb-4">
          {product.name}
        </h1>

        <p className="text-textMuted mb-6">
          {product.fullDescription}
        </p>

        <p className="text-2xl mb-8 font-medium">
          Rs. {product.price}
        </p>

        {/* DETAILS SECTION */}
        <div className="space-y-3 text-sm text-textMuted">

          <p><strong>Size:</strong> {product.size}</p>

          <p><strong>Longevity:</strong> {product.longevity}</p>

          <p><strong>Best For:</strong> {product.occasion}</p>

          <div className="pt-4">
            <p className="font-semibold mb-2">Fragrance Notes:</p>
            <p><strong>Top:</strong> {product.fragranceNotes.top}</p>
            <p><strong>Heart:</strong> {product.fragranceNotes.heart}</p>
            <p><strong>Base:</strong> {product.fragranceNotes.base}</p>
          </div>

        </div>
      </div>
      <div className="flex gap-3">

    <button
      onClick={() => addToCart(product)}
      className="bg-green-500 text-white px-3 py-1 rounded"
    >
      Add To Cart
    </button>

    <button className="bg-blue-500 text-white px-3 py-1 rounded">
      Buy
    </button>

  </div>
    </div>
  );
}