import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const platformFee = cartItems.length > 0 ? 7 : 0;
  const total = subtotal + platformFee;

  // ✅ PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      // =========================
      // COD PAYMENT
      // =========================
      if (paymentMethod === "COD") {
        await fetch("http://localhost:8080/order/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            address: address
          })
        });

        setOrderPlaced(true);
      }

      // =========================
      // ONLINE PAYMENT (RAZORPAY)
      // =========================
      else {
        const res = await fetch(
          `http://localhost:8080/payment/create-order?amount=${total}`,
          {
            method: "POST"
          }
        );

        const order = await res.json();

        const options = {
          key: "rzp_test_Se2unupJzU77r1", // replace key
          amount: order.amount,
          currency: order.currency,
          name: "NOCTUA Perfumes",
          description: "Order Payment",
          order_id: order.id,

          handler: async function (response) {
            await fetch("http://localhost:8080/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(response)
            });

            await fetch("http://localhost:8080/order/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                address: address
              })
            });

            setOrderPlaced(true);
          },

          theme: {
            color: "#16a34a"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  // =========================
  // SUCCESS PAGE
  // =========================
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <div className="bg-zinc-900 p-10 rounded-xl text-center w-[500px] shadow-xl">
          <h1 className="text-4xl font-bold text-green-500">
            🎉 Order Placed!
          </h1>

          <p className="mt-4 text-lg">
            Payment Method:{" "}
            <span className="font-semibold">
              {paymentMethod === "COD"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>
          </p>

          <p className="mt-3 text-gray-400">
            Your perfume order will be delivered soon.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-green-500 px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN PAGE
  // =========================
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl">
          No items in checkout
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-5">

            {/* PRODUCTS */}
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-zinc-900 p-5 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.productName}
                  </h2>
                  <p className="text-gray-400">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-lg font-bold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            {/* ADDRESS */}
            <div className="bg-zinc-900 p-5 rounded-xl">
              <h2 className="text-xl font-bold mb-3">
                Delivery Address
              </h2>

              <textarea
                rows="4"
                placeholder="Enter full delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 rounded text-white"
              ></textarea>
            </div>

            {/* PAYMENT */}
            <div className="bg-zinc-900 p-5 rounded-xl">
              <h2 className="text-xl font-bold mb-3">
                Payment Method
              </h2>

              <label className="block mb-2">
                <input
                  type="radio"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />{" "}
                Cash on Delivery
              </label>

              <label className="block">
                <input
                  type="radio"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                />{" "}
                Pay Online (Razorpay)
              </label>
            </div>

          </div>

          {/* RIGHT SIDE BILL */}
          <div className="bg-zinc-900 p-6 rounded-xl h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Bill Summary
            </h2>

            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>

              <hr className="border-zinc-700" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-6 bg-green-500 py-3 rounded-lg text-lg font-semibold"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}