import axios from "axios";
import { useEffect, useState } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.userId) {
      fetchCart();
    }
  }, []);

  // ✅ GET CART
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/cart/${user.userId}`
      );
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ INCREASE QTY
  const increaseQty = async (item) => {
    await axios.put(
      `http://localhost:8080/cart/update/${item.cartId}/${item.quantity + 1}`
    );
    fetchCart();
  };

  // ✅ DECREASE QTY
  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    await axios.put(
      `http://localhost:8080/cart/update/${item.cartId}/${item.quantity - 1}`
    );
    fetchCart();
  };

  // ✅ REMOVE
  const removeItem = async (cartId) => {
    await axios.delete(
      `http://localhost:8080/cart/delete/${cartId}`
    );
    fetchCart();
  };

  // ✅ BUY NOW
  const handleBuy = () => {
    navigate("/checkout", {
      state: { cartItems }
    });
  };

  // ✅ TOTAL
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = cartItems.length > 0 ? 7 : 0;
  const total = subtotal + platformFee;

  return (
    <div className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl mt-20">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* LEFT SIDE PRODUCTS */}
          <div className="md:col-span-2 space-y-6">

            {cartItems.map((item) => {
              const product = products.find(
                (p) => p.id === item.productId
              );

              return (
                <div
                  key={item.cartId}
                  className="bg-zinc-900 rounded-xl p-5 flex gap-5 items-center shadow-lg"
                >
                  {/* IMAGE */}
                  <img
                    src={product?.image}
                    alt={item.productName}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {item.productName}
                    </h2>

                    <p className="text-gray-400 mt-1">
                      ₹{item.price}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() => decreaseQty(item)}
                        className="bg-red-500 w-8 h-8 rounded-full text-lg"
                      >
                        -
                      </button>

                      <span className="text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item)}
                        className="bg-green-500 w-8 h-8 rounded-full text-lg"
                      >
                        +
                      </button>

                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE BILL */}
          <div className="bg-zinc-900 p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Price Details
            </h2>

            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹7</span>
              </div>

              <hr className="border-zinc-700" />

              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleBuy}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 py-3 rounded-lg text-lg font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}