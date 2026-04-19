import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Admin check
  if (user?.email !== "vaishnavibhosale145@gmail.com") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">
          Access Denied ❌
        </h1>
      </div>
    );
  }

  // ✅ Load Orders
  useEffect(() => {
    fetch("http://localhost:8080/order/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    await fetch(
      `http://localhost:8080/order/update-status/${id}/${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.reload();
  };

  const totalSales = orders.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const delivered = orders.filter(
    (o) => o.status === "DELIVERED"
  ).length;

  const pending = orders.filter(
    (o) => o.status === "PLACED"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <span className="bg-black text-white px-4 py-2 rounded-lg">
          Welcome Admin
        </span>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold mt-2">
            {orders.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Delivered</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {delivered}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            ₹{totalSales}
          </h2>
        </div>

      </div>

      {/* ORDER TABLE */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Recent Orders
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      #{order.orderId}
                    </td>

                    <td className="p-3">
                      {order.userId}
                    </td>

                    <td className="p-3">
                      ₹{order.totalAmount}
                    </td>

                    <td className="p-3">
                      {order.paymentStatus}
                    </td>

                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                        {order.status}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            order.orderId,
                            "SHIPPED"
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Ship
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            order.orderId,
                            "DELIVERED"
                          )
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Deliver
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </div>
    </div>
  );
}