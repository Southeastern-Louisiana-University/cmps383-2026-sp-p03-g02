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
    if (!currentUser) {
      alert("Please log in before placing an order.");
      return;
    }

    const orderPayload = {
      locationId: 1,
      tableId: 1,
      items: [], // not needed anymore since we're sending orderItem
      orderItem: cart.flatMap((item) =>
        Array.from({ length: item.quantity }, () => ({
          itemId: item.id,
          modifications: item.modifications ?? "",
        })),
      ),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Order failed:", err);
        alert("Order failed: " + err);
        return;
      }

      clearCart();
      alert("Order placed!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <p key={item.id}>
          {item.name} x{item.quantity} — $
          {((item.price / 100) * item.quantity).toFixed(2)}
        </p>
        // {item.selectedIngredients?.length > 0 && (
        //   <ul>
        //     {item.selectedIngredients.map((ingredient) => (
        //       <li key={ingredient.id}>{ingredient.name}</li>
        //     ))}
        //   </ul>
        // )}
      ))}
      <p>
        <strong>Total: ${(total / 100).toFixed(2)}</strong>
      </p>
      <Button onClick={placeOrder} disabled={cart.length === 0}>
        Place Order
      </Button>
    </div>
  );
};

export default Cart;
