import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Form submitted:', formData);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="brand-section">
          <div className="brand-logo">
            <img src="/logo.png" alt="Udhyambhart Logo" />
          </div>
          <h1>Udhyambhart</h1>
          <p>Empowering entrepreneurs, building futures</p>
        </div>
        
        <div className="form-section">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="form-subtitle">
            {isSignUp 
              ? 'Join our community of entrepreneurs' 
              : 'Sign in to access your account'}
          </p>
          
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            {!isSignUp && (
              <div className="forgot-password">
                <a href="#forgot">Forgot password?</a>
              </div>
            )}
            
            <button type="submit" className="submit-btn">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>
          
          <div className="form-footer">
            <p>
              {isSignUp 
                ? 'Already have an account?' 
                : "Don't have an account?"}
              <button 
                className="toggle-btn" 
                onClick={toggleForm}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
          
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-btn google">Google</button>
              <button className="social-btn linkedin">LinkedIn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 