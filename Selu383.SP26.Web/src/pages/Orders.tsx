import { Badge, Card, Flex, Group } from "@mantine/core";
import "../App.css";
import { useState, useEffect } from "react";
import type { OrderGetDto, ItemGetDto, UserGetDto } from "../types";
import { Link } from "react-router-dom";

interface OrderProps {
  currentUser: UserGetDto | null;
}

const Orders = ({ currentUser }: OrderProps) => {
  const [orders, setOrders] = useState<OrderGetDto[]>([]);
  const [items, setItems] = useState<ItemGetDto[]>([]);

  const userOrders =
    currentUser?.roles[0] === "Admin"
      ? orders
      : orders.filter((order) => order.userId == currentUser?.id);

    console.log(currentUser?.roles[0] === "Admin");
    console.log("Menu currentUser:", currentUser);
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
          <div>
            <text>{order.userName}</text>
          </div>
          <Badge color="gray">
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }).format(new Date(order.createdAt + "Z"))}
          </Badge>
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
            {order.orderItem.map((oi, index) => (
              <p key={`${oi.itemId}-${index}`}>
                {oi.itemName}{" "}
                {oi.modifications && <em> — {oi.modifications}</em>}
              </p>
            ))}
          </Flex>
        </div>
      </Card>
    );
  });

  useEffect(() => {
    fetch("/api/orders", { credentials: "include" })
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
      {userOrders.length === 0 ? (
        <p>
          You haven't placed any orders yet. Check out our{" "}
          <Link to="/menu" className="title">
            menu
          </Link>
          !
        </p>
      ) : (
        listOrders
      )}
    </div>
  );
};

export default Orders;
