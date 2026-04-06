import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  // ✅ BUY
  const handleBuy = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    navigate("/cart");
  };

  // ✅ ADD TO CART (BACKEND)
  const addToCart = async (product) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:8080/cart/add", {
        userId: user.userId,
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      });

      alert("Product added to cart ✅");

    } catch (error) {
      console.log(error);
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div className="bg-surface p-6 hover:-translate-y-1 transition-all duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-[4/5] object-cover mb-4"
      />

      <h3 className="font-heading text-xl mb-2">{product.name}</h3>

      <p className="text-textMuted text-sm mb-4">
        {product.shortDescription}
      </p>

      <p className="mb-4">Rs.{product.price}</p>

      <Link to={`/products/${product.id}`} className="text-accent text-sm">
        View Details
      </Link>

      <div className="flex gap-3">

        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add To Cart
        </button>

        <button
          className="bg-blue-400 text-white px-3 py-1 rounded"
          onClick={handleBuy}
        >
          Buy
        </button>

      </div>
    </div>
  );
}