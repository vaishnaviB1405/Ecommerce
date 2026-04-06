import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="font-heading text-4xl mb-4">
        Fragrance Not Found
      </h1>
      <Link to="/products" className="text-accent">
        Return to Collection
      </Link>
    </div>
  );
}