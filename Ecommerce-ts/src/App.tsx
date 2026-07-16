import { HomePage } from "./pages/Home/HomePage";
import axios from "axios";
import { Routes, Route } from "react-router";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrderPage } from "./pages/Order/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/PageNotFound";

import "./App.css";
import { useEffect, useState } from "react";
window.axios = axios;
function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route path="orders" element={<OrderPage cart={cart} loadCart={loadCart}/>} />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
