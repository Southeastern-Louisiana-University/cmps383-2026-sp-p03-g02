import { Flex, Grid, Image } from "@mantine/core";
import coffee from "../assets/a.jpg";
import goodCoffee from "../assets/golden coffee.jpg";
import badCoffee from "../assets/Dark fucked up coffee.jpg";
import "../App.css";

const Home = () => {
  return (
    <Grid justify="center" style={{ padding: 30 }}>
      <Flex justify="space-between" style={{ padding: 30 }}>
        <Grid>
          <h1>Caffeinated Lions</h1>
          <p
            style={{ maxWidth: "600px", fontSize: "1.2rem", textAlign: "left" }}
          >
            Welcome to Caffeinated Lions, your go-to spot for the best coffee in
            town! .........
          </p>
        </Grid>

        <div style={{ padding: 20 }}>
          <Image radius="md" w="auto" fit="contain" src={coffee} />
        </div>
      </Flex>

      <h2>Try our new drinks!</h2>
      <Grid justify="space-between" style={{ padding: 30 }}>
        <div className="menu-item home">
          <h3>Decaf</h3>
          <Image radius="md" className="menu-item home image" src={coffee} />
        </div>
        <div className="menu-item home">
          <h3>Golden Coffee</h3>
          <Image
            radius="md"
            w="auto"
            fit="contain"
            className="menu-item home image"
            src={goodCoffee}
          />
        </div>
        <div className="menu-item home">
          <h3>Evil Coffee</h3>
          <Image
            radius="md"
            w="auto"
            fit="contain"
            className="menu-item home image"
            src={badCoffee}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
