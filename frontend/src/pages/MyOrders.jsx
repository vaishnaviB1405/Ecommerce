import { useEffect, useState } from "react";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);
  const userId = 1; // temporary

  useEffect(() => {
    fetch(`http://localhost:8080/order/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border p-6 rounded shadow"
            >

              <div className="flex justify-between mb-2">
                <h2 className="font-bold">
                  Order ID: {order.orderId}
                </h2>

                <span className="text-green-600 font-semibold">
                  {order.status}
                </span>
              </div>

              <p>Total Amount: ₹{order.totalAmount}</p>

              <p className="text-gray-600">
                Payment: {order.paymentStatus}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}