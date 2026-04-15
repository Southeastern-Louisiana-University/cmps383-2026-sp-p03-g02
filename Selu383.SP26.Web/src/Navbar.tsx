// import { Group, Text, Button, Flex } from "@mantine/core";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// type CurrentUser = {
//   id: number;
//   userName: string;
//   roles: string[];
// };

// type NavbarProps = {
//   currentUser: CurrentUser | null;
//   setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
// };

// function Navbar({ currentUser, setCurrentUser }: NavbarProps) {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("/api/authentication/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (response.ok) {
//         setCurrentUser(null);
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <nav>
//       <Flex style={{marginLeft: 30}}>
//         <div className="left">
//           <Link to="/" className="title">
//             Caffeinated Lions
//           </Link>
//         </div>
//         <Flex align="center">
//           <ul style={{padding: 0}}>
//             <li>
//               <NavLink to="/menu" className={({ isActive }) => isActive ? "active" : ""}>Menu</NavLink>
//             </li>
//             <li>
//               <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>Orders</NavLink>
//             </li>
//             <li>
//               <NavLink to="reservations" className={({ isActive }) => isActive ? "active" : ""}>Reservations</NavLink>
//             </li>
//             <li>
//               <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>Cart</NavLink>
//             </li>
//           </ul>
//         </Flex>
//       </Flex>
//       <div className="right">
//         <NavLink to="/login" className="login">
//           Login
//         </NavLink>
//                 <Group gap="sm">
//                   {currentUser ? (
//                     <>
//                       <Text fw={600}>Hi, {currentUser.userName}</Text>
//                       <Button
//                         variant="outline"
//                         color="dark"
//                         radius="md"
//                         onClick={handleLogout}
//                       >
//                         Logout
//                       </Button>
//                     </>
//                   ) : (
//                     <NavLink
//                       to="/login"
//                       className={({ isActive }) =>
//                         isActive ? "nav-link active" : "nav-link"
//                       }
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       <Text style={{ padding: "10px" }}>Login</Text>
//                     </NavLink>
//                   )}
//                 </Group>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;