import React from "react";
import Hero from "./Hero";
import Navbar from "../../components/Navbar/Navbar.jsx"; // <--- IMPORTANTE

function Landing() {
    return (
    <>
        <Navbar />
        <Hero />
    </>
    );
}

export default Landing;
