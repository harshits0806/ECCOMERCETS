import { useState } from "react";
import { formatmoney } from "../../utils/money";
import axios from "axios";

export function CartItemDetail({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();

      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };
  //by me for update button
  // const updateCartItem = async () => {
  //   await axios.put(`/api/cart-items/${cartItem.productId}`);
  //   await loadCart();
  // };

  //my way
  // const enterPress = (event) => {
  //   if (event.key==='Enter') {
  //     updateQuantity();
  //   }
  //   else if (event.key==='Escape'){
  //     setQuantity(cartItem.quantity);
  //     setIsUpdatingQuantity(false);
  //   }
  // };


  // Teacher way
  const enterPress= (event) => {
   const keyPress = event.key;

   if(keyPress === 'Enter'){
    updateQuantity();
   }
   else if (keyPress === 'Escape'){
    setIsUpdatingQuantity(false);
    setQuantity(cartItem.quantity);
   }
  }
  
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatmoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdatingQuantity ? (
              <input
                className="inputbox"
                type="text"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={enterPress}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
            // onClick={updateCartItem}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
