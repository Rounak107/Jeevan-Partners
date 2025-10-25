import React, { useState } from "react";
import API from "../api";

export default function CreateProfileModal({ isOpen, onClose, onProfileCreated }) {
  const [formData, setFormData] = useState({
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
    phone: "",
    rashi: "",
    gotra: "",
    manglik: "",
    gon_type: "",
    mangal_dosha_details: "",
    partner_expectations: "",
    about: ""
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    const requiredFields = [
      'name', 'age', 'dob', 'gender', 'city', 'education', 
      'occupation', 'religion', 'caste', 'height', 'weight', 
      'phone', 'rashi', 'gotra', 'manglik'
    ];
    
    const missingFields = requiredFields.filter(field => {
      const value = formData[field];
      return !value || (typeof value === 'string' && !value.trim());
    });
    
    if (missingFields.length > 0) {
      alert(`Please fill all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Validate phone format
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid Indian phone number starting with +91 (e.g., +919876543210)');
      return false;
    }
    
    // Validate profile photo
    if (!profilePhoto) {
      alert('Please upload a profile photo');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fd = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          fd.append(key, formData[key]);
        }
      });

      // Add profile photo
      if (profilePhoto) {
        fd.append("profile_photo", profilePhoto);
      }

      // Add gallery photos
      if (photos.length > 0) {
        Array.from(photos).forEach((file) => {
          fd.append("photos[]", file);
        });
      }

      const response = await API.post("/profiles", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      onProfileCreated(response.data);
      onClose();
    } catch (err) {
      console.error("Profile creation error:", err);
      setError(err.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value;
    
    // Auto-format with +91 if not already present
    if (!value.startsWith('+91') && value.length > 0) {
      value = value.replace(/^\+91/, '').replace(/\D/g, '');
      if (value.length > 0) {
        value = '+91' + value;
      }
    }
    
    setFormData({
      ...formData,
      phone: value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Create Your Profile</h2>
        
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="18"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="e.g., Kolkata"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>

          {/* Education & Occupation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Education *</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                placeholder="e.g., B.Tech, MBA"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Occupation *</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                placeholder="e.g., Software Engineer"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>

          {/* Religion & Caste */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Religion *</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                required
                placeholder="e.g., Hindu, Muslim, Christian"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Caste *</label>
              <input
                type="text"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                required
                placeholder="e.g., Brahmin, Kshatriya"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>

          {/* Physical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Height (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
                placeholder="e.g., 175"
                min="100"
                max="250"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                placeholder="e.g., 70"
                min="30"
                max="200"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneInput}
              required
              placeholder="+919876543210"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
            <p className="text-gray-400 text-xs mt-1">
              Format: +91 followed by 10 digits (e.g., +919876543210)
            </p>
          </div>

          {/* Astrological Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Rashi (Moon Sign) *</label>
              <select
                name="rashi"
                value={formData.rashi}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
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
              <label className="block text-sm font-medium text-gray-300 mb-1">Gotra *</label>
              <input
                type="text"
                name="gotra"
                value={formData.gotra}
                onChange={handleChange}
                required
                placeholder="e.g., Kashyap, Bharadwaj"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Manglik *</label>
              <select
                name="manglik"
                value={formData.manglik}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Anshik">Anshik (Partial)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Gon (Guna) Type</label>
              <select
                name="gon_type"
                value={formData.gon_type}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">Select Type</option>
                <option value="Dev">Dev (Deva)</option>
                <option value="Manushya">Manushya (Manav)</option>
                <option value="Rakshas">Rakshas (Asura)</option>
              </select>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mangal Dosha Details</label>
            <textarea
              name="mangal_dosha_details"
              value={formData.mangal_dosha_details}
              onChange={handleChange}
              placeholder="Any specific details about Mangal Dosha..."
              rows="3"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Partner Expectations</label>
            <textarea
              name="partner_expectations"
              value={formData.partner_expectations}
              onChange={handleChange}
              placeholder="Describe what you're looking for in a partner..."
              rows="3"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">About Me</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell others about yourself..."
              rows="3"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Profile Photo *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                required
                className="w-full text-white"
              />
              <p className="text-gray-400 text-xs mt-1">Required - This will be your main profile picture</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Gallery Photos</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setPhotos(e.target.files)}
                className="w-full text-white"
              />
              <p className="text-gray-400 text-xs mt-1">Optional - Additional photos for your profile</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2 rounded disabled:opacity-50 font-medium"
            >
              {loading ? "Creating Profile..." : "Create Profile"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 rounded font-medium"
            >
              Cancel
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              * Required fields must be filled
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}