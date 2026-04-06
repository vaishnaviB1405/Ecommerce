import axios from "axios";
import { useEffect, useState } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/cart/${user.userId}`);
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ➕ Increase
  const increaseQty = async (item) => {
    await axios.put(`http://localhost:8080/cart/update/${item.cartId}/${item.quantity + 1}`);
    fetchCart();
  };

  // ➖ Decrease
  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    await axios.put(`http://localhost:8080/cart/update/${item.cartId}/${item.quantity - 1}`);
    fetchCart();
  };

  // ❌ Remove
  const removeItem = async (cartId) => {
    await axios.delete(`http://localhost:8080/cart/delete/${cartId}`);
    fetchCart();
  };

  // ✅ BUY (go to checkout)
  const handleBuy = () => {
    navigate("/checkout", {
      state: { cartItems }
    });
  };

  // 💰 TOTAL
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = 7;
  const finalTotal = subtotal + platformFee;

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      <div className="space-y-6">

        {cartItems.map((item) => {

          const product = products.find(p => p.id === item.productId);

          return (
            <div
              key={item.cartId}
              className="flex gap-6 border p-4 rounded-lg items-center shadow w-90"
            >

              {/* LEFT SIDE (IMAGE + QTY) */}
              <div className="flex flex-col items-center gap-3">

                <img
                  src={product?.image}
                  alt={item.productName}
                  className="w-28 h-28 object-contain"
                />

                {/* QTY BELOW IMAGE */}
                <div className="flex items-center gap-2">

                  <button
                    onClick={() => decreaseQty(item)}
                    className="bg-gray-400 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item)}
                    className="bg-gray-400 px-3 py-1 rounded"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* RIGHT SIDE (DETAILS + BUTTONS) */}
              <div className="flex flex-col justify-between flex-grow">

                <div>
                  <h2 className="text-lg font-semibold">
                    {item.productName}
                  </h2>
                  <p>₹{item.price}</p>
                </div>

                {/* BUTTONS CENTER */}
                <div className="flex flex-row items-center gap-2 mt-4">

                  <button
                    onClick={handleBuy}
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                  >
                    Buy
                  </button>

                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* BILL */}
      <div className="mt-10 border-t pt-6 text-right space-y-2">

        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Platform Fee: ₹{platformFee}</p>

        <h2 className="text-2xl font-bold">
          Total: ₹{finalTotal.toFixed(2)}
        </h2>

      </div>

    </div>
  );
}