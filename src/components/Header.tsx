import { ConnectButton } from "@arweave-wallet-kit/react";
import { Link } from "react-router-dom";
import { Image } from "@mantine/core";
import logo from "../assets/logo.png";

const Header = () => {
  // const route = window.location.pathname;
  return (
    <header className="bg-white p-2 sm:p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center justify-center">
        <Image className="h-7 sm:h-10 md:h-14 lg:h-14" src={logo} alt="Logo" />
        <span className="sr-only">Public Infrastructure App</span>
      </Link>
      <div></div>
      <ConnectButton profileModal={true} showBalance={false} showProfilePicture={false} />
    </header>
  );
};

export default Header;
