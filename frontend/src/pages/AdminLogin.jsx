import React, { useState, useContext } from 'react';
import { authAPI } from '../services/api';
import { LanguageContext } from '../App';
import translations from '../translations';
import '../styles/Admin.css';

const AdminLogin = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.login(email, password);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/admin';
    } catch (err) {
      setError(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>🔒 {t.loginTitle}</h2>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label>{t.email}</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>{t.password}</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn-login">{t.login}</button>
      </form>
    </div>
  );
};

export default AdminLogin;
