import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import PageWrapper from "../components/PageWrapper"; // Import your glass card wrapper

export default function Profile() {
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/user/me", {
        name: user.name,
        email: user.email,
      });
      setUser(res.data);
      setMsg("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMsg("Error updating profile. Try again.");
    }
  };

  return (
    <PageWrapper title="My Profile 👤">
      <form onSubmit={handleUpdate} className="profile-form">
        <div className="mb-3 input-icon">
          <i className="bi bi-person"></i>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div className="mb-3 input-icon">
          <i className="bi bi-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <button className="btn btn-primary w-100 mb-3">Update Profile</button>

        {msg && (
          <div
            className="alert mt-2 text-center"
            style={{
              backgroundColor: "rgba(200,192,232,0.2)",
              color: "#0F0D26",
              border: "none",
            }}
          >
            {msg}
          </div>
        )}
      </form>
    </PageWrapper>
  );
}
