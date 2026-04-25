import { Badge, Card, Flex, Group } from "@mantine/core";
import "../App.css";
import { useState, useEffect } from "react";
import type { OrderGetDto, ItemGetDto, UserGetDto } from "../types";

interface OrderProps {
    currentUser: UserGetDto | null;
  }

const Orders = ({ currentUser }: OrderProps) => {
  const [orders, setOrders] = useState<OrderGetDto[]>([]);
  const [items, setItems] = useState<ItemGetDto[]>([]);
 
  const userOrders = currentUser?.roles[0] === "Admin" ? orders : orders.filter(
    (order) => order.userId == currentUser?.id
  )

  const listOrders = userOrders.map((order) => {
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
          <div>
            <text>{order.userName}</text>
          </div>
          <Badge color="blue">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.total / 100)}
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
                      }).format(item.price / 100)
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

    fetch("/api/users")
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
