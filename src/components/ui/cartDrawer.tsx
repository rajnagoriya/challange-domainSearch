
"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import OptionsMenu from "./OptionsMenu";
import CartItem from "./CartItem";
import axios from "axios";
import { toast } from "react-hot-toast";

// type for a cart item
interface CartItemType {
  id: string;
  available: boolean;
  name: string;
  price: string;
}

interface CartDrawerProps {
  isCartDrawerOpen: boolean;
  toggleCartDrawer: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isCartDrawerOpen, toggleCartDrawer }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const cartIds: string[] = JSON.parse(localStorage.getItem("domain-cart") || "[]");

        if (cartIds.length === 0) {
          setCartItems([]);
          return;
        }

        const queryString = cartIds.map((id) => `id=${id}`).join("&");
        const response = await axios.get(`/api/domain/by-ids?${queryString}`);

        if (response.status === 200) {
          setCartItems(response.data);
        } else {
          throw new Error("Failed to fetch cart items");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (isCartDrawerOpen) {
      fetchCartItems();
    }
  }, [isCartDrawerOpen]);

  const clearCart = () => {
    localStorage.removeItem("domain-cart");
    setCartItems([]);
    toast.success("Cart cleared.");
  };

  const removeUnavailableDomains = () => {
    const updatedCart = cartItems.filter((item) => item.available);
    setCartItems(updatedCart);
    localStorage.setItem("domain-cart", JSON.stringify(updatedCart.map((item) => item.id)));
    toast.success("Unavailable domains removed.");
  };

  const copyDomainsToClipboard = () => {
    const domainNames = cartItems.map((item) => item.name).join(", ");
    navigator.clipboard.writeText(domainNames);
    toast.success("Domains copied to clipboard!");
  };

  const keepBestDomains = (numDomainsRequired: number) => {
    const sortedCart = [...cartItems].sort((a, b) => {
      const domainPriority: Record<string, number> = { // add more if any 
        ".com": 1,
        ".org": 2,
        ".net": 3,
        ".co": 4,
        ".io": 5,
        ".xyz": 6,
        ".abc": 7,
      };
      
      const aEnding = a.name.substring(a.name.lastIndexOf("."));
      const bEnding = b.name.substring(b.name.lastIndexOf("."));

      const aPriority = domainPriority[aEnding as keyof typeof domainPriority] || 999;
      const bPriority = domainPriority[bEnding as keyof typeof domainPriority] || 999;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      return a.name.length - b.name.length;
    });

    const updatedCart = sortedCart.slice(0, numDomainsRequired);
    setCartItems(updatedCart);
    localStorage.setItem("domain-cart", JSON.stringify(updatedCart.map((item) => item.id)));
    toast.success(`Kept best ${numDomainsRequired} domains.`);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("domain-cart", JSON.stringify(updatedCart.map((item) => item.id)));
    toast.success("Domain removed from cart.");
  };

  const menuOptions = [
    { label: "Clear Cart", onClick: clearCart },
    { label: "Remove Unavailable Domains", onClick: removeUnavailableDomains },
    { label: "Copy Domains to Clipboard", onClick: copyDomainsToClipboard },
    {
      label: "Keep Best Domains (Top 3)",
      onClick: () => keepBestDomains(3),
    },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-97 bg-white shadow-lg transform ${
        isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">Cart</h2>
        <div className="flex items-center space-x-4">
          <OptionsMenu options={menuOptions} />
          <FaTimes
            className="text-gray-800 text-2xl cursor-pointer"
            onClick={toggleCartDrawer}
          />
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <p>No domains added to cart</p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} data={item} onRemove={removeFromCart} />)
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
