// import React from "react";

// export default function PageWrapper({ title, children }) {
//   return (
//     <div
//       style={{
//         backgroundColor: "var(--accent-color)",
//         minHeight: "100vh",
//         paddingTop: "80px",
//       }}
//     >
//       <div className="container text-center">
//         <h2
//           style={{
//             color: "var(--primary-color)",
//             fontWeight: "600",
//             marginBottom: "20px",
//           }}
//         >
//           {title}
//         </h2>
//         <div className="p-4 rounded shadow-sm bg-white">{children}</div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import "./PageWrapper.css";

export default function PageWrapper({ title, children }) {
  return (
    <div className="page-wrapper">
      <div className="form-card shadow-lg p-4">
        <h3 className="mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}
