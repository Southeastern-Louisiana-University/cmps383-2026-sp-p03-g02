import coffee from "../assets/a.jpg";
import goodCoffee from "../assets/golden coffee.jpg";
import badCoffee from "../assets/Dark fucked up coffee.jpg";
import "../App.css";
import {useEffect, useState} from "react";
import api from "axios";
import { Card, Image, Text, Badge, Button, Group, SimpleGrid, AspectRatio, Box } from '@mantine/core';

const Menu = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/items")
    .then((res) => res.json())
    .then((res) => {
    setItems(res)
    });
  }, [])

  function Seasonal({ isSeasonal }) {
    if (isSeasonal) {
      return <Badge color="pink">Seasonal</Badge>
    }
    return null

  }

  return (
    <div>

      {/* <h1>Items</h1>
      items: {JSON.stringify(items, null, 4)} */}

      <h1>Menu Page</h1>
      <h2>Try our new drinks!</h2>

    <SimpleGrid cols={4}>
    {items.map((item) => {
      return (
        <Card shadow="sm" padding="lg" radius="md" withBorder m="sm" p="md">
          <Card.Section>
            <Box pos="relative">
            <AspectRatio ratio={284/160}>
            <Image 
                src={item.image}
                alt={item.name}
                fit="contain"
                w="100%"
                h="100%"
            />
            </AspectRatio>
            <Box pos="absolute" top={8} right={8}>
                <Seasonal
                isSeasonal={item.isSeasonal}
            />
            </Box>
            </Box>
          </Card.Section>

          <Group justify="space-between" align="center" mt="md">
            <Text fw={500}>{item.name}</Text>
            <Badge color="blue">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(item.price)}
            </Badge>
          </Group>

          <Text size="space-between" mt="md" mb="xs">
            {item.description}
          </Text>

          <Button color="green" fullWidth mt="md">
            Add To Cart
          </Button>
        </Card>
      )
    })}
    </SimpleGrid>
    </div>
  );
};

export default Menu;
