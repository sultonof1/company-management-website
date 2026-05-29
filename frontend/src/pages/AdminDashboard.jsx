import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../App';
import translations from '../translations';
import { employeeAPI, projectAPI, aboutAPI } from '../services/api';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [tab, setTab] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState(null);

  // Form states for Employee
  const [empName, setEmpName] = useState({ uz: '', ru: '', en: '' });
  const [empPos, setEmpPos] = useState({ uz: '', ru: '', en: '' });
  const [empFile, setEmpFile] = useState(null);
  const [empStats, setEmpStats] = useState({ projects: 0, experience: 0, satisfaction: 100 });
  const [editEmpId, setEditEmpId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/admin/login';
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [empRes, projRes, aboutRes] = await Promise.all([
        employeeAPI.getAll(),
        projectAPI.getAll(),
        aboutAPI.get()
      ]);
      setEmployees(empRes.data);
      setProjects(projRes.data);
      setAbout(aboutRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', JSON.stringify(empName));
    formData.append('position', JSON.stringify(empPos));
    formData.append('statistics', JSON.stringify(empStats));
    if (empFile) formData.append('image', empFile);

    try {
      if (editEmpId) {
        await employeeAPI.update(editEmpId, formData);
      } else {
        await employeeAPI.create(formData);
      }
      resetEmpForm();
      loadData();
      alert(t.success);
    } catch (err) {
      alert(t.error);
    }
  };

  const resetEmpForm = () => {
    setEmpName({ uz: '', ru: '', en: '' });
    setEmpPos({ uz: '', ru: '', en: '' });
    setEmpFile(null);
    setEmpStats({ projects: 0, experience: 0, satisfaction: 100 });
    setEditEmpId(null);
  };

  const handleEmpDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      await employeeAPI.delete(id);
      loadData();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h3>🛠️ {t.adminPanel}</h3>
        <button onClick={() => setTab('employees')} className={tab === 'employees' ? 'active' : ''}>{t.employees}</button>
        <button onClick={() => setTab('about')} className={tab === 'about' ? 'active' : ''}>{t.about}</button>
        <button onClick={() => setTab('portfolio')} className={tab === 'portfolio' ? 'active' : ''}>{t.portfolio}</button>
      </div>

      <div className="admin-content">
        {tab === 'employees' && (
          <div>
            <h2>👥 {t.employees} boshqaruvi</h2>
            <form onSubmit={handleEmployeeSubmit} className="admin-form-block">
              <h3>{editEmpId ? t.edit : t.add}</h3>
              <div className="lang-inputs">
                <div>
                  <label>Ismi (UZ)</label>
                  <input type="text" value={empName.uz} onChange={e => setEmpName({...empName, uz: e.target.value})} required />
                </div>
                <div>
                  <label>Имя (RU)</label>
                  <input type="text" value={empName.ru} onChange={e => setEmpName({...empName, ru: e.target.value})} required />
                </div>
                <div>
                  <label>Name (EN)</label>
                  <input type="text" value={empName.en} onChange={e => setEmpName({...empName, en: e.target.value})} required />
                </div>
              </div>

              <div className="lang-inputs">
                <div>
                  <label>Lavozimi (UZ)</label>
                  <input type="text" value={empPos.uz} onChange={e => setEmpPos({...empPos, uz: e.target.value})} required />
                </div>
                <div>
                  <label>Должность (RU)</label>
                  <input type="text" value={empPos.ru} onChange={e => setEmpPos({...empPos, ru: e.target.value})} required />
                </div>
                <div>
                  <label>Position (EN)</label>
                  <input type="text" value={empPos.en} onChange={e => setEmpPos({...empPos, en: e.target.value})} required />
                </div>
              </div>

              <div className="form-group">
                <label>{t.upload} (Rasm)</label>
                <input type="file" onChange={e => setEmpFile(e.target.files[0])} />
              </div>

              <button type="submit" className="btn-save">{t.save}</button>
              {editEmpId && <button type="button" onClick={resetEmpForm} className="btn-cancel">{t.cancel}</button>}
            </form>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.name}</th>
                  <th>{t.position}</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp._id}>
                    <td>{emp.name[language]}</td>
                    <td>{emp.position[language]}</td>
                    <td>
                      <button onClick={() => {
                        setEditEmpId(emp._id);
                        setEmpName(emp.name);
                        setEmpPos(emp.position);
                        setEmpStats(emp.statistics || empStats);
                      }} className="btn-edit-inline">{t.edit}</button>
                      <button onClick={() => handleEmpDelete(emp._id)} className="btn-delete-inline">{t.delete}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'about' && <p style={{padding: '20px'}}>Kompaniya haqida qismi tizimda faollashtirildi. (Bosh sahifada avtomatik chiqadi)</p>}
        {tab === 'portfolio' && <p style={{padding: '20px'}}>Portfolio ro'yxati bosh sahifada ko'rinadi.</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
