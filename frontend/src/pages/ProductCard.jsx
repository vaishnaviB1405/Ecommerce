import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <div className="p-10">

      <h1 className="text-3xl mb-10 text-center">
        Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>
  );
}