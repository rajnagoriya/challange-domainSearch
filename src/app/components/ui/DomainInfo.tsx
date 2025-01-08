import React from "react";

interface DomainInfoProps {
  data: {
    id: string;
    available: boolean;
    name: string;
    price: string;
  };
}

const DomainInfo: React.FC<DomainInfoProps> = ({ data }) => {
  
  const addToCart = (id: string) => {
   
    const cart = JSON.parse(localStorage.getItem("domain-cart") || "[]");

    
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem("domain-cart", JSON.stringify(cart));
      alert("Item added to cart:");
    } else {
      alert("Item is already in the cart");
    }
  };

  return (
    <div
      className={`border p-4 rounded-md ${
        data.available ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-sm ${
            data.available ? "text-green-500" : "text-red-500"
          }`}
        >
          {data.available ? "Available" : "Not Available"}
        </span>
        <span className="text-lg font-semibold text-gray-800">{data.price}</span>
      </div>
      <div className="flex justify-between items-end mt-4">
        <span className="text-sm text-gray-800">{data.name}</span>
        <div className="flex space-x-2">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            onClick={() => addToCart(data.id)}
          >
            Add to Cart
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainInfo;