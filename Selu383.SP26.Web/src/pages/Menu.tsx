import {useEffect, useState} from "react";
import { Card, Image, Text, Badge, Button, Group, SimpleGrid, AspectRatio, Box, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import "../App.css";

const Menu = () => {

  const [items, setItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState(null);


  function Seasonal({ isSeasonal }) {
    if (isSeasonal) {
      return <Badge color="pink">Seasonal</Badge>
    }
    return null
  }

  const openModal = (item) => {
    setSelectedItem(item);
    open();
  }

  const types = ["All", ...new Set(items.map(item => item.type))];

  const filteredItems =
  selectedType === "All"
    ? items
    : items.filter(item => item.type === selectedType);

  useEffect(() => {
    fetch("/api/items")
    .then((res) => res.json())
    .then((res) => {
    setItems(res)
    });

    fetch("/api/ingredients")
    .then((res) => res.json())
    .then((res) => {
    setIngredients(res)
    });  }, [])
  

  return (
    <div>
      {/* <h1>Ingredients</h1>
      ingredients: {JSON.stringify(ingredients, null, 4)} */}

      <h1>Menu Page</h1>
      {/* <h2>Try our new drinks!</h2> */}

      {/* <Modal opened={opened} onClose={close} title="Make Selection" centered>
        {ingredients.map((ingredient) => {
          return (
            <Text key={ingredient.id}>{ingredient.name}</Text>
          )
        })}
      </Modal> */}
      <Group mb="md">
        {types.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "filled" : "light"}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </Button>
        ))}
      </Group>
      <SimpleGrid cols={4}>
      {filteredItems.map((item) => {
        item.price = item.price / 10
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

            <Text mt="md" mb="xs">
              {item.description}
            </Text>

            <Button color="green" fullWidth mt="md" onClick={() => openModal(item)}>
              Add to Cart
            </Button>
          </Card>
        )
      })}
      </SimpleGrid>
    </div>
  );
};

export default Menu;
