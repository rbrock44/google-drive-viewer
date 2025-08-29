import React from "react";
import {useState, useEffect} from "react";

export default function Search(props) {
    const [value, setValue] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            props.onSearch(value);
        }, 500);

        return () => clearTimeout(handler);
    }, [value, props.onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.handleExactMatch(e.target.checked);
    };

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
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={props.exactMatch}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-white-700">Exact Match</span>
            </label>
        </div>
    );
}
