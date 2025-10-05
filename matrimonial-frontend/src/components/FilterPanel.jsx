import React from "react";

export default function FilterPanel({ filters, setFilters, onSearch }) {
  return (
    <div className="mb-6 bg-teal-800 p-4 rounded flex flex-wrap gap-3 items-center">
      <input value={filters.city} onChange={e=>setFilters({...filters, city:e.target.value})} placeholder="City" className="p-2 bg-white-700 rounded border border-dark-600"/>
      <select value={filters.gender} onChange={e=>setFilters({...filters, gender:e.target.value})} className="p-2 bg-white-700 rounded border border-dark-600">
        <option value="">Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input type="number" value={filters.min_age} onChange={e=>setFilters({...filters, min_age:e.target.value})} placeholder="Min age" className="p-2 bg-white-700 rounded border border-gray-600 w-28"/>
      <input type="number" value={filters.max_age} onChange={e=>setFilters({...filters, max_age:e.target.value})} placeholder="Max age" className="p-2 bg-white-700 rounded border border-gray-600 w-28"/>
      <button onClick={()=>onSearch()} className="ml-auto bg-indigo-600 px-4 py-2 rounded">Search</button>
    </div>
  );
}
