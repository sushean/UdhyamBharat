import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isSignUp) {
      // Login logic
      if (formData.username === 'sushean.11' && formData.password === 'admin') {
        console.log('Login successful');
        // Redirect to home page
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } else {
      // Sign up logic would go here
      console.log('Sign up form submitted:', formData);
      // For now, just redirect to login
      setIsSignUp(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(''); 
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="login-card">
        <div className="brand-section">
          <div className="brand-logo">
            <img src="/ULogo2.png" alt="UdhyamBharat Logo" />
          </div>
          <h1>UdhyamBharat</h1>
          <p>Empowering Village entrepreneurs, building better future</p>
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
            
            {error && <div className="error-message">{error}</div>}
            
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;