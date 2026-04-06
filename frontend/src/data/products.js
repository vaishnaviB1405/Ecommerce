import vetiverNoir from "../assets/vetiver-noir.png";
import saffronDusk from "../assets/saffron-dusk.png";
import amberRitual from "../assets/amber-ritual.png";
import jasmineVeil from "../assets/jasmine-veil.png";
import midnightOud from "../assets/midnight-oud.png";


export const products = [
  {
    id: "saffron-dusk",
    name: "Saffron Dusk",
    price: 2890,
    shortDescription: "Warm saffron layered with rose and amber.",
    fullDescription:
      "Saffron Dusk opens with vibrant Kashmiri saffron and pink pepper, unfolds into a heart of rose and jasmine, and settles into deep amber and Mysore sandalwood. Inspired by the richness of Indian twilight.",
    category: "Oriental Floral",
    image: saffronDusk,
    size: "100ml",
    fragranceNotes: {
      top: "Saffron, Pink Pepper",
      heart: "Rose, Jasmine",
      base: "Amber, Sandalwood"
    },
    longevity: "8–10 hours",
    occasion: "Evening, Festive, Special Events"
  },

  {
    id: "midnight-oud",
    name: "Midnight Oud",
    price: 3250,
    shortDescription: "Deep oud with smoky woods and spice.",
    fullDescription:
      "Midnight Oud is a bold composition built around rich agarwood. Accented with cardamom and incense, it dries down into smoky cedar and leather for a powerful, long-lasting presence.",
    category: "Woody Oriental",
    image: midnightOud,
    size: "100ml",
    fragranceNotes: {
      top: "Cardamom, Black Pepper",
      heart: "Oud, Incense",
      base: "Cedarwood, Leather"
    },
    longevity: "10–12 hours",
    occasion: "Night, Formal Events"
  },

  {
    id: "jasmine-veil",
    name: "Jasmine Veil",
    price: 2590,
    shortDescription: "Soft jasmine wrapped in white musk.",
    fullDescription:
      "Jasmine Veil captures the elegance of blooming jasmine sambac. Balanced with neroli and softened by white musk, it creates a luminous, graceful scent for everyday sophistication.",
    category: "Floral",
    image:jasmineVeil,
    size: "75ml",
    fragranceNotes: {
      top: "Neroli, Bergamot",
      heart: "Jasmine Sambac",
      base: "White Musk, Vanilla"
    },
    longevity: "6–8 hours",
    occasion: "Daytime, Work, Casual Elegance"
  },

  {
    id: "amber-ritual",
    name: "Amber Ritual",
    price: 3100,
    shortDescription: "Golden amber with vanilla and resin.",
    fullDescription:
      "Amber Ritual blends labdanum and golden amber with a warm base of vanilla and patchouli. A sensual fragrance that lingers close to the skin with depth and warmth.",
    category: "Amber",
    image: amberRitual,
    size: "100ml",
    fragranceNotes: {
      top: "Mandarin, Clove",
      heart: "Labdanum, Amber",
      base: "Vanilla, Patchouli"
    },
    longevity: "8–9 hours",
    occasion: "Evening Wear"
  },

  {
    id: "vetiver-noir",
    name: "Vetiver Noir",
    price: 2950,
    shortDescription: "Earthy vetiver with citrus and woods.",
    fullDescription:
      "Vetiver Noir opens fresh with bergamot and grapefruit before revealing earthy Indian vetiver. Grounded by oakmoss and cedarwood, it is refined, modern, and quietly confident.",
    category: "Woody Fresh",
    image: vetiverNoir,
    size: "100ml",
    fragranceNotes: {
      top: "Bergamot, Grapefruit",
      heart: "Indian Vetiver",
      base: "Oakmoss, Cedarwood"
    },
    longevity: "7–9 hours",
    occasion: "Office, Formal, Everyday Luxury"
  }
];