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
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => setRole(newRole);

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setEmail(''); // Clear email field when switching forms
    setPassword(''); // Clear password field when switching forms
    setError(''); // Clear error message when switching forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const payload = { email, password, role };
  
    try {
      const endpoint = formType === 'login' ? '/api/login' : '/api/signup';
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
      console.log(response.data); // Log response data
  
      // Navigate to the dashboard based on role
      const userRole = response.data.role; // Assume the role is returned in response
      if (userRole === 'Freelancer') {
        navigate('/freelancer-home');
      } else if (userRole === 'Recruiter') {
        navigate('/recruiter-home');
      } else {
        setError('Role not recognized');
      }
    } catch (error) {
      if (formType === 'login') {
        setError('Invalid credentials. Please sign up if you don’t have an account.'); // Specific error message for login
      } else {
        setError('Error: ' + (error.response?.data || 'An unexpected error occurred'));
      }
      console.error('Error:', error); // Log the error
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="login-signup-container">
      <div className="role-toggle">
        <button onClick={() => handleRoleChange('Freelancer')} className={role === 'Freelancer' ? 'active' : ''}>Freelancer</button>
        <button onClick={() => handleRoleChange('Recruiter')} className={role === 'Recruiter' ? 'active' : ''}>Recruiter</button>
      </div>
      
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

      <div className="form-toggle">
        {formType === 'login' ? (
          <p>Don't have an account? <span onClick={() => handleFormTypeChange('signup')}>Sign Up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => handleFormTypeChange('login')}>Login</span></p>
        )}
      </div>
    </div>
  );
}

export default LoginSignupPage;
