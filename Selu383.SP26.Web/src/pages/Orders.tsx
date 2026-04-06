import goodCoffee from "../assets/golden coffee.jpg";
import coffee from "../assets/a.jpg";
import badCoffee from "../assets/Dark fucked up coffee.jpg";
import { Grid, Image } from "@mantine/core";
import "../App.css";

const Orders = () => {
  return (
    <div>
      <h1>Orders Page</h1>
      <Grid className="order" justify="space-between" style={{ padding: 30 }}>
        <Grid>
          <div className="order-item" id="coffee">
            <h3>Decaf: $4.75</h3>
            <div className="order-item image">
              <Image src={coffee} />
              <p>mmmmm yessss</p>
            </div>
          </div>
          <div className="order-item" id="GoldenCoffee">
            <h3>Golden Coffee: $4.75</h3>
            <div className="order-item image">
              <Image src={goodCoffee} />
              <p>mmmmm yessss</p>
            </div>
          </div>
        </Grid>
        <p>Total: $9.50</p>
      </Grid>
      <p></p>
      <Grid className="order" justify="space-between" style={{ padding: 30 }}>
        <Grid>
          <div className="order-item" id="Decaf">
            <h3>Evil Coffee: $3.50</h3>
            <div className="order-item image">
              <Image src={badCoffee} />
              <p>mmmmm... actually no</p>
            </div>
          </div>
        </Grid>
        <p>Total: $3.50</p>
      </Grid>
    </div>
  );
};

export default Orders;
