import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

interface OptionsMenuProps {
  options: { label: string; onClick: () => void }[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
