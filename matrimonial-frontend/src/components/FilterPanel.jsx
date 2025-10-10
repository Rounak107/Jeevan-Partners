import React from "react";

export default function FilterPanel({ filters, setFilters, onSearch }) {
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Auto-search when filters change
    onSearch();
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow border flex flex-wrap gap-4 items-center">
      <input 
        value={filters.city} 
        onChange={e => handleFilterChange({...filters, city: e.target.value})} 
        placeholder="City" 
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      
      <select 
        value={filters.gender} 
        onChange={e => handleFilterChange({...filters, gender: e.target.value})} 
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Any Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      
      <input 
        type="number" 
        value={filters.min_age} 
        onChange={e => handleFilterChange({...filters, min_age: e.target.value})} 
        placeholder="Min age" 
        className="p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      
      <input 
        type="number" 
        value={filters.max_age} 
        onChange={e => handleFilterChange({...filters, max_age: e.target.value})} 
        placeholder="Max age" 
        className="p-2 border border-gray-300 rounded w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      
      <button 
        onClick={onSearch} 
        className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
      >
        Search
      </button>
    </div>
  );
}