import { useEffect, useState } from "react";
import {
  Card, Image, Text, Badge, Button, Group,
  SimpleGrid, AspectRatio, Box, Modal, Checkbox, Stack
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "../App.css";
import type { ItemGetDto, IngredientGetDto } from "../types";

interface MenuProps {
  addToCart: (item: CartItem) => void;
}

interface CartItem extends ItemGetDto {
  selectedIngredients?: IngredientGetDto[];
}

function Seasonal({ isSeasonal }: { isSeasonal: boolean }) {
  if (isSeasonal) return <Badge color="pink">Featured</Badge>;
  return null;
}

const Menu = ({ addToCart }: MenuProps) => {
  const [items, setItems] = useState<ItemGetDto[]>([]);
  const [ingredients, setIngredients] = useState<IngredientGetDto[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState<ItemGetDto | null>(null);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);

  const openModal = (item: ItemGetDto) => {
    setSelectedItem(item);
    open();
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const selectedIngredients = ingredients.filter((ing) => 
      selectedIngredientIds.includes(ing.id)
  )

    addToCart({
      ...selectedItem,
      selectedIngredients,
    });

    close();
  };

  const availableIngredients = ingredients.filter((ing) => 
    selectedItem?.ingredients?.includes(ing.id)
  )

  const types = ["All", ...new Set(items.map((item) => item.type))];

  const filteredItems =
    selectedType === "All"
      ? items
      : items.filter((item) => item.type === selectedType);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((res) => setItems(res));

    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((res) => setIngredients(res));
  }, []);

  return (
    <div>
  <Modal opened={opened} onClose={close} title={selectedItem?.name} centered withinPortal>
        <Text mb="sm">{selectedItem?.description}</Text>
        <Badge color="blue" mb="md">
          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((selectedItem?.price ?? 0) / 100 )}
        </Badge>
        <Text fw={500} mb="xs">Ingredients:</Text>
        <Checkbox.Group value = {selectedIngredientIds.map(String)} onChange={(values) => setSelectedIngredientIds(values.map((v) => Number(v)))}>
          <Stack gap="xs" mb="md">
            {availableIngredients.map((ing) => (
              <Checkbox key={ing.id} value={String(ing.id)} label={ing.name}/>
            ))}
          </Stack>
        </Checkbox.Group>
        <Button
          color="green"
          fullWidth
          mt="md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Modal>

      <h1>Menu Page</h1>


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
        {filteredItems.map((item) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder m="sm" p="md" key={item.id} style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Card.Section>
              <Box pos="relative">
                <AspectRatio ratio={284 / 160}>
                  <Image src={item.image} alt={item.name} fit="contain" w="100%" h="100%" />
                </AspectRatio>
                <Box pos="absolute" top={8} right={8}>
                  <Seasonal isSeasonal={item.isSeasonal} />
                </Box>
              </Box>
            </Card.Section>
            <div style={{flex: 1}}>
            <Group justify="space-between" align="center" mt="md">
              <Text fw={500}>{item.name}</Text>
              <Badge color="blue">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price / 100)}
              </Badge>
            </Group>
            <Text mt="md" mb="xs">{item.description}</Text>
            </div>
            <Button color="green" fullWidth mt="md" onClick={() => openModal(item)}>
              Add to Cart
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Menu;