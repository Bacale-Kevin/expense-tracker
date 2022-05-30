import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

const obj = [
  {
    name: "Savings",
    color: "#f9c74f",
  },
  {
    name: "Investment",
    color: "#f9c74f",
  },
  {
    name: "Expense",
    color: "#f9c74f",
  },
];

export default function List() {
  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>

      {obj.map((value, i) => (
        <Transaction category={value} key={i} />
      ))}
    </div>
  );
}

function Transaction({ category }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3">
        <HiOutlineTrash style={{ color: `${category.color ?? "#e5e5e5"}` }} />
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
}
