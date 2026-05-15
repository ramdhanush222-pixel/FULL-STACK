import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { CheckCircle } from 'lucide-react';

const AppointmentConfirmation = () => {
  const location = useLocation();
  const appointmentData = location.state?.appointment || null;

  if (!appointmentData) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          No appointment data found. <Link to="/book-appointment">Book an appointment</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 appointment-confirmation">
      <Row className="justify-content-center">
        <Col lg={8}>
          {/* Success Message */}
          <div className="text-center mb-5">
            <CheckCircle size={60} className="text-success mb-3" style={{ display: 'block', margin: '0 auto 1rem' }} />
            <h1 className="confirmation-title">Appointment Confirmed!</h1>
            <p className="confirmation-subtitle">Your appointment has been successfully booked. Please check your email for confirmation details.</p>
          </div>

          {/* Appointment Details Card */}
          <Card className="appointment-details-card mb-4">
            <Card.Header className="appointment-header">
              <h4 className="mb-0">Appointment Details</h4>
            </Card.Header>
            <Card.Body className="appointment-body">
              <Row className="mb-4">
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Patient Name:</span>
                    <p className="detail-value">{appointmentData.name}</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Doctor:</span>
                    <p className="detail-value">{appointmentData.doctor}</p>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Specialist Area:</span>
                    <p className="detail-value">{appointmentData.specialist}</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <p className="detail-value">{appointmentData.email}</p>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Phone Number:</span>
                    <p className="detail-value">{appointmentData.phone}</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Appointment ID:</span>
                    <p className="detail-value">{appointmentData.appointmentId}</p>
                  </div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <p className="detail-value appointment-date">{new Date(appointmentData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="detail-item">
                    <span className="detail-label">Time:</span>
                    <p className="detail-value appointment-time">{appointmentData.time}</p>
                  </div>
                </Col>
              </Row>

              {appointmentData.message && (
                <Row>
                  <Col>
                    <div className="detail-item">
                      <span className="detail-label">Additional Notes:</span>
                      <p className="detail-value">{appointmentData.message}</p>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>

          {/* Important Information */}
          <Card className="alert-info-card mb-4">
            <Card.Body>
              <h5 className="mb-3">Important Information</h5>
              <ul className="important-list">
                <li>Please arrive 15 minutes before your scheduled appointment time.</li>
                <li>Bring all necessary medical documents and insurance information.</li>
                <li>If you need to reschedule, please contact us at least 24 hours in advance.</li>
                <li>A confirmation email has been sent to <strong>{appointmentData.email}</strong></li>
              </ul>
            </Card.Body>
          </Card>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Button as={Link} to="/" variant="primary" size="lg" className="me-3">
              Back to Home
            </Button>
            <Button as={Link} to="/specialists" variant="outline-primary" size="lg">
              Book Another Appointment
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentConfirmation;
