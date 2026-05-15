import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Import doctor photos
import doctor1 from './images/WhatsApp Image 2026-04-11 at 13.44.05.jpeg';
import doctor2 from './images/WhatsApp Image 2026-04-11 at 13.44.06 (1).jpeg';
import doctor3 from './images/WhatsApp Image 2026-04-11 at 13.44.06 (2).jpeg';
import doctor4 from './images/WhatsApp Image 2026-04-11 at 13.44.06.jpeg';
import doctor5 from './images/WhatsApp Image 2026-04-11 at 13.44.07 (1).jpeg';
import doctor6 from './images/WhatsApp Image 2026-04-11 at 13.44.07.jpeg';
import doctor7 from './images/WhatsApp Image 2026-04-11 at 13.44.08 (1).jpeg';
import doctor8 from './images/WhatsApp Image 2026-04-11 at 13.44.08 (2).jpeg';
import doctor9 from './images/WhatsApp Image 2026-04-11 at 13.44.08.jpeg';
import doctor10 from './images/WhatsApp Image 2026-04-11 at 13.44.09 (1).jpeg';
import doctor11 from './images/WhatsApp Image 2026-04-11 at 13.44.09.jpeg';
import doctor12 from './images/WhatsApp Image 2026-04-11 at 13.44.10 (1).jpeg';
import doctor13 from './images/WhatsApp Image 2026-04-11 at 13.44.10 (2).jpeg';
import doctor14 from './images/WhatsApp Image 2026-04-11 at 13.44.10.jpeg';
import doctor15 from './images/WhatsApp Image 2026-04-11 at 13.44.11.jpeg';

const categories = [
  { key: 'Cardiologist', name: '(Heart Specialist)' },
  { key: 'Dermatologist', name: '(Skin Specialist)' },
  { key: 'Neurologist', name: '(Brain Specialist)' },
  { key: 'Orthopedist', name: '(Bone & Joint Specialist)' },
  { key: 'Nephrologist', name: '(Kidney Specialist)' },
];

const doctorData = {
  Cardiologist: [
    { id: 1, name: 'Dr. Rajesh Kumar', title: 'Cardiologist', image: doctor1 },
    { id: 2, name: 'Dr. Arjun Singh', title: 'Cardiologist', image: doctor2 },
    { id: 3, name: 'Dr. Priya Sharma', title: 'Cardiologist', image: doctor3 },
  ],
  Dermatologist: [
    { id: 4, name: 'Dr. Neha Verma', title: 'Dermatologist', image: doctor4 },
    { id: 5, name: 'Dr. Vikram Desai', title: 'Dermatologist', image: doctor5 },
    { id: 6, name: 'Dr. Ananya Gupta', title: 'Dermatologist', image: doctor6 },
  ],
  Orthopedist: [
    { id: 7, name: 'Dr. Arun Reddy', title: 'Orthopedist', image: doctor7 },
    { id: 8, name: 'Dr. Divya Nair', title: 'Orthopedist', image: doctor8 },
    { id: 9, name: 'Dr. Aditya Singh', title: 'Orthopedist', image: doctor9 },
  ],
  Nephrologist: [
    { id: 10, name: 'Dr. Radhika Patel', title: 'Nephrologist', image: doctor10 },
    { id: 11, name: 'Dr. Nikhil Chopra', title: 'Nephrologist', image: doctor11 },
    { id: 12, name: 'Dr. Arjun Das', title: 'Nephrologist', image: doctor12 },
  ],
  Neurologist: [
    { id: 13, name: 'Dr. Rohit Malhotra', title: 'Neurologist', image: doctor13 },
    { id: 14, name: 'Dr. Kavya Iyer', title: 'Neurologist', image: doctor14 },
    { id: 15, name: 'Dr. Anjali Sharma', title: 'Neurologist', image: doctor15 },
  ],
};

// Reusable Doctor Card Component
const DoctorCard = ({ doctor, specialist }) => (
  <Col md={4} lg={3} className="mb-4">
    <Card className="h-100 text-center doctor-card">
      <Card.Img variant="top" src={doctor.image} alt={doctor.name} className="card-img-top" />
      <Card.Body>
        <Card.Title>{doctor.name}</Card.Title>
        <Card.Text>{doctor.title}</Card.Text>
        <Button as={Link} to="/book-appointment" state={{ doctor: doctor.name, specialist }} variant="primary">
          Book Now
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

const DoctorDetails = () => {
  const { category } = useParams();
  const selectedCategory = categories.find((item) => item.key === category);

  // Get doctors to display
  const getDisplayDoctors = () => {
    if (selectedCategory) {
      return doctorData[selectedCategory.key] || [];
    }
    // Show all doctors if no category selected
    return Object.values(doctorData).flat();
  };

  const doctors = getDisplayDoctors();
  const pageTitle = selectedCategory ? `${selectedCategory.name} Specialists` : 'All Doctors';
  const pageDesc = selectedCategory ? `Choose a doctor from our ${selectedCategory.name} team.` : 'Browse our full list of doctors and book an appointment.';

  return (
    <Container className="py-5 doctor-details-container">
      <h1 className="text-center mb-4">{pageTitle}</h1>
      <p className="text-center mb-5">{pageDesc}</p>
      
      <Row>
        {doctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            specialist={selectedCategory?.name || doctor.category} 
          />
        ))}
      </Row>

      {selectedCategory && (
        <div className="text-center mt-4">
          <Button as={Link} to="/Specialists" variant="secondary">
            Back to Specialist Categories
          </Button>
        </div>
      )}
    </Container>
  );
};

export default DoctorDetails;
