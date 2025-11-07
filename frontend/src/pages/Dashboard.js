import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
// import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/build/pdf.worker.entry";

export default function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("/records"); 
      setRecords(res.data);
    } catch (err) {
      // console.error("Error fetching records:", err);
      setRecords([]);
    }
  };

  return (
    // <div className="container mt-5">
    //   {/* <h2>Your Uploaded Records</h2> */}
    //   <h2 className="mb-4 text-center"><i className="bi bi-files"></i> My Health Records</h2>
    //   {records.length === 0 ? (
    //     <p>No records found. Try uploading one.</p>
    //   ) : (
    //     <table className="table table-striped mt-3">
    //       <thead>
    //         <tr>
    //           <th>File Name</th>
    //           <th>Upload Date</th>
    //           <th>Download</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {records.map((rec) => (
    //           <tr key={rec._id}>
    //             <td>{rec.fileName}</td>
    //             <td>{new Date(rec.uploadDate).toLocaleString()}</td>
    //             <td>
    //               <a
    //                 href={`http://localhost:5000/${rec.filePath}`}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="btn btn-sm btn-success"
    //               >
    //                 View / Download
    //               </a>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>

//     <div className="container mt-5">
//   <h2 className="mb-4 text-center"><i className="bi bi-files"></i> My Health Records</h2>
//   <div className="row">
//     {records.map(r => (
//       <div key={r._id} className="col-md-4 mb-3">
//         <div className="card shadow-sm border-0">
//           <div className="card-body">
//             <h6>{r.fileName}</h6>
//             <p className="text-muted small">Uploaded on {new Date(r.uploadDate).toLocaleDateString()}</p>
//             <a className="btn btn-outline-primary btn-sm" href={`http://localhost:5000/${r.filePath}`} target="_blank" rel="noreferrer">View</a>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

<div className="container mt-5">
  <h2 className="text-center mb-4" style={{ color: "var(--primary-color)" }}>
    <i className="bi bi-folder2-open"></i> My Health Records
  </h2>
  {/* <div className="row">
    {records.map(r => (
      <div key={r._id} className="col-md-4 mb-4">
        <div className="card p-3 text-center">
          <h6>{r.fileName}</h6>
          <p className="small text-muted">
            Uploaded on {new Date(r.uploadDate).toLocaleDateString()}
          </p>
          <a
            className="btn btn-outline-primary btn-sm"
            href={`http://localhost:5000/${r.filePath}`}
            target="_blank"
            rel="noreferrer"
          >
            View Record
          </a>
        </div>
      </div>
    ))}
  </div> */}
  <div className="row">
  {records.map((r) => {
    const fileExtension = r.fileName.split('.').pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
    const fileURL = `http://localhost:5000/${r.filePath}`;

    return (
      <div key={r._id} className="col-md-4 mb-4">
        <div className="card shadow-sm border-0 h-100 text-center p-3">
          {/* File Preview Section */}
          <div
            style={{
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "10px",
              backgroundColor: "var(--accent-color)",
            }}
          >
            {isImage ? (
              <img
                src={fileURL}
                alt={r.fileName}
                style={{ maxHeight: "180px", maxWidth: "100%", objectFit: "cover", borderRadius: "10px" }}
              />
            ) : fileExtension === "pdf" ? (
              <i className="bi bi-file-earmark-pdf" style={{ fontSize: "60px", color: "var(--secondary-color)" }}></i>
            ) : (
              <i className="bi bi-file-earmark-text" style={{ fontSize: "60px", color: "var(--secondary-color)" }}></i>
            )}
          </div>

          {/* File Details */}
          <div className="mt-3">
            <h6 style={{ color: "var(--secondary-color)" }}>{r.fileName}</h6>
            <p className="text-muted small mb-2">
              Uploaded on {new Date(r.uploadDate).toLocaleDateString()} at{" "}
              {new Date(r.uploadDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <a
              className="btn btn-outline-primary btn-sm"
              href={fileURL}
              target="_blank"
              rel="noreferrer"
            >
              View Record
            </a>
          </div>
        </div>
      </div>
    );
  })}
</div>
</div>

  );
}
