import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // 🔹 Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(API_ENDPOINTS.APPOINTMENTS);
        setAppointments(res.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 🔹 Delete Appointment
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      await axios.get(API_ENDPOINTS.DELETE_APPOINTMENT(id));

      alert("Deleted successfully");

      setAppointments(prev =>
        prev.filter(item => item.id !== id)
      );

    } catch (error) {
      console.log(error);
      alert("Error deleting");
    } finally {
      setDeletingId(null);
    }
  };

  // 🔹 Loading UI
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading appointments...</p>
      </div>
    );
  }

  // 🔹 Error UI
  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  // 🔹 Main UI
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h4>{item.name}</h4>
            <p>Phone: {item.phone}</p>
            <p>Doctor: {item.doctor}</p>
            <p>Date: {item.date}</p>
            <p>Time: {item.time}</p>

            {/* ✅ Delete Button */}
           <button
      onClick={() => {
        console.log("Button clicked:", item.id); // 🔥 DEBUG
        handleDelete(item.id);
      }}
      style={{
        background: "red",
        color: "white",
        padding: "5px",
        border: "none",
        cursor: "pointer",
        marginTop: "10px"
      }}
    >
      Cancel Appointment
    </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;