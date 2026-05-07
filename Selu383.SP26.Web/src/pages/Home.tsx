import { Flex, Container, Image, Text, SimpleGrid, Box, Button, Title, Stack, Card } from "@mantine/core";
import "../App.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import type { ItemGetDto, LocationGetDto } from "../types";

const Home = () => {
  const [items, setItems] = useState<ItemGetDto[]>([]);
  const [locations, setLocations] = useState<LocationGetDto[]>([]);
  const navigate = useNavigate();
  const autoplay = useRef(Autoplay({delay: 5000}));

  const featuredItems = items.filter(
    (item) => item.isSeasonal === true  
  )

  useEffect(() => {
    fetch("/api/items")
    .then((res) => res.json())
    .then((res) => {
    setItems(res)
    });

    fetch("/api/locations")
    .then((res) => res.json())
    .then((res) => {
      setLocations(res)
    });

}, [])
  
  return (
    
    <Container size="lg">
      <Flex></Flex>
      <SimpleGrid cols={2} spacing="xl" mt="xl">

        <Box>
          <h1>Caffeinated Lions</h1>
          <Title order={2} size="h4">Welcome to Caffeinated Lions, your go-to spot for the best coffee in town!</Title>
        </Box>
        <Box pos="relative">
            <Image 
              radius="md"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.HUVnLSmPwNKr4YM64h5V0QHaE8%3Fpid%3DApi&f=1&ipt=2a07171075bd07c0db76357baf68480ecfbf4729615354dc886101e87783ed04&ipo=images"
            />
          </Box>
      </SimpleGrid>

      <Stack gap="md">
      <h1>Check out our featured items</h1>

      <Box maw={700} mx="auto">
      <Carousel
        withIndicators
        height={200}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
        slideGap="md"
      >
        {featuredItems.map((item) => (
          <Carousel.Slide key={item.id}>
            <SimpleGrid cols={2}>
            <Box>
              <Title order={2}>{item.name}</Title>
              <Text size="sm">{item.description}</Text>
              <Button 
                type="button"
                onClick={() => {
                  navigate("/menu")
                }}
                >
                  Go To Menu
                </Button>
              
            </Box>
            <Box>
              <Image
                src={item.image}
                height={200}
                fit="contain"
                radius="md"
              />
            </Box>
            </SimpleGrid>
          </Carousel.Slide>
        ))}
      </Carousel>
      </Box>
      </Stack>

      <Stack gap="lg">
      <Title>Check availability at your nearest location</Title>

      <SimpleGrid cols={3}>
      {locations.map((location) => {
        return (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="sm">
              <Title order={3}>{location.address}</Title>
              <Button onClick={() => {
              navigate(`/locations/${location.id}`)
              }}>
              View Tables
              </Button>
            </Stack>
            
          </Card>
        )
      })}
      </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Home;
