import React from "react";
import Logo from "../assets/logo.png"

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">

      <h1 className="text-5xl font-serif tracking-widest text-amber-400 mb-6">
        NOCTUA PARFUMS
      </h1>

      <p className="text-xl text-neutral-300 max-w-xl leading-relaxed">
        Tradition in every note. Luxury in every breath.
      </p>

      <p className="text-neutral-400 mt-6 max-w-2xl">
        Noctua Parfums is a celebration of timeless elegance and refined
        craftsmanship. Every fragrance is designed to capture emotion,
        memory, and individuality — blending tradition with modern luxury.
      </p>

      <div className="md:w-1/2 flex justify-center py-20">
              <img
                src={Logo}
                alt="Luxury Perfume Bottle"
                className="w-80 md:w-96 object-contain"
              />
            </div>

    </div>
  );
};

export default About;