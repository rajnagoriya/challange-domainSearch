"use client"


import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface NavbarProps {
    toggleCartDrawer: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleCartDrawer }) => {
  return (
    <nav className="w-full bg-gray-800 p-4 flex justify-end fixed">
      <FaShoppingCart
        className="text-white text-2xl cursor-pointer"
        onClick={toggleCartDrawer}
      />
    </nav>
  );
};

export default Navbar;