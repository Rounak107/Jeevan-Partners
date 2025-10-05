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
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  // NEW: state for previewing full image
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
              age: data.age || "",
              gender: data.gender || "",
              city: data.city || "",
              education: data.education || "",
              occupation: data.occupation || "",
              religion: data.religion || "",
              caste: data.caste || "",
              height: data.height || "",
              weight: data.weight || "",
              partner_expectations: data.partner_expectations || "",
              gon_type: data.gon_type || "",
              rashi: data.rashi || "",
              gotra: data.gotra || "",
              manglik: data.manglik || "",
              mangal_dosha_details: data.mangal_dosha_details || "",
              about: data.about || "",
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
    try {
      const fd = new FormData();

      // Add all form fields
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          fd.append(key, form[key]);
        }
      });

      if (profilePhoto) {
        fd.append("profile_photo", profilePhoto);
      }

      if (photos.length > 0) {
        Array.from(photos).forEach((file) => {
          fd.append("photos[]", file);
        });
      }

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

      setProfile(res.data);
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(
        "Failed to save profile: " +
          (err.response?.data?.message || "Unknown error")
      );
    }
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
    ? `http://127.0.0.1:8000/storage/${profile.profile_photo}`
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
                        src={`http://127.0.0.1:8000/storage/${photo}`}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80"
                        onClick={() =>
                          setSelectedPhoto(
                            `http://127.0.0.1:8000/storage/${photo}`
                          )
                        }
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
                  placeholder="e.g., 175"
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
                  placeholder="e.g., 70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rashi (Moon Sign)</label>
                <select
                  name="rashi"
                  value={form.rashi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
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