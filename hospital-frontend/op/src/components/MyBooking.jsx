import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Calendar, Clock, User, Mail, Phone, Hash, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.APPOINTMENTS)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.log(err));
  }, []);

  const handleDeleteBooking = async (id) => {
    await fetch(API_ENDPOINTS.DELETE_APPOINTMENT(id), {
      method: "DELETE"
    });

    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      handleDeleteBooking(id);
    }
  };

  return (
    <Container className="my-bookings-container">
      <Row className="mb-5">
        <Col>
          <h1 className="my-bookings-title">My Bookings</h1>
          <p className="my-bookings-subtitle">View and manage all your appointment bookings</p>
        </Col>
      </Row>

      {bookings.length === 0 ? (
        <Row className="justify-content-center">
          <Col lg={6}>
            <Alert variant="info" className="empty-bookings-alert">
              <h5>No Bookings Yet</h5>
              <p>You haven't made any appointment bookings. Start by booking your first appointment!</p>
              <Button as={Link} to="/book-appointment" variant="primary" className="mt-2">
                Book Appointment
              </Button>
            </Alert>
          </Col>
        </Row>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col lg={6} key={booking.id} className="mb-4">
              <Card className="booking-card">
                <Card.Header className="booking-card-header">
                  <div className="header-content">
                    <h5 className="booking-doctor">{booking.doctor}</h5>
                    <span className="booking-id">{booking.id}</span>
                  </div>
                </Card.Header>

                <Card.Body className="booking-card-body">
                  <Row className="mb-3">
                    <Col md={6}>
                      <div className="booking-item">
                        <User size={18} className="booking-icon" />
                        <div className="booking-info">
                          <span className="booking-label">Patient Name</span>
                          <p className="booking-value">{booking.name}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="booking-item">
                        <Mail size={18} className="booking-icon" />
                        <div className="booking-info">
                          <span className="booking-label">Email</span>
                          <p className="booking-value">{booking.email}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <div className="booking-item">
                        <Phone size={18} className="booking-icon" />
                        <div className="booking-info">
                          <span className="booking-label">Phone</span>
                          <p className="booking-value">{booking.phone}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="booking-item">
                        <Hash size={18} className="booking-icon" />
                        <div className="booking-info">
                          <span className="booking-label">Specialist</span>
                          <p className="booking-value">{booking.specialist}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <div className="booking-item">
                        <Calendar size={18} className="booking-icon" />
                        <div className="booking-info">
                          <span className="booking-label">Date</span>
                          <p className="booking-value appointment-highlight">
                            {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="booking-item">
                        <Clock size={18} className="booking-icon" />
                        <div className="booking-info">
                          <span className="booking-label">Time</span>
                          <p className="booking-value appointment-highlight">{booking.time}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {booking.message && (
                    <div className="booking-notes">
                      <span className="notes-label">Notes:</span>
                      <p className="notes-value">{booking.message}</p>
                    </div>
                  )}
                </Card.Body>

                <Card.Footer className="booking-card-footer">
                  <Button variant="outline-danger" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                    <Trash2 size={16} className="me-2" />
                    Cancel Booking
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;
