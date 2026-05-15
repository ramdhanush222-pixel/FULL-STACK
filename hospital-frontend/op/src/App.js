import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
=======
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
>>>>>>> 9c5f9386fd409def3b7d38ddb52e947a12c621f9
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Explore from './components/Explore';
import Specialists from './components/Specialists';
import DoctorDetails from './components/DoctorDetails';
import Service from './components/Service';
import BookAppointment from './components/BookAppointment';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import MyBooking from './components/MyBooking';
import Auth from './components/Auth';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import MyAppointments from "./components/MyAppointments";
import Payment from "./components/Payment";

function App() {
<<<<<<< HEAD
=======
  const location = useLocation();
>>>>>>> 9c5f9386fd409def3b7d38ddb52e947a12c621f9
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

<<<<<<< HEAD
  return (
    <div>
      {isLoggedIn && <Nav setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/*" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
=======
  const showDashboardFrame = isLoggedIn && location.pathname !== '/';

  return (
    <div>
      {showDashboardFrame && <Nav setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
>>>>>>> 9c5f9386fd409def3b7d38ddb52e947a12c621f9
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Specialists" element={<Specialists />} />
            <Route path="/doctor-details/:category?" element={<DoctorDetails />} />
            <Route path="/Services" element={<Service />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
            <Route path="/my-bookings" element={<MyBooking />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/payment" element={<Payment />} />
<<<<<<< HEAD
          </>
        )}
      </Routes>
      {isLoggedIn && <Footer />}
=======
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      {showDashboardFrame && <Footer />}
>>>>>>> 9c5f9386fd409def3b7d38ddb52e947a12c621f9
    </div>
  );
}

export default App;
