import { Badge, Card, Flex, Group } from "@mantine/core";
import "../App.css";
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axios";
import type { Order, Item, User } from "../types";

const Orders = () => {
  const [user, setUser] = useState<User>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  useEffect(() => {
    axiosInstance
      .get("/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load items:", err));

    axiosInstance
      .get("/login/authentication/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load orders:", err));

    axiosInstance
      .get("/orders")
      .then((res) => {
        const filtered = res.data.filter((order: Order) => order.userId === user?.id);
        setOrders(filtered);
      })
      .catch((err) => console.error("Failed to load orders:", err));
  }, [user]);
  return (
    <div>
      <h1>Orders</h1>

      {orders.map((order) => (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          m="sm"
          p="md"
          key={order.id}
        >
          <p></p>
          <Badge color="blue">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.total)}
          </Badge>
          <h4>Items:</h4>
          <Flex direction="column">
            {order.items?.map((itemId, index) => {
              const item = items.find((i) => i.id === itemId);
              return (
                <p key={`${itemId}-${index}`}>
                  {item
                    ? `${item.name} ${formatCurrency(item.price)}`
                    : "Unknown Item"}
                </p>
              );
            })}
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
