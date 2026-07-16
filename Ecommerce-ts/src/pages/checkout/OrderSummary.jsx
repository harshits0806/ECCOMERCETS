import { CartItemDetail } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          // const deleteCartItem = async () => {
          //   axios.delete(`/api/cart-items/${cartItem.productId}`);
          // };
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />
              <div className="cart-item-details-grid">
                <CartItemDetail cartItem={cartItem} loadCart={loadCart} />
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
