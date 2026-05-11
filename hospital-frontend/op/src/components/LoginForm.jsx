import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import '../styles/LoginForm.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
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
      email: formData.email.trim(),
      password: formData.password
    };

    try {
      setIsLoading(true);
      console.log("Sending login request to:", API_ENDPOINTS.LOGIN);
      console.log("Payload:", payload);

      const response = await axios.post(API_ENDPOINTS.LOGIN, payload);
      console.log("Login response:", response.data);

      const { data } = response;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email.trim());
      if (data?.token) {
        localStorage.setItem('authToken', data.token);
      }

      setSuccessMessage('Login successful. Redirecting to dashboard...');

      setTimeout(() => {
        setIsLoggedIn(true);
        navigate('/');
      }, 1200);
    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      const backendMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.message ||
        'Invalid credentials. Please try again.';

      setGeneralError(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <div className="hospital-header">
          <div className="hospital-icon">🏥</div>
          <h1 className="hospital-title">Medicare Hospital</h1>
          <p className="hospital-subtitle">Manage your medical appointments with ease</p>
        </div>

        <div className="login-form-card">
          <h2 className="form-title">Login to Your Account</h2>

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

          <Form onSubmit={handleSubmit} className="login-form">
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

            <Button
              variant="primary"
              type="submit"
              className="login-button btn-primary-hospital"
              disabled={isLoading}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>

          <div className="register-section">
            <p className="register-text">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="register-link">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
