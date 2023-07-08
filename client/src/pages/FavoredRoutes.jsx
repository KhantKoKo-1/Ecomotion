// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../styles/favoredroutes.css';

// export default function FavoredRoutes() {
//   const [startlocation, setstartlocation] = useState('');
//   const [endlocation, setendlocation] = useState('');
 
//   const handlestartlocationChange = (e) => {
//     setstartlocation(e.target.value);
//   };

//   const handleendlocationChange = (value) => {
//     setendlocation(value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setOpenDialog(false);

//     if (!startlocation || !endlocation) {
//       toast.error('Please fill in all required fields!');
//       return;
//     }

//     if (!startlocation && !endlocation) {
//       toast.success('Form submitted successfully!');
//     } else {
//       toast.error('Form not submitted.');
//     }
//   };


//   return (
//     <Box
//       component="form"
//       sx={{
//         background: 'white',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//         gridTemplateRows: 'auto auto 1fr',
//         gap: '0px',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         minHeight: '100vh',
//         padding: '50px',
//         boxSizing: 'border-box',
//       }}
//       noValidate
//       autoComplete="off"
//       onSubmit={handleSubmit}
//     >
//       <h1 style={{ gridColumn: '1 / -1', color: 'black' }}>Favored Routes</h1>

//       <TextField
//         sx={{
//           gridColumn: '1 / -1',
//           width: '100%',
//           maxWidth: '600px',
//           marginBottom: '20px',
//         }}
//         id="startlocation"
//         label="startlocation"
//         value={startlocation}
//         onChange={handlestartlocationChange}
//         required
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />

// <TextField
//         sx={{
//           gridColumn: '1 / -1',
//           width: '100%',
//           maxWidth: '600px',
//           marginBottom: '20px',
//         }}
//         id="endlocation"
//         label="endlocation"
//         value={endlocation}
//         onChange={handleendlocationChange}
//         required
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
  
//       <Button variant="contained" type="submit" color="secondary" sx={{ backgroundColor: '#8BF906' }}>
//         Send
//       </Button>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//     </Box>
//   );
// }

// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../styles/favoredroutes.css';

// export default function FavoredRoutes() {
//   const [startlocation, setstartlocation] = useState('');
//   const [endlocation, setendlocation] = useState('');

//   const handlestartlocationChange = (e) => {
//     setstartlocation(e.target.value);
//   };

//   const handleendlocationChange = (value) => {
//     setendlocation(value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setOpenDialog(false);

//     if (!startlocation || !endlocation) {
//       toast.error('Please fill in all required fields!');
//       return;
//     }

//     if (!startlocation && !endlocation) {
//       toast.success('Form submitted successfully!');
//     } else {
//       toast.error('Form not submitted.');
//     }
//   };

//   return (
//     <Box
//       component="form"
//       className="form-container"
//       noValidate
//       autoComplete="off"
//       onSubmit={handleSubmit}
//     >
//       <h1>Favored Routes</h1>

//       <TextField
//         className="text-field"
//         id="startlocation"
//         label="Start Location"
//         value={startlocation}
//         onChange={handlestartlocationChange}
//         required
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />

//       <TextField
//         className="text-field"
//         id="endlocation"
//         label="End Location"
//         value={endlocation}
//         onChange={handleendlocationChange}
//         required
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />

//       <Button
//         className="submit-button"
//         variant="contained"
//         type="submit"
//         color="secondary"
//         sx={{ backgroundColor: '#8BF906' }}
//       >
//         Send
//       </Button>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//     </Box>
//   );
// }

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/favoredroutes.css';

export default function FavoredRoutes() {
  const [startlocation, setstartlocation] = useState('');
  const [endlocation, setendlocation] = useState('');

  const handlestartlocationChange = (e) => {
    setstartlocation(e.target.value);
  };

  const handleendlocationChange = (e) => {
    setendlocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startlocation || !endlocation) {
      toast.error('Please fill in all required fields!');
      return;
    }

    if (startlocation && endlocation) {
      toast.success('Form submitted successfully!');
    } else {
      toast.error('Form not submitted.');
    }
  };

  return (
    <Box
      component="form"
      className="form-container"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>Favored Routes</h1>

      <TextField
        className="text-field"
        id="startlocation"
        label="Start Location"
        value={startlocation}
        onChange={handlestartlocationChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        className="text-field"
        id="endlocation"
        label="End Location"
        value={endlocation}
        onChange={handleendlocationChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button
        className="submit-button"
        variant="contained"
        type="submit"
        color="secondary"
        sx={{ backgroundColor: '#8BF906' }}
      >
        Send
      </Button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Box>
  );
}
