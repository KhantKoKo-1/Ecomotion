import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function StaffManageReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports'); // Replace with your API endpoint URL
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const markResolved = async (reportId) => {
    try {
      // Call the API endpoint to mark the report as resolved
      await axios.put(`/api/reports/${reportId}/resolve`);
      // Update the local reports state to reflect the resolved status
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId ? { ...report, resolved: true } : report
        )
      );
      console.log('Report marked as resolved:', reportId);
    } catch (error) {
      console.error('Error marking report as resolved:', error);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      // Call the API endpoint to delete the report
      await axios.delete(`/api/reports/${reportId}`);
      // Remove the deleted report from the local reports state
      setReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
      console.log('Report deleted:', reportId);
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <Box sx={{ padding: '50px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Damage Type</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Other Damages</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.damageType}</TableCell>
                <TableCell>
                  {report.imageUrl && <img src={report.imageUrl} alt="Uploaded" style={{ width: '100px' }} />}
                </TableCell>
                <TableCell>{report.otherDamages}</TableCell>
                <TableCell>
                  {!report.resolved && (
                    <>
                      <Button variant="outlined" color="primary" onClick={() => markResolved(report.id)}>
                        Mark Resolved
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => deleteReport(report.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
