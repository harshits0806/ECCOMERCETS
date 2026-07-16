import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary.jsx";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary.jsx";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  //axios methon to get data from backend without using async function

  // useEffect(() => {
  //   axios
  //     .get("/api/delivery-options?expand=estimatedDeliveryTime")
  //     .then((response) => {
  //       setDeliveryOptions(response.data);
  //     });

  //   axios.get("/api/payment-summary").then((response) => {
  //     setPaymentSummary(response.data);
  //   });
  // }, []);

  //using Async Function
  useEffect(() => {
    const getDeliveryData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );

      setDeliveryOptions(response.data);
    };

    getDeliveryData();
  },[]);

  useEffect(()=>{
    const fetchPaymentSummary = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  },[cart])

  return (
    <>
      <CheckoutHeader cart={cart} />

      <title>Checkout</title>

      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      {/* /* <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div> */}

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
