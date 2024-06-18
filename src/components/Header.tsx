import { ConnectButton } from "@arweave-wallet-kit/react";
import { Link } from "react-router-dom";
import { Image } from "@mantine/core";
import logo from "../assets/logo.png";

const Header = () => {
  // const route = window.location.pathname;
  return (
    <header style={styles.header}>
      <Link to="/" className="flex items-center justify-center">
        <Image className="h-8 sm:h-10 md:h-14 lg:h-14" src={logo} alt="Logo" />
        <span className="sr-only">Public Infrastructure App</span>
      </Link>
      <div>
        {/* <Link to="/add" style={route == "/add" ? styles.selected : styles.nav}>
          Add Issue
        </Link> */}
        {/* <Link to="/map" style={route == "/map" ? styles.selected : styles.nav}>
          Map
        </Link> */}
      </div>
      <ConnectButton profileModal={true} showBalance={false} showProfilePicture={false} />
      {/* <Button
        onClick={async () => {
          const res = await connect();
          console.log("Connect,\n", res);
        }}
      >
        Connect
      </Button> */}
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    margin: 0,
    textDecoration: "none",
    color: "#000",
  },
  nav: {
    textDecoration: "none",
    color: "#000",
    margin: "10px",
  },
  selected: {
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold",
    fontSize: "1.2em",
    margin: "10px",
  },
};

export default Header;
