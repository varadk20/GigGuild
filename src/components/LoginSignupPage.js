import React, { useState } from 'react';
import './LoginSignupPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginSignupPage() {
  const [role, setRole] = useState('Freelancer'); // Default role
  const [formType, setFormType] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => setRole(newRole);

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setEmail(''); // Clear email field when switching forms
    setPassword(''); // Clear password field when switching forms
    setError(''); // Clear error message when switching forms
    setSuccessMessage(''); // Clear success message when switching forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    const payload = { email, password, role };
  
    try {
      const endpoint = formType === 'login' ? '/api/login' : '/api/signup';
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
  
      if (formType === 'signup') {
        setSuccessMessage('Signup successful! You can now log in.');
        setTimeout(() => handleFormTypeChange('login'), 3000);
      } else {
        localStorage.setItem('userEmail', email);
        navigate(response.data.role === 'Freelancer' ? '/freelancer-home' : '/recruiter-home');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Invalid credentials. Please check password or email';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-signup-page">
      {/* Left section for video */}
      <div className="video-section">
        <video autoPlay muted loop>
          <source src="\Gig.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right section for the form */}
      <div className="login-signup-container">
        {/* Only show role toggle if the form type is 'signup' */}
        {formType === 'signup' && (
          <div className="role-toggle">
            <button onClick={() => handleRoleChange('Freelancer')} className={role === 'Freelancer' ? 'active' : ''}>Freelancer</button>
            <button onClick={() => handleRoleChange('Recruiter')} className={role === 'Recruiter' ? 'active' : ''}>Recruiter</button>
          </div>
        )}

        <h2>{formType === 'login' ? 'Login' : 'Sign Up'} as {role}</h2>

        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (formType === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-toggle">
          {formType === 'login' ? (
            <p>Don't have an account? <span onClick={() => handleFormTypeChange('signup')}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => handleFormTypeChange('login')}>Login</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignupPage;
