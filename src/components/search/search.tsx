import React from "react";
import { useState, useEffect } from "react";

export default function Search(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      props.onSearch(value);
    }, 500);

    return () => clearTimeout(handler);
  }, [value, props.onSearch]);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type to search..."
        className="border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => props.onSearch(value)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}
