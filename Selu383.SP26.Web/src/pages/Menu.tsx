import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
  AspectRatio,
  Box,
  Modal,
  Checkbox,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "../App.css";
import type { ItemGetDto, IngredientGetDto, UserGetDto } from "../types";

interface MenuProps {
  addToCart: (item: CartItem) => void;
  currentUser: UserGetDto | null;
}

interface CartItem extends ItemGetDto {
  selectedIngredients?: IngredientGetDto[];
}

function Seasonal({ isSeasonal }: { isSeasonal: boolean }) {
  if (isSeasonal) return <Badge color="pink">Featured</Badge>;
  return null;
}

const Menu = ({ addToCart, currentUser }: MenuProps) => {
  const [addItemOpened, { open: openAddItem, close: closeAddItem }] =
    useDisclosure(false);
  const [items, setItems] = useState<ItemGetDto[]>([]);
  const [ingredients, setIngredients] = useState<IngredientGetDto[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState<ItemGetDto | null>(null);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>(
    [],
  );

  const [editItem, setEditItem] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    image: "",
    isSeasonal: false,
  });

  const openModal = (item: ItemGetDto) => {
    setSelectedItem(item);
    setEditItem({
      name: item.name,
      description: item.description,
      price: (item.price / 100).toFixed(2), 
      type: item.type,
      image: item.image ?? "",
      isSeasonal: item.isSeasonal,
    });
    open();
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const res = await fetch(`/api/items/${selectedItem.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== selectedItem.id));
      close();
    } else {
      alert("Failed to delete item");
    }
  };
  const handleEditItem = async () => {
    if (!selectedItem) return;

    const res = await fetch(`/api/items/${selectedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...editItem,
        price: Math.round(parseFloat(editItem.price) * 100), 
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      close();
    } else {
      alert("Failed to save changes");
    }
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const selectedIngredients = ingredients.filter((ing) =>
      selectedIngredientIds.includes(ing.id),
    );

    addToCart({
      ...selectedItem,
      selectedIngredients,
    });

    close();
  };

  const availableIngredients = ingredients.filter((ing) =>
    selectedItem?.ingredients?.includes(ing.id),
  );

  const types = ["All", ...new Set(items.map((item) => item.type))];

  const filteredItems =
    selectedType === "All"
      ? items
      : items.filter((item) => item.type === selectedType);

  const adminFeatures = currentUser?.roles.includes("Admin") ? (
    <Button color="orange" mb="md" onClick={openAddItem}>
      + Add Menu Item
    </Button>
  ) : null;

  const addItems = () => {
    if (!selectedItem) return;

    const selectedIngredients = ingredients.filter((ing) =>
      selectedIngredientIds.includes(ing.id),
    );

    addToCart({
      ...selectedItem,
      selectedIngredients,
    });

    close();
  };

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((res) => setItems(res));

    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((res) => setIngredients(res));
  }, []);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    image: "",
    isSeasonal: false,
  });

  const handleAddItem = async () => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...newItem,
        price: Math.round(parseFloat(newItem.price) * 100),
      }),
    });

    if (res.ok) {
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setNewItem({
        name: "",
        description: "",
        price: "",
        type: "",
        image: "",
        isSeasonal: false,
      });
      closeAddItem();
    } else {
      alert("Failed to add item");
    }
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={selectedItem?.name}
        centered
        withinPortal
      >
        {currentUser?.roles.includes("Admin") ? (
          <Stack gap="sm">
            <div>
              <Text size="sm" fw={500} mb={4}>
                Name
              </Text>
              <input
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />
            </div>
            <div>
              <Text size="sm" fw={500} mb={4}>
                Description
              </Text>
              <textarea
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
                value={editItem.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
              />
            </div>
            <div>
              <Text size="sm" fw={500} mb={4}>
                Price ($)
              </Text>
              <input
                type="number"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
                value={editItem.price}
                onChange={(e) =>
                  setEditItem({ ...editItem, price: e.target.value })
                }
              />
            </div>
            <div>
              <Text size="sm" fw={500} mb={4}>
                Type
              </Text>
              <input
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
                value={editItem.type}
                onChange={(e) =>
                  setEditItem({ ...editItem, type: e.target.value })
                }
              />
            </div>
            <div>
              <Text size="sm" fw={500} mb={4}>
                Image URL
              </Text>
              <input
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
                value={editItem.image}
                onChange={(e) =>
                  setEditItem({ ...editItem, image: e.target.value })
                }
              />
            </div>
            <Checkbox
              label="Featured / Seasonal"
              checked={editItem.isSeasonal}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  isSeasonal: e.currentTarget.checked,
                })
              }
            />
            <Button color="blue" fullWidth mt="sm" onClick={handleEditItem}>
              Save Changes
            </Button>
            <Button color="red" fullWidth mt="xs" onClick={handleDeleteItem}>
              Delete Item
            </Button>
          </Stack>
        ) : (
          <>
            <Text mb="sm">{selectedItem?.description}</Text>
            <Badge color="blue" mb="md">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format((selectedItem?.price ?? 0) / 100)}
            </Badge>
            <Text fw={500} mb="xs">
              Ingredients:
            </Text>
            <Checkbox.Group
              value={selectedIngredientIds.map(String)}
              onChange={(values) =>
                setSelectedIngredientIds(values.map((v) => Number(v)))
              }
            >
              <Stack gap="xs" mb="md">
                {availableIngredients.map((ing) => (
                  <Checkbox
                    key={ing.id}
                    value={String(ing.id)}
                    label={ing.name}
                  />
                ))}
              </Stack>
            </Checkbox.Group>
            <Button color="green" fullWidth mt="md" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </>
        )}
      </Modal>

      <Modal
        opened={addItemOpened}
        onClose={closeAddItem}
        title="Add Menu Item"
        centered
        withinPortal
      >
        <Stack gap="sm">
          <div>
            <Text size="sm" fw={500} mb={4}>
              Name
            </Text>
            <input
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          <div>
            <Text size="sm" fw={500} mb={4}>
              Description
            </Text>
            <textarea
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
          </div>
          <div>
            <Text size="sm" fw={500} mb={4}>
              Price ($)
            </Text>
            <input
              type="number"
              step="0.01"
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
          </div>
          <div>
            <Text size="sm" fw={500} mb={4}>
              Type
            </Text>
            <input
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              placeholder="e.g. Coffee, Crepe, Bagel, etc."
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            />
          </div>
          <div>
            <Text size="sm" fw={500} mb={4}>
              Image URL
            </Text>
            <input
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              value={newItem.image}
              onChange={(e) =>
                setNewItem({ ...newItem, image: e.target.value })
              }
            />
          </div>
          <Checkbox
            label="Featured / Seasonal"
            checked={newItem.isSeasonal}
            onChange={(e) =>
              setNewItem({ ...newItem, isSeasonal: e.currentTarget.checked })
            }
          />
          <Button color="green" fullWidth mt="sm" onClick={handleAddItem}>
            Add Item
          </Button>
        </Stack>
      </Modal>

      <h1>Menu</h1>
      {adminFeatures}

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
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            m="sm"
            p="md"
            key={item.id}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Card.Section>
              <Box pos="relative">
                <AspectRatio ratio={284 / 160}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fit="contain"
                    w="100%"
                    h="100%"
                  />
                </AspectRatio>
                <Box pos="absolute" top={8} right={8}>
                  <Seasonal isSeasonal={item.isSeasonal} />
                </Box>
              </Box>
            </Card.Section>
            <div style={{ flex: 1 }}>
              <Group justify="space-between" align="center" mt="md">
                <Text fw={500}>{item.name}</Text>
                <Badge color="blue">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.price / 100)}
                </Badge>
              </Group>
              <Text mt="md" mb="xs">
                {item.description}
              </Text>
            </div>
            {currentUser?.roles.includes("Admin") ? (
              <Button
                color="orange"
                fullWidth
                mt="md"
                onClick={() => openModal(item)}
              >
                Manage Item
              </Button>
            ) : (
              <Button
                color="green"
                fullWidth
                mt="md"
                onClick={() => openModal(item)}
              >
                Add to Cart
              </Button>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Menu;
