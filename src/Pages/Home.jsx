import React from "react";
import Welcome from "../component/HOC/Welcome";

function Home() {
   
  return (
    <div className="body2 text-center">
      <br />
      <div>
        <h1> Working on HOC </h1>
        <br />
        <Welcome name="Nandha" />
        
      </div>
    </div>
  );
}

export default Home;
