import React from "react";
import { FaHome, FaRocket, FaCode } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        <FaHome style={styles.icon} /> Welcome to My App
      </h1>
      <p style={styles.text}>
        <FaRocket style={styles.icon} /> This is the home page of my
        project.
      </p>
      <p style={styles.text}>
        <FaCode style={styles.icon} /> Built with React and styled inline.
      </p>
      <p style={styles.text}>
        <MdSecurity style={styles.icon} /> Secure and reliable.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2rem",
    margin: "10px 0",
  },
  icon: {
    marginRight: "8px",
    color: "#CCFF00",
  },
};

export default Home;
