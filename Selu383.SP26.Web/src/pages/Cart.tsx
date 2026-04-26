import { Button } from "@mantine/core";
import "../App.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  clearCart: () => void;
}

const Cart = ({ cart, clearCart }: CartProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const placeOrder = async () => {
  const orderPayload = {
    userId: 1,
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
          {item.name} x{item.quantity} — ${(item.price * item.quantity).toFixed(2)}
        </p>
      ))}
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
      <Button onClick={placeOrder} disabled={cart.length === 0}>
        Place Order
      </Button>
    </div>
  );
};

export default Cart;