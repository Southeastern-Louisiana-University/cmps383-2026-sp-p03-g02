import { Flex } from "@mantine/core";
import "../App.css";

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <h2>Please log in to your account</h2>
      <div
        style={{
          padding: 30,
          border: "3px solid #000000",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <div>
          <Flex
            direction="column"
            gap="md"
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </Flex>
          <Flex
            direction="column"
            gap="md"
            style={{ maxWidth: "400px", margin: "20px auto" }}
          >
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </Flex>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
