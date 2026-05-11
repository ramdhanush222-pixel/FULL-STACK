import React from 'react';
import { Link } from 'react-router-dom';

const Specialists = () => {
  const specialists = [
    { id: 1, name: 'Cardiologist', displayName: '(Heart Specialist)', icon: '❤️' },
    { id: 2, name: 'Dermatologist', displayName: '(Skin Specialist)', icon: '🔬' },
    { id: 3, name: 'Neurologist', displayName: '(Brain Specialist)', icon: '🧠' },
    { id: 4, name: 'Orthopedist', displayName: '(Bone & Joint Specialist)', icon: '🦴' },
    { id: 5, name: 'Nephrologist', displayName: '(Kidney Specialist)', icon: '💊' },
  ];

  return (
    <div className="specialists-page">
      <div className="specialists-container">
        <h1>Our Specialists</h1>
        <p>Book appointments with our expert specialists across various fields</p>
        
        <div className="specialists-grid">
          {specialists.map((specialist) => (
            <div key={specialist.id} className="specialist-card">
              <div className="specialist-icon">{specialist.icon}</div>
              <h3>{specialist.displayName}</h3>
              <Link
                to={`/doctor-details/${specialist.name}`}
                className="explore-btn"
              >
                View Doctors
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specialists;
