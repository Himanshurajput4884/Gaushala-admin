import "./App.css";
import React, { useState, useEffect, version } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import Activities from "./components/Activities/Activities";
import Login from "./components/Login/Login";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar";
import SideNavBar from "./components/NavBar/prev-SideNavBar/SideNavbar.js";

const URL = `https://gaushala-backend.onrender.com`;

function App() {
  const [sideNavBarExpanded, setSideNavBarExpanded] = useState(false);
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleSideNavBar = () =>{
    setSideNavBarExpanded(!sideNavBarExpanded);
  }

  useEffect(() => {
    const VerifyToken = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (!storedToken) {
          setIsLogin(false);
          return;
        }
        console.log(storedToken);
        const response = await axios.get(`${URL}/verify/token`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        // console.log("Response: ", response);

        if (
          response.status === 200 &&
          response.data.message === "Correct-token"
        ) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (err) {
        console.log("Error in verifying token: ", err);
        setIsLogin(false);
        return;
      } finally {
        setLoading(false);
      }
    };
    VerifyToken();
  }, [token]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2> Loading... </h2>
      </div>
    );
  }

  return (
    <div>
      {isLogin ? (
        <>
          <NavBar toggleSideNavBar={toggleSideNavBar}/>
          <SideNavBar isExpanded={sideNavBarExpanded} toggleSideNavBar={toggleSideNavBar}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/activity" element={<Activities />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsLogin={setIsLogin} />} />
          {/* Add additional login-related routes if needed */}
        </Routes>
      )}
    </div>
  );
}

export default App;
