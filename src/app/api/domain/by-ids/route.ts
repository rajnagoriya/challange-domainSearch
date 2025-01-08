import { NextResponse } from "next/server";

const domainMockData: Record<string, { id: string; available: boolean; price: string; name: string }> = {
    "example.com": { id: "1", available: false, price: "$12.99", name: "example.com" },
    "example.net": { id: "2", available: true, price: "$10.50", name: "example.net" },
    "mywebsite.co": { id: "3", available: true, price: "$15.00", name: "mywebsite.co" },
    "tech.io": { id: "4", available: false, price: "$29.99", name: "tech.io" },
    "startup.org": { id: "5", available: true, price: "$18.99", name: "startup.org" },
    "newdomain.xyz": { id: "6", available: false, price: "$8.00", name: "newdomain.xyz" },
    "coolwebsite.abc": { id: "7", available: true, price: "$50.00", name: "coolwebsite.abc" },
    "shop.net": { id: "8", available: true, price: "$22.50", name: "shop.net" },
    "brand.co": { id: "9", available: true, price: "$40.00", name: "brand.co" },
    "service.io": { id: "10", available: false, price: "$12.99", name: "service.io" },
    "techworld.xyz": { id: "11", available: true, price: "$33.00", name: "techworld.xyz" },
    "solutions.abc": { id: "12", available: true, price: "$27.00", name: "solutions.abc" },
  };
  

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.getAll("id");

  if (ids.length === 0) {
    return NextResponse.json(
      { error: "ID query parameters are required" },
      { status: 400 }
    );
  }

  const results = Object.values(domainMockData).filter((domain) => ids.includes(domain.id));

  if (results.length === 0) {
    return NextResponse.json(
      { error: "No domains found for the provided IDs" },
      { status: 404 }
    );
  }

  return NextResponse.json(results);
}
