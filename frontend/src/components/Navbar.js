// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Navbar() {

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   // const isLoggedIn = !!localStorage.getItem("token");

//   // return (
//   //   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//   //     <div className="container-fluid">
//   //       <Link className="navbar-brand" to="/">MediVault</Link>
//   //       <div>
//   //         {isLoggedIn ? (
//   //           <>
//   //             <Link className="btn btn-light mx-2" to="/dashboard">Dashboard</Link>
//   //             <Link className="btn btn-light mx-2" to="/upload">Upload</Link>
//   //             <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
//   //           </>
//   //         ) : (
//   //           <>
//   //             <Link className="btn btn-light mx-2" to="/login">Login</Link>
//   //             <Link className="btn btn-light mx-2" to="/register">Register</Link>
//   //           </>
//   //         )}
//   //       </div>
//   //     </div>
//   //   </nav>
//   // );

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">MediVault</Link>
//         <div className="d-flex align-items-center">
//           {token ? (
//             <>
//               <span className="text-white mx-2">
//                 Welcome, <strong>{user?.name}</strong>
//               </span>
//               <Link className="btn btn-light mx-2" to="/dashboard">Dashboard</Link>
//               <Link className="btn btn-light mx-2" to="/upload">Upload</Link>
//               <button className="btn btn-danger mx-2" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link className="btn btn-light mx-2" to="/login">Login</Link>
//               <Link className="btn btn-light mx-2" to="/register">Register</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css";

// export default function Navbar() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="navbar navbar-expand-lg medi-navbar shadow-sm">
//       <div className="container-fluid d-flex justify-content-between align-items-center">
//         <NavLink className="navbar-brand text-white fw-bold" to="/">
//           MediVault
//         </NavLink>

//         <div className="d-flex align-items-center">
//           {token && (
//             <span className="text-white me-3">
//               Welcome, <strong>{user?.name}</strong>
//             </span>
//           )}

//           {token ? (
//             <>
//               <NavLink to="/dashboard" className="nav-btn">
//                 Dashboard
//               </NavLink>
//               <NavLink to="/upload" className="nav-btn">
//                 Upload
//               </NavLink>
//               <button className="nav-btn logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <NavLink to="/login" className="nav-btn">
//                 Login
//               </NavLink>
//               <NavLink to="/register" className="nav-btn">
//                 Register
//               </NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Generate avatar initial (first letter of name)
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="navbar navbar-expand-lg medi-navbar shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <NavLink className="navbar-brand text-white fw-bold" to="/">
        <img src="/images/Logo.png" alt="MediVault" className="navbar-brand" height="70" />
          MediVault
        </NavLink>

        <div className="d-flex align-items-center">
          {token && (
            <div className="d-flex align-items-center me-3">
              <div className="avatar-circle me-2">{avatarLetter}</div>
              <span className="text-white fw-semibold">
                Welcome, <strong>{user?.name}</strong>
              </span>
            </div>
          )}

          {token ? (
            <>
              <NavLink to="/dashboard" className="nav-btn">
                Dashboard
              </NavLink>
              <NavLink to="/upload" className="nav-btn">
                Upload
              </NavLink>
              <NavLink to="/profile" className="nav-btn">
                Profile
              </NavLink>
              <button className="nav-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-btn">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-btn">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
