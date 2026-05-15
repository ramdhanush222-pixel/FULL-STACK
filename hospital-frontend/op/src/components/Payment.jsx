import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [form, setForm] = useState({ name: "", email: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const order = await axios.post("http://127.0.0.1:8000/api/create-order/", {
        amount: form.amount,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.data.amount,
        currency: "INR",
        name: "MediCare Hospital",
        description: "Appointment Payment",
        order_id: order.data.id,
        handler: async function (response) {
          try {
            await axios.post("http://127.0.0.1:8000/api/verify-payment/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name: form.name,
              email: form.email,
              amount: form.amount,
            });
            alert("Payment Successful ✅");
          } catch (error) {
            alert("Verification Failed ❌");
          }
        },
        prefill: { name: form.name, email: form.email },
        theme: { color: "#0ea5e9" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", () => alert("Payment Failed ❌"));
    } catch (error) {
      alert("Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pay-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f7ff;
          font-family: 'Sora', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .pay-root::before {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, #bae6fd 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .pay-root::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, #e0f2fe 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .pay-card {
          background: #fff;
          border-radius: 24px;
          width: 420px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 60px -10px rgba(14,165,233,0.15);
          overflow: hidden;
          position: relative;
          z-index: 1;
          animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pay-header {
          background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);
          padding: 32px 36px 28px;
          position: relative;
          overflow: hidden;
        }

        .pay-header::before {
          content: '+';
          position: absolute;
          right: 28px; top: 16px;
          font-size: 80px;
          font-weight: 300;
          color: rgba(255,255,255,0.12);
          line-height: 1;
        }

        .pay-header-tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #bae6fd;
          margin-bottom: 8px;
        }

        .pay-header h2 {
          font-size: 24px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .pay-header p {
          font-size: 13px;
          color: #7dd3fc;
          margin-top: 4px;
          font-weight: 300;
        }

        .pay-body {
          padding: 32px 36px 36px;
        }

        .field-group {
          margin-bottom: 18px;
        }

        .field-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 8px;
          display: block;
          font-family: 'DM Mono', monospace;
        }

        .field-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          pointer-events: none;
        }

        .pay-input {
          width: 100%;
          padding: 13px 14px 13px 40px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .pay-input:focus {
          border-color: #0ea5e9;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(14,165,233,0.1);
        }

        .pay-input::placeholder { color: #cbd5e1; }

        .amount-prefix {
          position: absolute;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #64748b;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          pointer-events: none;
        }

        .amount-input {
          padding-left: 58px !important;
        }

        .divider {
          height: 1px;
          background: #f1f5f9;
          margin: 24px 0;
        }

        .pay-summary {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pay-summary-label {
          font-size: 12px;
          color: #0369a1;
          font-weight: 500;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.5px;
        }

        .pay-summary-amount {
          font-size: 20px;
          font-weight: 600;
          color: #0369a1;
          font-family: 'DM Mono', monospace;
        }

        .pay-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 15px rgba(14,165,233,0.35);
          position: relative;
          overflow: hidden;
        }

        .pay-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(14,165,233,0.4);
        }

        .pay-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .pay-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .pay-btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .pay-secure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
          font-size: 12px;
          color: #94a3b8;
        }
      `}</style>

      <div className="pay-root">
        <div className="pay-card">
          <div className="pay-header">
            <div className="pay-header-tag">MediCare Hospital</div>
            <h2>Secure Payment</h2>
            <p>Complete your appointment booking</p>
          </div>

          <div className="pay-body">
            <form onSubmit={handlePayment}>
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <div className="field-wrap">
                  <span className="field-icon">👤</span>
                  <input
                    className="pay-input"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Email Address</label>
                <div className="field-wrap">
                  <span className="field-icon">✉️</span>
                  <input
                    className="pay-input"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Amount</label>
                <div className="field-wrap">
                  <span className="field-icon">💰</span>
                  <span className="amount-prefix">₹</span>
                  <input
                    className="pay-input amount-input"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange}
                    onFocus={() => setFocused("amount")}
                    onBlur={() => setFocused("")}
                    required
                  />
                </div>
              </div>

              <div className="divider" />

              {form.amount && (
                <div className="pay-summary">
                  <span className="pay-summary-label">Total to pay</span>
                  <span className="pay-summary-amount">₹{form.amount}</span>
                </div>
              )}

              <button className="pay-btn" type="submit" disabled={loading}>
                <span className="pay-btn-inner">
                  {loading ? (
                    <><div className="spinner" /> Processing...</>
                  ) : (
                    <>Pay Now 🔒</>
                  )}
                </span>
              </button>
            </form>

            <div className="pay-secure">
              🔐 Secured by Razorpay · 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
