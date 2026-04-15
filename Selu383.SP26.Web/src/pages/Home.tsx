import { Flex, Container, Image, Text, SimpleGrid, Box, AspectRatio, Title } from "@mantine/core";
import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";

const Home = () => {

  const [items, setItems] = useState([]);
  const autoplay = useRef(Autoplay({delay: 5000}));
  

  useEffect(() => {
    fetch("/api/items")
    .then((res) => res.json())
    .then((res) => {
    setItems(res)
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
              // fit="contain"
              // h={200}
              // w="auto"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.HUVnLSmPwNKr4YM64h5V0QHaE8%3Fpid%3DApi&f=1&ipt=2a07171075bd07c0db76357baf68480ecfbf4729615354dc886101e87783ed04&ipo=images"
            />
          </Box>
      </SimpleGrid>

      <h1>Try Some Of Our New Menu Items</h1>

      <Carousel
        withIndicators
        height={200}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
        loop
        slideGap="md"

      >
        {items.map((item) => (
          <Carousel.Slide key={item.id}>
            <SimpleGrid cols={2}>
            <Box>
              <Title>{item.name}</Title>
              <Text size="sm">{item.description}</Text>
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
    </Container>
  );
};

export default Home;
