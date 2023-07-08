// home.jsx
import React from 'react';
import Map from '../components/Map';
import "../styles/Home.css";
import Paper from '@mui/material/Paper';
import "../styles/Home.css";

function Home() {
  return (
    <Paper elevation={24} className="home-container">
      <div className="welcomecard">
        <h2>Welcome User,</h2>
        <h6>Let's embrace nature in motion!</h6>
      </div>
      <Map />
    </Paper>
  );
}

export default Home;
