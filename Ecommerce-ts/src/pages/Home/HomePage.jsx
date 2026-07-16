import { Header } from "../../Components/Header";
import { useSearchParams } from "react-router";
import axios from "axios";

import { ProductGrid } from "./productgrid";
import "./HomePage.css";

import { useEffect, useState } from "react";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <Header cart={cart} />

      <title>E-Commerce</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
