
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../data/products";

export default function Layout() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUsername(user.name);
      setEmail(user.email);
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <header className="flex justify-between items-center px-12 py-6 border-b border-neutral-800">

        {/* LOGO */}
        
        <Link to="/" className="text-2xl font-bold tracking-widest">
          NOCTUA
        </Link>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search perfumes..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            const found = products.find((p) =>
              p.name.toLowerCase().includes(value.toLowerCase())
            );

            if (found) {
              navigate(`/products/${found.id}`);
            }
          }}
          className="px-3 py-1 rounded text-black w-64"
        />

        {/* MENU */}
        <div className="flex gap-6 items-center">

          <Link to="/products">COLLECTION</Link>
          <Link to="/about">ABOUT</Link>

          {/* LOGIN / USER */}
          {!username ? (
            <Link to="/login">LOGIN</Link>
          ) : (
            <div className="relative">

              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-yellow-400 font-semibold"
              >
                {username} ▼
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-44 z-50">

                  <button
                    onClick={() => navigate("/orders")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    My Orders
                  </button>

                  {/* ADMIN PANEL */}
                  {email === "vaishnavibhosale145@gmail.com" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Admin Panel
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

          <Link to="/cart">CART</Link>

        </div>
      </header>

      {/* BODY */}
      <main className="flex-grow px-12 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 border-t border-neutral-800">
        © 2026 Noctua Parfums
      </footer>

    </div>
  );
}