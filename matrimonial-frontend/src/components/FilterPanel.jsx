import React from "react";

export default function FilterPanel({ filters, setFilters, onSearch }) {
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearchClick = () => {
    console.log("🔍 FRONTEND: Searching with ALL filters:", filters);
    console.log("📍 City:", filters.city);
    console.log("🎂 Age range:", `${filters.min_age || '18'}-${filters.max_age || '60'}`);
    console.log("⚧️ Gender:", filters.gender);
    onSearch();
  };

  const clearFilters = () => {
    const clearedFilters = {
      gender: "any",
      city: "",
      min_age: "",
      max_age: "",
    };
    setFilters(clearedFilters);
    console.log("🧹 All filters cleared");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow border flex flex-wrap gap-4 items-center">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">City</label>
        <input 
          value={filters.city} 
          onChange={e => handleFilterChange('city', e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name" 
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 w-40"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Gender</label>
        <select 
          value={filters.gender} 
          onChange={e => handleFilterChange('gender', e.target.value)} 
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="any">Any Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Min Age</label>
        <input 
          type="number" 
          value={filters.min_age} 
          onChange={e => handleFilterChange('min_age', e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="18" 
          min="18"
          max="100"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 w-20"
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Max Age</label>
        <input 
          type="number" 
          value={filters.max_age} 
          onChange={e => handleFilterChange('max_age', e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="60" 
          min="18"
          max="100"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 w-20"
        />
      </div>
      
      <div className="flex gap-2 ml-auto mt-6">
        <button 
          onClick={clearFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Clear All
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