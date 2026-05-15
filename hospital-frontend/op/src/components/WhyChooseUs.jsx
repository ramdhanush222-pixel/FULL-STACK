import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: '👨‍⚕️',
      title: 'Experienced Doctors',
      description: 'Our team consists of highly qualified and experienced medical professionals dedicated to providing the best healthcare services.'
    },
    {
      id: 2,
      icon: '📅',
      title: 'Easy Appointment Booking',
      description: 'Book appointments online with just a few clicks. Our user-friendly system makes scheduling visits quick and convenient.'
    },
    {
      id: 3,
      icon: '💰',
      title: 'Affordable Healthcare',
      description: 'Quality healthcare shouldn\'t be expensive. We offer competitive pricing and various payment options to make care accessible.'
    },
    {
      id: 4,
      icon: '🕒',
      title: '24/7 Support',
      description: 'Round-the-clock medical support and emergency services. We\'re here for you whenever you need us, day or night.'
    }
  ];

  return (
    <section className="why-container py-5">
      <Container>
        <h2 className="text-center mb-5">Why Choose Us?</h2>
        <Row>
          {features.map((feature) => (
            <Col key={feature.id} md={6} lg={3} className="mb-4">
              <Card className="why-card h-100 text-center border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="feature-icon mb-3">
                    <span style={{ fontSize: '3rem' }}>{feature.icon}</span>
                  </div>
                  <Card.Title className="mb-3">{feature.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;