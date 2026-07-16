import dayjs from "dayjs";
export function DeliveryDate({ deliveryOptions, cartItem }) {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });
  return (
    <div className="delivery-date">
      Delivery date:
      {dayjs(selectedDeliveryOption.estimateDeliveryTimeMs).format(
        "dddd, MMMM D",
      )}
    </div>
  );
}
