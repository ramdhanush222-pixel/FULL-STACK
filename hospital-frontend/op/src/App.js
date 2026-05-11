import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

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
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Specialists" element={<Specialists />} />
            <Route path="/doctor-details/:category?" element={<DoctorDetails />} />
            <Route path="/Services" element={<Service />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
            <Route path="/my-bookings" element={<MyBooking />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/payment" element={<Payment />} />
          </>
        )}
      </Routes>
      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
