"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

export default function Posts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produts`);
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      // console.error("Fetch posts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if(loading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col items-center gap-2 my-4">

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}