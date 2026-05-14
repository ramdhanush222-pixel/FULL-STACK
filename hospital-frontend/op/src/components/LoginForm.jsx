import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShieldCheck,
  CalendarHeart,
  Stethoscope
} from 'lucide-react';
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

      const response = await axios.post(API_ENDPOINTS.LOGIN, payload);
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
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-page">
      <Container className="login-shell">
        <section className="login-showcase">
          <div className="login-showcase-badge">
            <ShieldCheck size={16} />
            <span>Secure Patient Portal</span>
          </div>

          <div className="login-brand">
            <div className="login-brand-icon">H</div>
            <div>
              <p className="login-brand-label">Medicare Hospital</p>
              <h1 className="login-brand-title">Your care journey, organized in one place.</h1>
            </div>
          </div>

          <p className="login-showcase-copy">
            Log in to review appointments, continue bookings, and keep your hospital records within easy reach.
          </p>

          <div className="login-feature-grid">
            <article className="login-feature-card">
              <CalendarHeart size={20} />
              <div>
                <h3>Appointments</h3>
                <p>Book, track, and manage upcoming visits without extra steps.</p>
              </div>
            </article>

            <article className="login-feature-card">
              <Stethoscope size={20} />
              <div>
                <h3>Specialists</h3>
                <p>Reconnect with trusted doctors and departments faster.</p>
              </div>
            </article>
          </div>

          <div className="login-showcase-footer">
            <span className="login-stat-value">24/7</span>
            <span className="login-stat-label">access for registered patients</span>
          </div>
        </section>

        <section className="login-panel">
          <div className="login-panel-header">
            <p className="login-panel-kicker">Welcome back</p>
            <h2 className="login-panel-title">Sign in to your account</h2>
            <p className="login-panel-copy">Use your registered email and password to continue.</p>
          </div>

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
              <div className="input-shell">
                <span className="input-icon">
                  <Mail size={18} />
                </span>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  className="form-input input-with-icon"
                  disabled={isLoading}
                />
              </div>
              <Form.Control.Feedback type="invalid" className="error-message">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="form-label">Password</Form.Label>
              <div className="password-input-wrapper">
                <span className="input-icon">
                  <LockKeyhole size={18} />
                </span>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  isInvalid={!!errors.password}
                  className="form-input password-input input-with-icon"
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

            <div className="login-helper-row">
              <span>Protected login for registered patients only</span>
              <Link to="/register" className="quick-register-link">
                Create account
              </Link>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="login-button btn-primary-hospital"
              disabled={isLoading}
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

          <div className="login-support-card">
            <p className="login-support-title">New to the portal?</p>
            <p className="login-support-copy">
              Create an account to start booking appointments and viewing payment details.
            </p>
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default LoginForm;
