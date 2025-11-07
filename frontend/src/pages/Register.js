import React, { useState } from "react";
import axios from "../axiosConfig";
import PageWrapper from "../components/PageWrapper";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", form);
      setMessage(res.data.msg);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("Error: " + err.response?.data?.msg);
    }
  };

  return (
    // <div className="container mt-5">
    //   <h2>Register</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} />
    //     <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
    //     <input type="password" name="password" placeholder="Password" className="form-control mb-3" onChange={handleChange} />
    //     <button className="btn btn-primary">Register</button>
    //   </form>
    //   {message && <div className="alert alert-info mt-3">{message}</div>}
    // </div>
    <PageWrapper title="Hello!">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 input-icon">
          <i className="bi bi-person"></i>
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            name="name"
            // onChange={(e) => setName(e.target.value)}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 input-icon">
          <i className="bi bi-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            name="email"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 input-icon">
          <i className="bi bi-lock"></i>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            // onChange={(e) => setPassword(e.target.value)}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary mb-3">Register</button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
        {/* {message && <div className="alert alert-info mt-3">{message}</div>} */}
      <p className="text-dark small">
        Already have an account?{" "}
        <a
        href="/register"
        className="text-decoration-none register-link"
      >
        Login here
      </a>
      </p>
    </PageWrapper>
  );
}
