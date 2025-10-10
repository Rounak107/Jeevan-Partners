import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProfileCard from '../components/ProfileCard';
import FilterPanel from '../components/FilterPanel';

export default function Matches() {
  const [profiles, setProfiles] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    min_age: '',
    max_age: '',
    city: ''
  });

  useEffect(() => {
    fetchMatches(1);
  }, []);

  async function fetchMatches(page = 1) {
    setLoading(true);
    try {
      // FIXED: Use 'any' for gender when no filter is selected to show all profiles
      const params = { 
        ...filters, 
        page, 
        per_page: 24,
        // If gender is empty string, send 'any' to show all genders
        gender: filters.gender === '' ? 'any' : filters.gender
      };
      
      console.log('Fetching matches with params:', params);
      
      const res = await api.get('/api/recommendations', { params });
      console.log('API Response:', res.data);
      
      setProfiles(res.data.data || res.data);
      setMeta({
        current_page: res.data.current_page || 1,
        last_page: res.data.last_page || 1,
        total: res.data.total || 0,
        per_page: res.data.per_page || 24
      });
    } catch (err) {
      console.error('Error loading matches:', err);
      alert('Error loading matches. Check console for details.');
    } finally {
      setLoading(false);
    }
  }

  // FIXED: Better pagination controls
  const PaginationControls = () => {
    if (meta.last_page <= 1) return null;
    
    return (
      <div className="flex justify-center items-center gap-4 mt-8">
        <button 
          onClick={() => fetchMatches(meta.current_page - 1)}
          disabled={meta.current_page === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <span className="text-gray-700">
          Page {meta.current_page} of {meta.last_page} 
          {meta.total && ` (Total: ${meta.total} profiles)`}
        </span>
        
        <button 
          onClick={() => fetchMatches(meta.current_page + 1)}
          disabled={meta.current_page === meta.last_page}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Match</h1>
      
      <FilterPanel 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={() => fetchMatches(1)} 
      />

      {/* Debug Info */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p className="text-sm text-blue-800">
          Showing {profiles.length} profiles 
          {meta.total && ` out of ${meta.total} total`}
          {filters.gender && ` • Filter: ${filters.gender === 'any' ? 'All Genders' : filters.gender}`}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="text-lg text-gray-600">Loading matches...</div>
        </div>
      ) : (
        <>
          {profiles.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No matches found with your current filters. Try adjusting your search criteria.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {profiles.map(p => (
                  <ProfileCard key={p.id} profile={p} />
                ))}
              </div>
              
              <PaginationControls />
            </>
          )}
        </>
      )}
    </div>
  );
}