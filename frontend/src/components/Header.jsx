import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import translations from '../../translations.js';
import '../styles/Header.css';

const Header = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = translations[language];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const isAdmin = !!localStorage.getItem('token');

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🎯 Sultonof Campaign</h1>
        </div>
        
        <nav className="navbar">
          <a href="/" className="nav-link">{t.home}</a>
          <a href="/#employees" className="nav-link">{t.employees}</a>
          <a href="/#about" className="nav-link">{t.about}</a>
          <a href="/#portfolio" className="nav-link">{t.portfolio}</a>
        </nav>

        <div className="header-actions">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          {!isAdmin ? (
            <a href="/admin/login" className="btn-admin">{t.admin}</a>
          ) : (
            <>
              <a href="/admin" className="btn-admin-active">{t.adminPanel}</a>
              <button onClick={handleLogout} className="btn-logout">{t.logout}</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
