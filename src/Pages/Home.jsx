import React from "react";
import Welcome from "../component/HOC/Welcome";
import Counter from "../Redux/displayRedux/Counter";

function Home() {
   
  return (
    <div className="body2 text-center">
      <br />
      <div>
        <h1> Working on HOC </h1>
        <br />
        <Welcome name="Nandha" />
        <Counter/>
      </div>
    </div>
  );
}

export default Home;
