import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../App';
import translations from '../translations';
import { employeeAPI, projectAPI, aboutAPI } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [filter, setFilter] = useState('all');
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [empRes, projRes, aboutRes] = await Promise.all([
        employeeAPI.getAll(),
        projectAPI.getAll(),
        aboutAPI.get()
      ]);
      setEmployees(empRes.data);
      setProjects(projRes.data);
      setAbout(aboutRes.data);
    } catch (error) {
      console.error('Xatolik:', error);
    }
    setLoading(false);
  };

  const renderEmployees = () => (
    <section className="section employees-section" id="employees">
      <h2>{t.employees}</h2>
      <div className="employees-grid">
        {employees.map((emp) => (
          <div key={emp._id} className="employee-card">
            {emp.image && <img src={`http://localhost:5000/${emp.image}`} alt={emp.name[language]} />}
            <h3>{emp.name[language]}</h3>
            <p className="position">{emp.position[language]}</p>
            <div className="stats">
              <div className="stat">
                <span className="stat-value">{emp.statistics?.projects || 0}</span>
                <span className="stat-label">{t.projects}</span>
              </div>
              <div className="stat">
                <span className="stat-value">{emp.statistics?.experience || 0}</span>
                <span className="stat-label">{t.experience}</span>
              </div>
              <div className="stat">
                <span className="stat-value">{emp.statistics?.satisfaction || 0}%</span>
                <span className="stat-label">{t.satisfaction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="section about-section" id="about">
      <h2>{t.about}</h2>
      {about && (
        <div className="about-content">
          <h3>{about.title[language]}</h3>
          <p className="description">{about.description[language]}</p>
          <h4>📖 {t.history}</h4>
          <p>{about.history[language]}</p>
          
          {about.achievements?.length > 0 && (
            <div className="achievements">
              <h4>🏆 {t.achievements}</h4>
              {about.achievements.map((ach, i) => (
                <div key={i} className="achievement">
                  <h5>{ach.title[language]}</h5>
                  <p>{ach.description[language]}</p>
                </div>
              ))}
            </div>
          )}

          {about.images?.length > 0 && (
            <div className="gallery">
              <h4>🖼️ {t.gallery}</h4>
              <div className="gallery-grid">
                {about.images.map((img, i) => (
                  <img key={i} src={`http://localhost:5000/${img}`} alt={`Gallery ${i}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );

  const renderPortfolio = () => (
    <section className="section portfolio-section" id="portfolio">
      <h2>{t.portfolio}</h2>
      <div className="projects-grid">
        {projects.map((proj) => (
          <div key={proj._id} className="project-card">
            {proj.images?.[0] && (
              <img src={`http://localhost:5000/${proj.images[0]}`} alt={proj.name[language]} />
            )}
            <h3>{proj.name[language]}</h3>
            <p className="description">{proj.description[language]}</p>
            <div className="project-meta">
              <span className="category">{proj.category[language]}</span>
              <span className="status">{proj.status[language]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <main className="home-page">
      <section className="filter-section">
        <label>{t.filter}:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">Hamma</option>
          <option value="employees">{t.filterEmployees}</option>
          <option value="about">{t.filterAbout}</option>
          <option value="portfolio">{t.filterPortfolio}</option>
        </select>
      </section>

      {loading ? (
        <div className="loading">{t.loading}</div>
      ) : (
        <>
          {(filter === 'all' || filter === 'employees') && renderEmployees()}
          {(filter === 'all' || filter === 'about') && renderAbout()}
          {(filter === 'all' || filter === 'portfolio') && renderPortfolio()}
        </>
      )}
    </main>
  );
};

export default Home;
