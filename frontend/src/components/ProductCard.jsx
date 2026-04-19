import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // ✅ ADD TO CART
  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:8080/cart/add", {
        userId: user.userId,   // must exist in localStorage
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      });

      alert("Added to cart ✅");
    } catch (error) {
      console.log(error);
      alert("Failed to add cart ❌");
    }
  };

  // ✅ BUY NOW
  const handleBuy = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      // first add item into cart
      await axios.post("http://localhost:8080/cart/add", {
        userId: user.userId,
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      });

      // then go cart page
      navigate("/cart");

    } catch (error) {
      console.log(error);
      alert("Error ❌");
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow hover:-translate-y-1 transition-all duration-300">

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-[4/5] object-cover mb-4 rounded"
      />

      {/* NAME */}
      <h3 className="text-xl font-bold mb-2">
        {product.name}
      </h3>

      {/* DESC */}
      <p className="text-sm text-gray-400 mb-3">
        {product.shortDescription}
      </p>

      {/* PRICE */}
      <p className="text-lg font-semibold mb-4">
        ₹{product.price}
      </p>

      {/* DETAILS */}
      <Link
        to={`/products/${product.id}`}
        className="text-blue-400 text-sm block mb-4"
      >
        View Details
      </Link>

      {/* BUTTONS */}
      <div className="flex gap-3">

        <button
          onClick={addToCart}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Add To Cart
        </button>

        <button
          onClick={handleBuy}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Buy
        </button>

      </div>
    </div>
  );
}