import { Button } from "@mantine/core";
import "../App.css";
import type { CartItemGetDto, UserGetDto } from "../types";

interface CartProps {
  cart: CartItemGetDto[];
  clearCart: () => void;
  currentUser: UserGetDto | null;
}

const Cart = ({ cart, clearCart, currentUser }: CartProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const placeOrder = async () => {
  if(!currentUser) {
    alert("Please log in before placing an order.")
    return;
  }
  const orderPayload = {
    userId: currentUser?.id,
    locationId: 1,
    tableId: 1,
    items: cart.flatMap((item) => Array(item.quantity).fill(item.id)),
    total,
  };

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) throw new Error("Order failed");
    clearCart();
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <p key={item.id}>
          {item.name} x{item.quantity} — ${(item.price / 100 * item.quantity).toFixed(2)}
        </p>
      ))}
      <p><strong>Total: ${(total / 100).toFixed(2)}</strong></p>
      <Button onClick={placeOrder} disabled={cart.length === 0}>
        Place Order
      </Button>
    </div>
  );
};

export default Cart;