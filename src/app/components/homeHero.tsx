import React from "react";
import DomainSearch from "./ui/DomainSearch";

const HomeHero: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col px-4">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Search your domain and reach the world
      </h1>
      <p className="text-gray-600 text-lg text-center mb-8">
        Find the perfect domain for your brand or project today.
      </p>
      <div className="w-full max-w-md">
        <DomainSearch />
      </div>
    </div>
  );
};

export default HomeHero;
