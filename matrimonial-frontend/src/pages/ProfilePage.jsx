import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [revealPhones, setRevealPhones] = useState({});

  // form states
  const [form, setForm] = useState({
  name: "",
  age: "",
  dob: "",
  gender: "",
  city: "",
  education: "",
  occupation: "",
  religion: "",
  caste: "",
  height: "",
  weight: "",
  partner_expectations: "",
  gon_type: "",
  rashi: "",
  gotra: "",
  manglik: "",
  mangal_dosha_details: "",
  about: "",
  phone: ""
});

const validateForm = () => {
  const requiredFields = [
    'name', 'age', 'dob', 'gender', 'city', 'education', 
    'occupation', 'religion', 'caste', 'height', 'weight', 
    'phone', 'rashi', 'gotra', 'manglik'
  ];
  
  const missingFields = requiredFields.filter(field => {
    const value = form[field];
    
    // Handle different data types
    if (typeof value === 'number') {
      return value === null || value === undefined || value === '';
    } else if (typeof value === 'string') {
      return !value?.trim();
    } else {
      return !value; // For other types (boolean, etc.)
    }
  });
  
  if (missingFields.length > 0) {
    alert(`Please fill all required fields: ${missingFields.join(', ')}`);
    return false;
  }
  
  // Validate phone format
  const phoneRegex = /^\+91[6-9]\d{9}$/;
  if (!phoneRegex.test(form.phone)) {
    alert('Please enter a valid Indian phone number starting with +91');
    return false;
  }
  
  // Validate profile photo - REMOVE this validation for now to test
  // if (!profilePhoto && !profile?.profile_photo) {
  //   alert('Please upload a profile photo');
  //   return false;
  // }
  
  return true;
};

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/api', '')
    : 'https://couplemarriage.com';

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        setError("Missing profile id");
        return;
      }

      if (id === "me") {
        const { data } = await API.get("/profile");
        if (data) {
          setProfile(data);
          setForm({
            name: data.user?.name || "",
            age: data.age?.toString() || "", // Convert numbers to strings
            gender: data.gender || "",
            city: data.city || "",
            education: data.education || "",
            occupation: data.occupation || "",
            religion: data.religion || "",
            caste: data.caste || "",
            height: data.height?.toString() || "", // Convert numbers to strings
            weight: data.weight?.toString() || "", // Convert numbers to strings
            partner_expectations: data.partner_expectations || "",
            gon_type: data.gon_type || "",
            rashi: data.rashi || "",
            gotra: data.gotra || "",
            manglik: data.manglik || "",
            mangal_dosha_details: data.mangal_dosha_details || "",
            about: data.about || "",
            phone: data.user?.phone || ""
          });
        } else {
          setError("You don't have a profile yet");
        }
      } else {
        const { data } = await API.get(`/profiles/${id}`);
        setProfile(data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 404) {
        setError("Profile not found");
      } else {
        setError("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
  e.preventDefault();
  
  console.log('Form data before validation:', form);
  console.log('Profile photo:', profilePhoto);
  console.log('Additional photos:', photos);
  
  if (!validateForm()) {
    console.log('Form validation failed');
    return;
  }

  try {
    const fd = new FormData();

    // Add all form fields - convert numbers properly
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined && form[key] !== '') {
        fd.append(key, form[key]);
      }
    });

    if (profilePhoto) {
      fd.append("profile_photo", profilePhoto);
      console.log('Added profile photo to form data');
    }

    if (photos.length > 0) {
      Array.from(photos).forEach((file, index) => {
        fd.append("photos[]", file);
        console.log(`Added photo ${index} to form data:`, file.name);
      });
    }

    console.log('Sending form data to server...');

    let res;
    if (profile && profile.id) {
      res = await API.post("/profiles", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      res = await API.post("/profiles", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    console.log('Profile saved successfully:', res.data);
    
    setProfile(res.data);
    setEditMode(false);
    // Instead of reloading, update state properly
    // window.location.reload();
    
  } catch (err) {
    console.error("Error saving profile:", err);
    console.error("Error response:", err.response);
    alert(
      "Failed to save profile: " +
        (err.response?.data?.message || err.message || "Unknown error")
    );
  }
};

  // Helper functions for phone display
  const maskPhoneNumber = (phone) => {
    if (!phone) return "Not provided";
    
    // Keep country code visible, mask the rest
    if (phone.startsWith('+91') && phone.length > 3) {
      const visibleDigits = 4; // Show last 4 digits
      const maskedPart = phone.slice(3, -visibleDigits).replace(/./g, '•');
      const visiblePart = phone.slice(-visibleDigits);
      return `+91${maskedPart}${visiblePart}`;
    }
    
    // For other formats, mask first 6 digits
    if (phone.length > 6) {
      const maskedPart = phone.slice(0, 6).replace(/./g, '•');
      const visiblePart = phone.slice(6);
      return `${maskedPart}${visiblePart}`;
    }
    
    return phone;
  };

  const toggleRevealPhone = (phone) => {
    setRevealPhones(prev => ({
      ...prev,
      [phone]: !prev[phone]
    }));
  };

  const getPhoneDisplay = () => {
    if (!profile?.user) return "Not provided";
    
    const phone = profile.user.phone;
    if (!phone) return "Not provided";
    
    // For own profile, always show full number
    if (id === "me") {
      return phone;
    }
    
    // For other users, show masked with reveal option
    if (revealPhones[phone]) {
      return phone;
    }
    
    return maskPhoneNumber(phone);
  };

  const getPhoneStatus = () => {
    if (!profile?.user?.phone) return "Not added";
    
    if (profile.user.phone_verified) {
      return "Verified";
    } else if (profile.user.phone) {
      return "Pending verification";
    }
    
    return "Not verified";
  };

  const getPhoneStatusColor = () => {
    const status = getPhoneStatus();
    switch (status) {
      case 'Verified': return 'text-green-400';
      case 'Pending verification': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value;
    
    // Auto-format with +91 if not already present
    if (!value.startsWith('+91') && value.length > 0) {
      // Remove any existing +91 and non-digit characters
      value = value.replace(/^\+91/, '').replace(/\D/g, '');
      
      // Add +91 prefix
      if (value.length > 0) {
        value = '+91' + value;
      }
    }
    
    setForm({ ...form, phone: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          {error === "You don't have a profile yet" && isLoggedIn() && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Create Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  const img = profile?.profile_photo
    ? `${BASE_URL}/storage/${profile.profile_photo}`
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-gray-800 p-8 rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-400 hover:text-indigo-300"
        >
          ← Back
        </button>

        {!editMode ? (
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT SIDE PROFILE INFO */}
            <div className="md:w-1/3">
              <div className="w-48 h-48 bg-gray-700 rounded-full mx-auto mb-6 overflow-hidden flex items-center justify-center">
                {img ? (
                  <img
                    src={img}
                    alt={profile?.user?.name || "Profile photo"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl">👤</div>
                )}
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">
                  {profile?.user?.name}
                </h1>
                <p className="text-gray-400">
                  {profile?.age} years • {profile?.city}
                </p>
                
                {/* Phone Number Display */}
                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                  <div className="text-left">
                    <div className="text-gray-400 text-sm">Phone Number</div>
                    <div className="flex items-center justify-between">
                      <div className="text-white font-medium font-mono">
                        {getPhoneDisplay()}
                      </div>
                      {id !== "me" && profile?.user?.phone && (
                        <button
                          onClick={() => toggleRevealPhone(profile.user.phone)}
                          className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                          title={revealPhones[profile.user.phone] ? "Hide number" : "Reveal number"}
                        >
                          {revealPhones[profile.user.phone] ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.83 3.83" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    <div className={`text-xs ${getPhoneStatusColor()}`}>
                      {getPhoneStatus()}
                      {!profile?.user?.phone_verified && profile?.user?.phone && (
                        <span className="ml-2">🔒</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Astrological Details */}
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Astrological Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rashi</span>
                    <span className="text-white">{profile?.rashi || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gotra</span>
                    <span className="text-white">{profile?.gotra || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Manglik</span>
                    <span className="text-white">{profile?.manglik || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gon Type</span>
                    <span className="text-white">{profile?.gon_type || "Not specified"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE PROFILE DETAILS */}
            <div className="md:w-2/3">
              <h2 className="text-xl font-semibold text-white mb-4">
                Profile Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-gray-400 text-sm">Gender</label>
                  <p className="text-white capitalize">
                    {profile?.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Location</label>
                  <p className="text-white">{profile?.city || "Not specified"}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Education</label>
                  <p className="text-white">
                    {profile?.education || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Occupation</label>
                  <p className="text-white">
                    {profile?.occupation || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Religion</label>
                  <p className="text-white">
                    {profile?.religion || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Caste</label>
                  <p className="text-white">
                    {profile?.caste || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Height</label>
                  <p className="text-white">
                    {profile?.height ? `${profile.height} cm` : "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Weight</label>
                  <p className="text-white">
                    {profile?.weight ? `${profile.weight} kg` : "Not specified"}
                  </p>
                </div>
              </div>

              {profile?.about && (
                <div className="mb-6">
                  <label className="text-gray-400 text-sm">About Me</label>
                  <p className="text-white mt-1">{profile.about}</p>
                </div>
              )}

              {profile?.partner_expectations && (
                <div className="mb-6">
                  <label className="text-gray-400 text-sm">Partner Expectations</label>
                  <p className="text-white mt-1">{profile.partner_expectations}</p>
                </div>
              )}

              {profile?.mangal_dosha_details && (
                <div className="mb-6">
                  <label className="text-gray-400 text-sm">Mangal Dosha Details</label>
                  <p className="text-white mt-1">{profile.mangal_dosha_details}</p>
                </div>
              )}

              {/* ✅ PHOTO GALLERY WITH MODAL PREVIEW */}
              {Array.isArray(profile?.photos) && profile.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Photos
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profile.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={`${BASE_URL}/storage/${photo}`}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedPhoto(`${BASE_URL}/storage/${photo}`)}
                      />
                    ))}
                  </div>

                  {/* Modal Lightbox */}
                  {selectedPhoto && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                      onClick={() => setSelectedPhoto(null)}
                    >
                      <button
                        className="absolute top-6 right-6 text-white text-3xl font-bold"
                        onClick={() => setSelectedPhoto(null)}
                      >
                        ✕
                      </button>
                      <img
                        src={selectedPhoto}
                        alt="Full Preview"
                        className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              {id === "me" && (
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          // ===================== FORM MODE =====================
          <form onSubmit={handleSave} className="space-y-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                  min="18" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Education</label>
                <input
                  type="text"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  requiredui
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required                  
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={form.religion}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Caste</label>
                <input
                  type="text"
                  name="caste"
                  value={form.caste}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                  placeholder="e.g., 175 cm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                  placeholder="e.g., 70 Kg"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handlePhoneInput}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                required
                placeholder="+91XXXXXXXXXX"
              />
              <p className="text-gray-400 text-xs mt-1">
                Format: +91 followed by 10 digits (e.g., +919876543210)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rashi (Moon Sign)</label>
                <select
                  name="rashi"
                  value={form.rashi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                >
                  <option value="">Select Rashi</option>
                  <option value="Mesha">Mesha (Aries)</option>
                  <option value="Vrishabha">Vrishabha (Taurus)</option>
                  <option value="Mithuna">Mithuna (Gemini)</option>
                  <option value="Karka">Karka (Cancer)</option>
                  <option value="Simha">Simha (Leo)</option>
                  <option value="Kanya">Kanya (Virgo)</option>
                  <option value="Tula">Tula (Libra)</option>
                  <option value="Vrishchika">Vrishchika (Scorpio)</option>
                  <option value="Dhanu">Dhanu (Sagittarius)</option>
                  <option value="Makara">Makara (Capricorn)</option>
                  <option value="Kumbha">Kumbha (Aquarius)</option>
                  <option value="Meena">Meena (Pisces)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gotra</label>
                <input
                  type="text"
                  name="gotra"
                  value={form.gotra}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                  placeholder="e.g., Kashyap, Bharadwaj"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Manglik</label>
                <select
                  name="manglik"
                  value={form.manglik}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Anshik">Anshik (Partial)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gon (Guna) Type</label>
                <select
                  name="gon_type"
                  value={form.gon_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                >
                  <option value="">Select Type</option>
                  <option value="Dev">Dev (Deva)</option>
                  <option value="Manushya">Manushya (Manav)</option>
                  <option value="Rakshas">Rakshas (Asura)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mangal Dosha Details</label>
              <textarea
                name="mangal_dosha_details"
                value={form.mangal_dosha_details}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                rows="3"
                placeholder="Any specific details about Mangal Dosha..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Partner Expectations</label>
              <textarea
                name="partner_expectations"
                value={form.partner_expectations}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                rows="4"
                placeholder="Describe what you're looking for in a partner..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">About Me</label>
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                rows="4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                  className="text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gallery Photos</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setPhotos(e.target.files)}
                  className="text-white"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 font-medium"
              >
                Save Profile
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}