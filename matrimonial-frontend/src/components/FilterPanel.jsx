import React from "react";

export default function FilterPanel({ filters, setFilters, onSearch }) {
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

 const handleSearchClick = () => {
  console.log("🔍 FRONTEND: Searching with filters:", filters);
  console.log("🔍 FRONTEND: Gender filter value:", filters.gender);
  onSearch(); // This should trigger fetchMatches(1)
};

  const clearFilters = () => {
    const clearedFilters = {
      gender: "any", // Changed from "" to "any"
      city: "",
      min_age: "",
      max_age: "",
    };
    setFilters(clearedFilters);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow border flex flex-wrap gap-4 items-center">
      <input 
        value={filters.city} 
        onChange={e => handleFilterChange('city', e.target.value)} 
        placeholder="City" 
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
      
      <select 
        value={filters.gender} 
        onChange={e => handleFilterChange('gender', e.target.value)} 
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
      >
        <option value="any">Any Gender</option> {/* Changed from "" to "any" */}
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      
      <input 
        type="number" 
        value={filters.min_age} 
        onChange={e => handleFilterChange('min_age', e.target.value)} 
        placeholder="Min age" 
        className="p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
      
      <input 
        type="number" 
        value={filters.max_age} 
        onChange={e => handleFilterChange('max_age', e.target.value)} 
        placeholder="Max age" 
        className="p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
      
      <div className="flex gap-2 ml-auto">
        <button 
          onClick={clearFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
        
        <button 
          onClick={handleSearchClick} 
          className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}