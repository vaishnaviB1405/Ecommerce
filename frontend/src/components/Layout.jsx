import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {products} from "../data/products";

export default function Layout() {
const [search, setSearch] = useState("");

  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user?.name || null);
    }
  }, []);

  // ✅ LOGOUT (MAIN FIX)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");

    setUsername(null); // 🔥 instantly update UI

    navigate("/login"); // redirect
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 flex flex-col">

      <header className="flex justify-between items-center px-12 py-6 border-b border-neutral-800">

        <Link to="/" className="font-serif text-2xl tracking-widest">
          NOCTUA
        </Link>

         

<input
  type="text"
  placeholder="Search perfumes..."
  value={search}
  onChange={(e) => {
    const value = e.target.value;
    setSearch(value);

    const found = products.find(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    if (found) {
      navigate(`/products/${found.id}`); // ✅ IMPORTANT
    }
  }}
  className="px-3 py-1 rounded bg-white text-black w-64"
/>



        <div className="flex gap-6 items-center">

          <Link to="/products">COLLECTION</Link>
          <Link to="/about">ABOUT</Link>

          {/* ✅ USER / LOGIN */}
          {!username ? (
            <Link to="/login">LOGIN</Link>
          ) : (
            <div className="relative">
              <span
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-amber-500 font-semibold cursor-pointer"
              >
                {username}
              </span>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-32 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
          onClick={() => navigate("/orders")} className="bg-black text-white px-4 py-2 rounded">
          My Orders
          </button>

          <Link to="/cart">CART</Link>

        </div>

      </header>

      <main className="flex-grow px-12">
        <Outlet />
      </main>

      <footer className="text-center py-10 text-sm border-t border-neutral-800">
        © 2026 Noctua Parfums
      </footer>

    </div>
  );
}