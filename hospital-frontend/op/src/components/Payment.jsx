import React, { useState } from "react";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #b55b5b",
  outline: "none",
  fontSize: "14px"
};
const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #0c1e60, #0d0318)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "15px",
  transition: "0.3s"
};

const Payment = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Create order from backend
      const order = await axios.post(
        "http://127.0.0.1:8000/api/create-order/",
        { amount: (form.amount) }
      );

      const options = {
        key: "rzp_test_SnI2AMvgPGIWLe",
        amount: order.data.amount,
        currency: "INR",
        name: "Hospital Booking",
        description: "Appointment Payment",
        order_id: order.data.id,

      handler: async function (response) {
      
          console.log("SUCCESS RESPONSE:", response); // 🔥 ADD THIS
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/verify-payment/",
      {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,

        // 🔥 ADD THESE EXTRA FIELDS
       // temporary (later dynamic)
        name: form.name,
        email: form.email,
        amount: form.amount
      }
    );

    alert("Payment Successful ✅");

  } catch (error) {
    console.log("VERIFY ERROR:", error.response?.data);
    alert("Verification Failed ❌");
  }
},

        prefill: {
          name: form.name,
          email: form.email
        },

        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function (response) {
  console.log("FAIL:", response);
  alert("Payment Failed ❌");
});

    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
    }
  };

  return (
   <div style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #b4c2cd, #eff7f8)"
  }}>
    
    <div style={{
      background: "#fff",
      padding: "50px",
      borderRadius: "15px",
      width: "450px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      textAlign: "center"
    }}>
      
      <h2 style={{
        marginBottom: "20px",
        color: "#333"
      }}>
        💳  Payment
      </h2>

      <form onSubmit={handlePayment}>
        
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="amount"
          placeholder="Amount (₹)"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Pay Now 🚀
        </button>

      </form>
    </div>
  </div>
);
};

export default Payment;