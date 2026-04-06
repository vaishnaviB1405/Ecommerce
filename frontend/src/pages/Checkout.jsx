import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = 7;
  const total = subtotal + platformFee;

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      // ✅ COD FLOW
      if (paymentMethod === "COD") {
        await fetch(`http://localhost:8080/order/checkout/1`, {
          method: "POST"
        });

        setOrderPlaced(true);
      }

      // ✅ RAZORPAY FLOW
      else {
        const res = await fetch(
          `http://localhost:8080/payment/create-order?amount=${total}`,
          { method: "POST" }
        );

        const order = await res.json();

        const options = {
          key: "YOUR_KEY_ID", // 🔴 Replace with your Razorpay key
          amount: order.amount,
          currency: order.currency,
          name: "Luxury Perfume Store",
          description: "Order Payment",
          order_id: order.id,

          handler: async function (response) {

            // ✅ Verify payment
            await fetch("http://localhost:8080/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(response)
            });

            // ✅ Save order in backend
            await fetch(`http://localhost:8080/order/checkout/1`, {
              method: "POST"
            });

            setOrderPlaced(true);
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  // ✅ SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>

        <p className="mt-4 text-lg">
          Payment Mode:{" "}
          <strong>
            {paymentMethod === "COD"
              ? "Cash on Delivery"
              : "Online Payment (Razorpay)"}
          </strong>
        </p>

        <p className="mt-2 text-gray-600">
          Your luxury perfume order will be delivered soon.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-black text-white px-6 py-2 rounded"
        >
          Go to Home
        </button>
      </div>
    );
  }

  // ✅ CHECKOUT UI
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* PRODUCTS */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.cartId}
            className="flex justify-between border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold">{item.productName}</h2>
              <p>Qty: {item.quantity}</p>
            </div>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* BILL */}
      <div className="mt-8 text-right space-y-2">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Platform Fee: ₹{platformFee}</p>

        <h2 className="text-2xl font-bold">
          Total: ₹{total}
        </h2>
      </div>

      {/* PAYMENT METHOD */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">Select Payment Method:</h2>

        <label className="block">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        <label className="block">
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />
          Pay Online (Razorpay)
        </label>
      </div>

      {/* BUTTON */}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}