import React, { useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { CheckCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';


const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentState = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    specialist: appointmentState.specialist || '',
    doctor: appointmentState.doctor || '',
    message: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const handleChange = (e) => {
  const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      API_ENDPOINTS.SAVE_APPOINTMENT,
      {
        name: formData.name,
        phone: formData.phone,
        doctor: formData.doctor || "General",
        date: formData.date,
        time: formData.time,
      }
    );

    alert("Appointment booked successfully!");

    // 🔥 IMPORTANT: get appointment ID from backend
    const appointmentId = res.data.id;

    // 👉 directly go to payment page
    navigate("/payment", {
      state: {
        appointment_id: appointmentId,
        name: formData.name,
        email: formData.email,
        amount: 500   // you can change amount
      }
    });

  } catch (error) {
    console.error(error);
    alert("Error saving appointment");
  }
};

  return (
    <Container className="py-5 book-appointment-container">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="text-center mb-2 book-appointment-title">Book Your Appointment</h1>
          <p className="text-center mb-5 book-appointment-subtitle">
            Fill in the details to schedule your appointment with our specialists
          </p>

          {formData.doctor && (
            <Card className="mb-4 summary-card">
              <Card.Body>
                <strong className="summary-label">Selected Doctor:</strong> <span className="summary-value">{formData.doctor}</span>
                <br />
                <strong className="summary-label">Specialist Area:</strong> <span className="summary-value">{formData.specialist}</span>
              </Card.Body>
            </Card>
          )}

          <Card className="appointment-form-card">
            <Card.Body>
              <Form onSubmit={handleSubmit} className="appointment-form">
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Preferred Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Preferred Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Select Specialist</Form.Label>
                  <Form.Select
                    name="specialist"
                    value={formData.specialist}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a specialist</option>
                    <option value="Cardiologist">(Heart Specialist)</option>
                    <option value="Dermatologist">(Skin Specialist)</option>
                    <option value="Neurologist">(Brain Specialist)</option>
                    <option value="Orthopedist">(Bone & Joint Specialist)</option>
                    <option value="Nephrologist">(Kidney Specialist)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Doctor Name (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    placeholder="Doctor name (from selected specialist)"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any additional information or medical history"
                    rows={4}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" size="lg" className="w-100 submit-btn">
                  Book Appointment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Simple Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm" className="booking-success-modal">
        <Modal.Body className="modal-success-body">
          <div className="text-center">
            <CheckCircle size={70} className="text-success mb-3" style={{ display: 'block', margin: '0 auto' }} />
            <h3 className="modal-success-title">Booking Done!</h3>
            <p className="modal-success-message">Your appointment has been successfully booked.</p>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer-success">
        <Button variant="primary" onClick={() => setShowModal(false)}>
  Close
</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookAppointment;
