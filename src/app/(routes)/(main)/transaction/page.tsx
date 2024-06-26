"use client";

import React, { useEffect, useState } from "react";

// import { SearchIcon } from "@/components/Icons";
// import { BillboardTableList } from "@/constants/billboardTableList";
// import { StrokeIconTheme } from "@/hooks/StrokeIconTheme";

// const navItems = [
//   { name: "All", width: "53px" },
//   { name: "Region", width: "91px" },
//   { name: "Price", width: "75px" },
//   { name: "Size", width: "68px" },
//   { name: "Category", width: "110px" },
//   { name: "Date", width: "72px" },
//   { name: "Status", width: "86px" },
// ];

const navTable = [
  "Address",
  "Region",
  "Price, tg",
  "Place number",
  "Category",
  "Date",
  "Status",
];

enum STATUS {
  PURCHASED = "PURCHASED",
  IN_CART = "IN_CART",
  IDLING = "IDLING",
}

interface Billboard {
  id: number;
  address: string;
  region: string;
  price: string;
  placeNumber: string;
  category: string;
  date: string;
  status: STATUS;
  changed: boolean;
}

export default function TransactionPage() {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    async function fetchBillboards() {
      try {
        const response = await fetch("/api/billboards");
        const data: Billboard[] = await response.json();
        // Фильтрация билбордов, чтобы отображать только те, что были изменены
        const filteredData = data.filter(
          (billboard) => billboard.status !== "IDLING" || billboard.changed
        );
        setBillboards(filteredData);
      } catch (error) {
        console.error("Failed to fetch billboards:", error);
      }
    }

    fetchBillboards();
    setIsClient(true);

    const intervalId = setInterval(fetchBillboards, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function TableRow({ item }: { item: Billboard }) {
    const statusColors = {
      [STATUS.PURCHASED]: "text-green-400",
      [STATUS.IN_CART]: "text-orange-400",
      [STATUS.IDLING]: "text-red-400",
    };

    const statusLabels = {
      [STATUS.PURCHASED]: "PURCHASED",
      [STATUS.IN_CART]: "IN BASKET",
      [STATUS.IDLING]: "CANCELED",
    };

    return (
      <tr>
        <td className="px-6 py-4 truncate">{item.address}</td>
        <td className="px-6 py-4">{item.region}</td>
        <td className="px-6 py-4">{item.price}</td>
        <td className="px-6 py-4">{item.placeNumber}</td>
        <td className="px-6 py-4">{item.category}</td>
        <td className="px-6 py-4">{item.date}</td>
        <td className={`px-6 py-4 ${statusColors[item.status]}`}>
          {statusLabels[item.status]}
        </td>
      </tr>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className="overflow-y-auto scroll-hidden border rounded-lg mt-[16px] border-transparent
      max-h-[585px] ipad:max-h-[650px] laptop:max-h-[760px] QHD:max-h-[910px]
      w-[1165px] ipad:w-[1290px] laptop:w-[1550px] QHD:w-[1885px]"
      >
        <table
          className="table-fixed divide-y-[32px] divide-[#D9D9D9] dark:divide-[#010714] 
        w-full"
        >
          <thead className="text-[#464B56] dark:text-[#B7B9BE] font-normal bg-white dark:bg-[#0F1623]">
            <tr>
              {navTable.map((item, index) => (
                <th
                  key={index}
                  className="px-[26px] py-[18px] pb-[30px] text-left"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-black dark:text-white text-lg font-normal bg-white dark:bg-[#0F1623] divide-y-[16px] divide-[#D9D9D9] dark:divide-[#010714]">
            {isClient &&
              (billboards.length > 0 ? (
                billboards.map((item, index) => (
                  <TableRow key={index} item={item} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-[10px]">
                    <a
                      href="/post-add"
                      className="hover:text-[#FF9800] text-xl font-medium text-black dark:text-white whitespace-nowrap"
                    >
                      You have no billboards transaction. but you can buy
                      billboards by clicking here.
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
