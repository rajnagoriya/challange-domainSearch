"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import DomainInfo from "./DomainInfo";
import { toast } from "react-hot-toast";

// List of valid extensions 
//  add more if any
const validExtensions = [
  ".com",
  ".org",
  ".net",
  ".co",
  ".io",
  ".xyz",
  ".abc"
];

interface ApiResponse {
  id: string;
  available: boolean;
  price: string;
  name: string;
}

const DomainSearch: React.FC = () => {
  const [domain, setDomain] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const isValidDomain = (input: string): boolean => {
    const domainPattern = /^[a-z0-9-]+\.[a-z]{2,}$/i;
    const specialCharacterPattern = /[^a-z0-9.-]/i;

    const domainLower = input.toLowerCase();
    if (specialCharacterPattern.test(domainLower)) {
      return false;
    }
    return (
      domainPattern.test(domainLower) &&
      validExtensions.some((ext) => domainLower.endsWith(ext))
    );
  };

  const handleSearch = async () => {
    const domainLower = domain.toLowerCase();

    if (!isValidDomain(domainLower)) {
      toast.error("Invalid domain format, special characters, or extension.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get<ApiResponse>(`/api/domain?domain=${domainLower}`);
      setResult(response.data);
      // toast.success("Domain found successfully!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("An error occurred while fetching the data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <div className="flex items-center shadow-md rounded-lg overflow-hidden bg-white">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g., example.com)"
          className="flex-1 p-4 text-gray-700 placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-800 text-white px-6 py-4 flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
          ) : (
            <FaSearch className="text-lg" />
          )}
        </button>
      </div>

      {result && !loading &&  (
        <div className="mt-4">
          <DomainInfo
            data={{
              id: result.id,
              available: result.available,
              price: result.price,
              name: result.name,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DomainSearch;