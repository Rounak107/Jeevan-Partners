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
    // eslint-disable-next-line
  }, []);

  async function fetchMatches(page = 1) {
  setLoading(true);
  try {
    const params = { ...filters, page, per_page: 24 }; // Increased from 12 to 24
    const res = await api.get('/api/recommendations', { params });
    setProfiles(res.data.data || res.data);
    setMeta({
      current_page: res.data.current_page,
      last_page: res.data.last_page,
      total: res.data.total // Add total for debugging
    });
    
    // Debug log
    console.log('Fetched profiles:', res.data.data?.length || res.data.length);
    console.log('Total available:', res.data.total);
  } catch (err) {
    console.error(err);
    alert('Error loading matches. Open console for details.');
  } finally {
    setLoading(false);
  }
}

  return (
    <div style={{ padding: 20 }}>
      <h1>Matches</h1>
      <FilterPanel filters={filters} setFilters={setFilters} onSearch={fetchMatches} />
      {loading ? <div>Loading…</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 260px)', gap: 16 }}>
          {profiles.length === 0 && <div>No matches found</div>}
          {profiles.map(p => <ProfileCard key={p.id} profile={p} />)}
        </div>
      )}

      {meta.last_page > 1 && (
        <div style={{ marginTop: 16 }}>
          Page {meta.current_page} of {meta.last_page}
          {meta.current_page > 1 && <button onClick={() => fetchMatches(meta.current_page - 1)}>Prev</button>}
          {meta.current_page < meta.last_page && <button onClick={() => fetchMatches(meta.current_page + 1)}>Next</button>}
        </div>
      )}
    </div>
  );
}
