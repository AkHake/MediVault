import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import axios from "../axiosConfig";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      setMsg("Password reset link sent to your email!");
    } catch (err) {
      setMsg("Error sending reset link. Try again later.");
    }
  };

  return (
    <PageWrapper title="Reset Your Password 🔒">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 input-icon">
          <i className="bi bi-envelope"></i>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 mb-3">Send Reset Link</button>
        {msg && <div className="alert mt-2">{msg}</div>}
      </form>
      <a href="/login" className="text-white small text-decoration-none">
        ← Back to Login
      </a>
    </PageWrapper>
  );
}
