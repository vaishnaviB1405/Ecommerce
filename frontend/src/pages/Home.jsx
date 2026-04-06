import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"
import About from "../pages/About";

export default function Home() {
  return (
     <div>
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between">

      {/* LEFT CONTENT */}
      <div className="md:w-1/2 py-20">
        <h1 className="font-serif text-5xl md:text-6xl tracking-wide mb-8 leading-tight">
          Noctua Parfums
        </h1>

        <p className="text-neutral-400 text-lg max-w-md mb-10 leading-relaxed">
          Tradition in every note. Luxury in every breath
        </p>

        <Link
          to="/products"
          className="border border-amber-500 text-amber-500 
          px-8 py-3 text-sm tracking-wider
          transition duration-300
          hover:bg-amber-500 hover:text-black"
        >
          EXPLORE COLLECTION
        </Link>
      </div>

      {/* RIGHT IMAGE */}
      <div className="md:w-1/2 flex justify-center py-20">
        <img
          src={Logo}
          alt="Luxury Perfume Bottle"
          className="w-80 md:w-96 object-contain"
        />
      </div>

    

    </section>

    <About />
   
   </div>

  );
}