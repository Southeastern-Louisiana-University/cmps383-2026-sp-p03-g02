import { Badge, Button, Card, Flex, Group } from "@mantine/core";
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

  const updateOrderStatus = async (orderId: number, status: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...order, status }),
    });

    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
    } else {
      alert("Failed to update order status");
    }
  };

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
          {currentUser?.roles[0] === "Admin" ? (
            order.status === "In Progress" ? (
              <Badge color="blue">{order.status}</Badge>
            ) : order.status === "Completed" ? (
              <Badge color="green">{order.status}</Badge>
            ) : order.status === "Cancelled" ? (
              <Badge color="red">{order.status}</Badge>
            ) : (
              <Badge color="gray">N/A</Badge>
            )
          ) : null}

          <Badge color="gray">
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }).format(new Date(order.createdAt + "Z"))}
          </Badge>
          <Badge color="teal"> Location {order.locationId}</Badge>
          <Badge color="violet"> Table {order.tableId}</Badge>
          <Badge color="blue">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.total / 100)}
          </Badge>
        </Group>
        {currentUser?.roles[0] === "Admin" ? (
          <Flex justify="center" mt="md">
            <Button
              color="red"
              variant="outline"
              onClick={() => updateOrderStatus(order.id, "Cancelled")}
            >
              Cancel
            </Button>

            <Button
              color="blue"
              variant="outline"
              onClick={() => updateOrderStatus(order.id, "In Progress")}
            >
              In Progress
            </Button>

            <Button
              color="green"
              variant="outline"
              onClick={() => updateOrderStatus(order.id, "Completed")}
            >
              Fulfil
            </Button>
          </Flex>
        ) : null}
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
        <>
          <p>Here is where you will find your order details:</p>
          {listOrders}
        </>
      )}
    </div>
  );
};

export default Orders;
