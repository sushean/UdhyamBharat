import React, { useState } from 'react';
import { FaTimes, FaUserCircle, FaStore } from 'react-icons/fa';
import './Profile.css';

const Profile = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: 'sushean.11',
    email: 'sushean.11@gmail.com',
    phone: '',
    address: ''
  });

  const [sellerForm, setSellerForm] = useState({
    businessName: '',
    category: '',
    description: '',
    address: '',
    phone: '',
    gst: '',
    documents: null
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSellerChange = (e) => {
    const { name, value, files } = e.target;
    setSellerForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add API call to update profile
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    // Add API call to submit seller registration
  };

  if (!isOpen) return null;

  return (
    <div className="profile-overlay">
      <div className="profile-container">
        <header className="profile-header">
          <h2>My Profile</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </header>

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <FaUserCircle className="section-icon" />
              <h2>Profile Information</h2>
            </div>
            <form className="profile-form" onSubmit={handleProfileSubmit}>
              <div className="profile-header-section">
                <div className="profile-avatar">
                  <FaUserCircle />
                </div>
                <h3>{profileForm.name}</h3>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={profileForm.address}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>

              <button 
                type="button" 
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>

              {isEditing && (
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              )}
            </form>
          </div>

          <div className="seller-section">
            <div className="section-header">
              <FaStore className="section-icon" />
              <h2>Become a Seller</h2>
            </div>
            <form className="seller-form" onSubmit={handleSellerSubmit}>
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={sellerForm.businessName}
                  onChange={handleSellerChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Business Category</label>
                <select
                  id="category"
                  name="category"
                  value={sellerForm.category}
                  onChange={handleSellerChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="handicrafts">Handicrafts</option>
                  <option value="textiles">Textiles</option>
                  <option value="food">Food Products</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Business Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={sellerForm.description}
                  onChange={handleSellerChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sellerAddress">Business Address</label>
                <textarea
                  id="sellerAddress"
                  name="address"
                  value={sellerForm.address}
                  onChange={handleSellerChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sellerPhone">Business Phone</label>
                <input
                  type="tel"
                  id="sellerPhone"
                  name="phone"
                  value={sellerForm.phone}
                  onChange={handleSellerChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gst">GST Number</label>
                <input
                  type="text"
                  id="gst"
                  name="gst"
                  value={sellerForm.gst}
                  onChange={handleSellerChange}
                  required
                />
                <small>Enter your 15-digit GST number</small>
              </div>

              <div className="form-group">
                <label>Business Documents</label>
                <div className="file-upload">
                  <label htmlFor="documents" className="upload-label">
                    Choose Files
                  </label>
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    onChange={handleSellerChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <span className="file-name">
                    {sellerForm.documents ? sellerForm.documents.name : 'No file chosen'}
                  </span>
                </div>
                <small>Upload registration certificates, licenses, or other relevant documents (PDF, JPG, PNG)</small>
              </div>

              <button type="submit" className="submit-button">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
