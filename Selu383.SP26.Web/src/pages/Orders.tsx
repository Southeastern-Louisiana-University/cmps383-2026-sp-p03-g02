import { Badge, Card, Flex, Group } from "@mantine/core";
import "../App.css";
import { useState, useEffect } from "react";

interface Order {
  id: number;
  total: number;
  items: number[];
}

interface Item {
  id: number;
  name: string;
  price: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const listOrders = orders.map((order) => {
    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        m="sm"
        p="md"
        key={order.id}
      >
        <Group justify="space-between" align="center" mt="md">
          <p></p>
          <Badge color="blue">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.total)}
          </Badge>
        </Group>
        <div style={{ textAlign: "left" }}>
          <h4>Items:</h4>
          <Flex direction="column">
            {order.items.map((itemId, index) => {
              const item = items.find((i) => i.id === itemId);
              return (
                <p key={`${itemId}-${index}`}>
                  {item ? item.name : "Unknown Item"}{" "}
                  {item
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price)
                    : ""}
                </p>
              );
            })}
          </Flex>
        </div>
      </Card>
    );
  });

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((res) => {
        setOrders(res);
      });

    fetch("/api/items")
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
      });
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {listOrders}
    </div>
  );
};

export default Orders;
