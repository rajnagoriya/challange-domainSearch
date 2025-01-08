"use client"

import Navbar from "@/components/Nav";
import CartDrawer from "@/components/ui/cartDrawer";
import { useState } from "react";
import HomeHero from "@/components/homeHero";

export default function Home() {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsCartDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar toggleCartDrawer={toggleCartDrawer} />
      <HomeHero/>
      <CartDrawer isCartDrawerOpen={isCartDrawerOpen} toggleCartDrawer={toggleCartDrawer} /> 
    </>
  );
}
