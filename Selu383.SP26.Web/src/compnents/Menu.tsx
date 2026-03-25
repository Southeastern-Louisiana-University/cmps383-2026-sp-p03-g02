import { Grid, Image } from "@mantine/core";
import coffee from "../assets/a.jpg";
import goodCoffee from "../assets/golden coffee.jpg";
import badCoffee from "../assets/Dark fucked up coffee.jpg";
import "../App.css";

const Menu = () => {
  return (
    <div>
      <h1>Menu Page</h1>
      <h2>Try our new drinks!</h2>
      <Grid justify="space-between" style={{ padding: 30 }}>
        <div className="menu-item">
          <h3>Decaf</h3>
          <div className="menu-item image">
            <Image src={coffee} />
            <p>mmmmm yessss</p>
          </div>
        </div>

        <div className="menu-item">
          <h3>Golden Coffee</h3>
          <div className="menu-item image">
            <Image src={goodCoffee} />
            <p>mmmmm yessss</p>
          </div>
        </div>

        <div className="menu-item">
          <h3>Evil Coffee</h3>
          <div className="menu-item image">
            <Image src={badCoffee} />
            <p>mmmmm... actually no</p>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Menu;
