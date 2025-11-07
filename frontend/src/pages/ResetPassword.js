import React, { useState } from "react";
import axios from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/auth/reset-password/${token}`, { newPassword: password });
      setMsg(res.data.msg);
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMsg("Invalid or expired token");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      <form onSubmit={handleReset}>
        <input type="password" className="form-control mb-2" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-success">Reset</button>
      </form>
      {msg && <p className="mt-3 text-info">{msg}</p>}
    </div>
  );
}
