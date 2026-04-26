import { Button, Center, Flex, SegmentedControl, Select } from "@mantine/core";
import "../App.css";
import { useEffect, useState } from "react";
import type { CartItemGetDto, LocationGetDto, UserGetDto } from "../types";

interface CartProps {
  cart: CartItemGetDto[];
  clearCart: () => void;
  currentUser: UserGetDto | null;
}

const Cart = ({ cart, clearCart, currentUser }: CartProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [orderType, setOrderType] = useState<"table" | "pickup">("table");
  const [tableId, setTableId] = useState<string>("");
  const [locations, setLocations] = useState<LocationGetDto[]>([]);
  const [locationId, setLocationId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((res) => setLocations(res));
  }, []);

  const placeOrder = async () => {
    if (!currentUser) {
      alert("Please log in before placing an order.");
      return;
    }

    if (orderType === "table" && !tableId) {
      alert("Please enter a table number.");
      return;
    }

    const orderPayload = {
      locationId: parseInt(locationId ?? "1"),
      tableId: orderType === "table" ? parseInt(tableId) : 1, 
      items: [],
      orderItem: cart.flatMap((item) =>
        Array.from({ length: item.quantity }, () => ({
          itemId: item.id,
          modifications: item.modifications ?? "",
        })),
      ),
      status: "In Progress",
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
      setTableId("");
      alert("Order placed!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      <Flex
        style={{
          borderRadius: 10,
          border: "2px solid #000000",
          marginLeft: "10%",
          marginRight: "10%",
        }}
        justify="space-between"
      >
        <Flex direction="column" gap="sm" style={{ padding: 20 }}>
          {cart.length === 0 ? (
            <Center style={{ height: 200 }}>
              <h3>Your cart is empty</h3>
            </Center>
          ) : null}
          <Flex direction="column" gap="xs">
            {cart.map((item) => (
              <p key={item.id}>
                {item.name} x{item.quantity} — $
                {((item.price / 100) * item.quantity).toFixed(2)}
              </p>
            ))}
          </Flex>
        </Flex>

        <Flex
          direction="column"
          style={{
            borderLeft: "2px solid #000000",
            padding: 20,
            minWidth: 220,
          }}
        >
          <p>
            <strong>Total: ${(total / 100).toFixed(2)}</strong>
          </p>

          <p style={{ margin: "8px 0 4px" }}>Order Type:</p>
          <SegmentedControl
            value={orderType}
            onChange={(val) => setOrderType(val as "table" | "pickup")}
            data={[
              { label: "To Table", value: "table" },
              { label: "Pickup", value: "pickup" },
            ]}
            mb="sm"
          />

          {orderType === "table" && (
            <>
              <p style={{ margin: "4px 0 2px" }}>Table Number:</p>
              <input
                type="number"
                placeholder="e.g. 5"
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                style={{
                  padding: 8,
                  marginBottom: 8,
                  backgroundColor: "white",
                  color: "black",
                }}
              />
            </>
          )}
          <p style={{ margin: "8px 0 4px" }}>Location:</p>
          <Select
            placeholder="Select a location"
            value={locationId}
            onChange={setLocationId}
            data={locations.map((loc) => ({
              value: String(loc.id),
              label: loc.name,
            }))}
            mb="sm"
          />

          <p style={{ margin: "8px 0 2px" }}>Payment Information:</p>
          <p style={{ margin: 2 }}>Card Number:</p>
          <input
            type="text"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            style={{ padding: 8, backgroundColor: "white", color: "black" }}
          />
          <p style={{ margin: 2 }}>CCV:</p>
          <input
            type="text"
            placeholder="xxx"
            style={{ padding: 8, backgroundColor: "white", color: "black" }}
          />

          <Button
            onClick={placeOrder}
            disabled={cart.length === 0}
            style={{ margin: 15 }}
          >
            Place Order
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Cart;
