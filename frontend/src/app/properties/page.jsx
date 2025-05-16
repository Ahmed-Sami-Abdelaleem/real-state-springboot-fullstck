"use client";

import { useEffect, useState, useCallback } from "react";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState("");
  const [roomNumber, setRoomNumber] = useState(0);
  const [bathroomNumber, setBathroomNumber] = useState(0);
  const [floor, setFloor] = useState(0);
  const [error, setError] = useState("");

  const fetchProperties = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:8080/properties", {
        method: "GET",
      
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const createProperty = async () => {
    if (!location || roomNumber < 1 || bathroomNumber < 1 || floor < 0) {
      setError("Please enter valid property details");
      return;
    }

    setError("");
    try {
      const res = await fetch("http://localhost:8080/properties", {
        method: "POST",
       
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, roomNumber, bathroomNumber, floor }),
      });
      if (!res.ok) throw new Error("Failed to create property");

      // Clear form
      setLocation("");
      setRoomNumber(0);
      setBathroomNumber(0);
      setFloor(0);

      // Refresh the list
      await fetchProperties();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Form Inputs */}
      <div className="mb-4 space-y-4">
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., New York"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Room Number </label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., 3"
            value={roomNumber}
            onChange={(e) => setRoomNumber(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Bathroom Number</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., 2"
            value={bathroomNumber}
            onChange={(e) => setBathroomNumber(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Floor</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., 5"
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={createProperty}
        >
          Add Property
        </button>
      </div>

      {/* Display Properties */}
      <ul className="space-y-2">
        {properties.map((p) => (
          <li key={p.id} className="border px-4 py-2 rounded">
            <p className="font-medium">{p.location}</p>
            <p className="text-sm text-gray-600">
              Rooms: {p.roomNumber}, Bathrooms: {p.bathroomNumber}, Floor:{" "}
              {p.floor}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
