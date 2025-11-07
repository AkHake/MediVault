// import React, { useState } from "react";
// import axios from "../axiosConfig";
// import "../App.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setMessage("Login successful!");
//       setTimeout(() => (window.location.href = "/dashboard"), 1000);
//     } catch (err) {
//       setMessage("Error: " + err.response?.data?.msg);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" placeholder="Email" className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} />
//         <button className="btn btn-primary">Login</button>
//       </form>
//       {message && <div className="alert alert-info mt-3">{message}</div>}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "../axiosConfig";
// import PageWrapper from "../components/PageWrapper";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setMsg("Login successful!");
//     //   setTimeout(() => (window.location.href = "/dashboard"), 1000);
//       window.location.href = "/dashboard";
//     } catch {
//       setMsg("Invalid credentials");
//     }
//   };

//   return (
//     <PageWrapper title="Welcome Back 👋">
//       <form onSubmit={handleLogin}>
//         <div className="mb-3 input-icon">
//           <i className="bi bi-envelope"></i>
//           <input
//             type="email"
//             placeholder="Email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mb-3 input-icon">
//           <i className="bi bi-lock"></i>
//           <input
//             type="password"
//             placeholder="Password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button className="btn btn-primary mb-3">Login</button>
//         {msg && <div className="alert mt-2">{msg}</div>}
//       </form>
//       <p className="text-dark small">
//         Don’t have an account?{" "}
//         <a href="/register" className="text-decoration-none" style={{ color: "#0F0D26" }}>
//           Register here
//         </a>
//       </p>
//     </PageWrapper>
//   );
// }

import React, { useState } from "react";
import axios from "../axiosConfig";
import PageWrapper from "../components/PageWrapper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMsg("Login successful!");
      window.location.href = "/dashboard";
    } catch {
      setMsg("Invalid credentials");
    }
  };

  // return (
  //   <PageWrapper title="Welcome Back 👋">
  //     <form onSubmit={handleLogin}>
  //       <div className="mb-3 input-icon">
  //         <i className="bi bi-envelope"></i>
  //         <input
  //           type="email"
  //           placeholder="Email"
  //           className="form-control"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //       </div>
  //       <div className="mb-3 input-icon">
  //         <i className="bi bi-lock"></i>
  //         <input
  //           type="password"
  //           placeholder="Password"
  //           className="form-control"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </div>

  //       <button className="btn btn-primary mb-3 w-100">Login</button>
  //       {msg && <div className="alert mt-2">{msg}</div>}
  //     </form>

  //     {/* Forgot Password link */}
  //     <div className="text-end mb-3">
  //       <a href="/forgot-password" className="forgot-link">
  //         Forgot Password?
  //       </a>
  //     </div>

  //     <p className="text-dark small">
  //       Don’t have an account?{" "}
  //       <a
  //         href="/register"
  //         className="text-decoration-none"
  //         style={{ color: "#0F0D26" }}
  //       >
  //         Register here
  //       </a>
  //     </p>
  //   </PageWrapper>
  // );
  return (
  <PageWrapper title="Welcome Back 👋">
    <form onSubmit={handleLogin} className="login-form">
      <div className="mb-3 input-icon">
        <i className="bi bi-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3 input-icon">
        <i className="bi bi-lock"></i>
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Forgot Password aligned right */}
      <div className="text-end mb-3">
        <a href="/forgot-password" className="forgot-link">
          Forgot Password?
        </a>
      </div>

      <button className="btn btn-primary w-100 mb-3">Login</button>
      {msg && <div className="alert mt-2">{msg}</div>}
    </form>

    {/* Register link centered */}
    <p className="text-center mt-3 small register-text">
      Don’t have an account?{" "}
      <a
        href="/register"
        className="text-decoration-none register-link"
      >
        Register here
      </a>
    </p>
  </PageWrapper>
);

}
