import "./Orderspage.css";
import axios from "axios";

import { useEffect, useState, Fragment } from "react";
import { Header } from "../../Components/Header";
import { OrderGrid } from "./OrderGrid";

export function OrderPage({ cart, loadCart}) {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrder(response.data);
    };

    getOrderData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} loadCart={loadCart}/>
      </div>
    </>
  );
}
