import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiTelInput } from 'mui-tel-input';
import '../styles/customerreport.css';

export default function CustomerReportDamages() {
  const [otherDamages, setOtherDamages] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateOfReport, setDateOfReport] = useState('');
  const [timeOfReport, setTimeOfReport] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContactNumberChange = (value) => {
    setContactNumber(value);
  };

  const handleDateOfReportChange = (e) => {
    setDateOfReport(e.target.value);
  };

  const handleTimeOfReportChange = (e) => {
    setTimeOfReport(e.target.value);
  };

  const handleButtonClick = (e) => {
    setSelectedImage(e.target.name);
    setOpenDialog(true);
  };

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setSelectedImage(URL.createObjectURL(uploadedImage));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(false);

    if (!name || !contactNumber || !dateOfReport || !timeOfReport) {
      toast.error('Please fill in all required fields!');
      return;
    }

    if (!selectedImage && !otherDamages) {
      toast.success('Form submitted successfully!');
    } else if (selectedImage) {
      toast.success('Image uploaded successfully!');
    } else {
      toast.success('Form submitted successfully!');
    }
  };

  const handleOtherDamagesChange = (e) => {
    setOtherDamages(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        background: 'white',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridTemplateRows: 'auto auto 1fr',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: '100vh',
        padding: '50px',
        boxSizing: 'border-box',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1 style={{ gridColumn: '1 / -1', color: 'black' }}>Report Damages</h1>

      <TextField
        sx={{
          gridColumn: '1 / -1',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
        id="name"
        label="Name"
        value={name}
        onChange={handleNameChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <MuiTelInput
        defaultCountry="sg"
        label="Contact Number"
        value={contactNumber}
        onChange={handleContactNumberChange}
        required
      />

      <TextField
        sx={{
          gridColumn: '1 / -1',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
        id="dateOfReport"
        label="Date of Report"
        type="date"
        value={dateOfReport}
        onChange={handleDateOfReportChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        sx={{
          gridColumn: '1 / -1',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
        id="timeOfReport"
        label="Time of Report"
        type="time"
        value={timeOfReport}
        onChange={handleTimeOfReportChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button variant="contained" component="label" name="battery" onClick={handleButtonClick}>
        Battery
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="basket" onClick={handleButtonClick}>
        Basket
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="brake" onClick={handleButtonClick}>
        Brake
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="chain" onClick={handleButtonClick}>
        Chain
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="charging station" onClick={handleButtonClick}
      >
        Charging Station
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="lock" onClick={handleButtonClick}>
        Lock
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="pedal" onClick={handleButtonClick}>
        Pedal
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="seat" onClick={handleButtonClick}>
        Seat
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="stand" onClick={handleButtonClick}>
        Stand
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button variant="contained" component="label" name="tyre" onClick={handleButtonClick}>
        Tyre
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <TextField
        sx={{
          gridColumn: '1 / -1',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
        id="outlined-multiline-static"
        label="Other Damages (Optional)"
        multiline
        rows={10}
        value={otherDamages}
        onChange={handleOtherDamagesChange}
        helperText="If there are any other damages, please provide the details."
      />

      <Button variant="contained" type="submit" color="secondary" sx={{ backgroundColor: '#8BF906' }}>
        Submit
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <DialogContentText>Please confirm the selected image:</DialogContentText>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Box>
  );
}
