// import React, { useState } from "react";
// import axios from "../axiosConfig";
// import PageWrapper from "../components/PageWrapper";

// export default function UploadRecord() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please select a file first!");

//     const formData = new FormData();
//     formData.append("file", file);
//     // formData.append("userId", "6748f45f3"); // Temporary demo ID
//     // formData.append("userId", "672fbb53a9e8cdcf9c82c9f0");
//     // formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await axios.post("/records/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       // setMessage(res.data.message);
//       setMessage(res.data.msg);
//       setFile(null);
//     } catch (err) {
//       setMessage("Error uploading file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Upload Health Record</h2>
//       <form onSubmit={handleUpload}>
//         <div className="mb-3">
//           <input
//             type="file"
//             className="form-control"
//             onChange={handleFileChange}
//           />
//         </div>
//         <button className="btn btn-primary" type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
//       {message && (
//         <div className="alert alert-info mt-3" role="alert">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "../axiosConfig";
import PageWrapper from "../components/PageWrapper";
import "../App.css";

export default function UploadRecord() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/records/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage("Error uploading file");
    }
  };

  return (
    <PageWrapper title="Upload Health Record">
      <form onSubmit={handleUpload}>
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="btn btn-primary mb-3">
          Upload
        </button>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
    </PageWrapper>
  );
}
