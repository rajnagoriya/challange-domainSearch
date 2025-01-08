import React from "react";

interface CartItemProps {
  data: {
    id: string;
    available: boolean;
    name: string;
    price: string;
  };
  onRemove: (id: string) => void; 
}

const CartItem: React.FC<CartItemProps> = ({ data, onRemove }) => {
  const handleRemove = () => {
    onRemove(data.id);
  };

  return (
    <div
      className={`flex justify-between items-center p-4 border-b ${
        data.available ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <div>
        <span
          className={`text-sm ${data.available ? "text-green-500" : "text-red-500"}`}
        >
          {data.available ? "Available" : "Not Available"}
        </span>
        <div className="text-gray-800 text-sm mt-1">{data.name}</div>
      </div>

      <div className="flex items-center">
        <div className="ml-4 flex space-x-2">
          <button className="bg-gray-800 text-white px-3 py-2 rounded-md">
            Buy Now
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white px-3 py-2 rounded-md"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;