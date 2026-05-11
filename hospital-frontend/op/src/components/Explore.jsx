import React from 'react';
import { Link } from 'react-router-dom';

const Explore = () => {
  return (
    <div className="explore-page">
      <div className="explore-container">
        <h1>Explore Our Services</h1>
        <p>Discover the best healthcare options available</p>
        
        <div className="explore-grid">
          <div className="explore-card">
            <h2>Specialists</h2>
            <p>Browse through our network of experienced specialists</p>
            <Link to="/Specialists" className="explore-btn">View Specialists</Link>
          </div>
          
          <div className="explore-card">
            <h2>Doctor Details</h2>
            <p>Get detailed information about our medical professionals</p>
            <Link to="/doctor-details" className="explore-btn">View Doctors</Link>
          </div>
          
          <div className="explore-card">
            <h2>Book Appointment</h2>
            <p>Schedule your appointment with your preferred doctor</p>
            <Link to="/book-appointment" className="explore-btn">Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
