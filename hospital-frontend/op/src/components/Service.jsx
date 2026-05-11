import React from 'react';
import { Heart, Brain, Bone, Eye, Baby, Stethoscope } from 'lucide-react';

const services = [
  { icon: <Heart size={40} />, title: 'Cardiology', desc: 'Expert heart care with advanced diagnostics and treatment.' },
  { icon: <Brain size={40} />, title: 'Neurology', desc: 'Comprehensive brain and nervous system specialist care.' },
  { icon: <Bone size={40} />, title: 'Orthopedics', desc: 'Bone, joint and muscle treatments by experienced surgeons.' },
  { icon: <Eye size={40} />, title: 'Ophthalmology', desc: 'Complete eye care from routine checkups to surgery.' },
  { icon: <Baby size={40} />, title: 'Pediatrics', desc: 'Dedicated healthcare for infants, children and teenagers.' },
  { icon: <Stethoscope size={40} />, title: 'General Medicine', desc: 'Primary care for everyday health concerns and checkups.' },
];

const Services = () => {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <p className="services-subtitle">We offer a wide range of medical services to keep you healthy</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;;