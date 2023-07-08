// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CustomerViewPastReports = () => {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = () => {
//     axios.get('/api/get/reports')
//     .then((response) => {
//       setReports(response.data);
//     })
//     .catch((error) => {
//       console.error('Error retrieving reports:', error);
//     });
//   }  

//   const deleteReport = (id) => {
//     axios.delete(`/api/delete/report/${id}`)
//     .then(() => {
//       fetchReports();
//       console.log('Report deleted successfully.');
//       })
//       .catch((error) => {
//         console.error('Error deleting report:', error);
//       });
//   };

//   return (
//     <div className="past-reports-container">
//       <h2>Past Reports</h2>
//       {reports.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Contact Number</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Other Damages</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((report) => (
//               <tr key={report.id}>
//                 <td>{report.name}</td>
//                 <td>{report.contactNumber}</td>
//                 <td>{report.dateOfReport}</td>
//                 <td>{report.timeOfReport}</td>
//                 <td>{report.otherDamages}</td>
//                 <td>
//                   <button onClick={() => deleteReport(report.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No past reports found.</p>
//       )}
//     </div>
//   );
// };

// export default CustomerViewPastReports;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerViewPastReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios
      .get('/api/get/reports')
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving reports:', error);
      });
  };

  const deleteReport = (id) => {
    axios
      .delete(`/api/delete/report/${id}`)
      .then(() => {
        fetchReports();
        console.log('Report deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting report:', error);
      });
  };

  return (
    <div className="past-reports-container">
      <h2>Past Reports</h2>
      {reports.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Other Damages</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.name}</td>
                <td>{report.contactNumber}</td>
                <td>{report.dateOfReport}</td>
                <td>{report.timeOfReport}</td>
                <td>{report.otherDamages}</td>
                <td>
                  <button onClick={() => deleteReport(report.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
};

export default CustomerViewPastReports;
