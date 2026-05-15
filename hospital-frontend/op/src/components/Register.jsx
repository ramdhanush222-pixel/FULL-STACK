import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import '../styles/RegisterForm.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }

    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      password: formData.password
    };

    try {
      setIsLoading(true);
      console.log("Sending register request to:", API_ENDPOINTS.REGISTER);
      console.log("Payload:", payload);

      const response = await axios.post(API_ENDPOINTS.REGISTER, payload);
      console.log("Register response:", response.data);

      setSuccessMessage('Registration successful. Redirecting to login...');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});

      setTimeout(() => {
<<<<<<< HEAD
        navigate('/');
=======
        navigate('/login');
>>>>>>> 9c5f9386fd409def3b7d38ddb52e947a12c621f9
      }, 1400);
    } catch (error) {
      console.error("Register error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      const backendMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        error.response?.data?.message ||
        'Registration failed. Please try again.';

      setGeneralError(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-page">
      <Container className="register-container">
        <div className="hospital-header">
          <div className="hospital-icon">🏥</div>
          <h1 className="hospital-title">Patient OP Booking System</h1>
          <p className="hospital-subtitle">Create your account to book appointments.</p>
        </div>

        <div className="register-form-card">
          <h2 className="form-title">Create a New Account</h2>

          {generalError && (
            <Alert variant="danger" className="error-alert">
              <strong>Error:</strong> {generalError}
            </Alert>
          )}

          {successMessage && (
            <Alert variant="success" className="success-alert">
              {successMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="register-form">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label className="form-label">First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                isInvalid={!!errors.firstName}
                className="form-input"
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid" className="error-message">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label className="form-label">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                isInvalid={!!errors.lastName}
                className="form-input"
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid" className="error-message">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                className="form-input"
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid" className="error-message">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="form-label">Password</Form.Label>
              <div className="password-input-wrapper">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  isInvalid={!!errors.password}
                  className="form-input password-input"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Form.Control.Feedback type="invalid" className="error-message">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label className="form-label">Confirm Password</Form.Label>
              <div className="password-input-wrapper">
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  isInvalid={!!errors.confirmPassword}
                  className="form-input password-input"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={isLoading}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Form.Control.Feedback type="invalid" className="error-message">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="register-button btn-primary-hospital"
              disabled={isLoading}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Creating Account...
                </>
              ) : (
                'Register'
              )}
            </Button>
          </Form>

          <div className="login-section">
            <p className="login-text">
              Already have an account?{' '}
<<<<<<< HEAD
              <Link to="/" className="login-link">
=======
              <Link to="/login" className="login-link">
>>>>>>> 9c5f9386fd409def3b7d38ddb52e947a12c621f9
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
