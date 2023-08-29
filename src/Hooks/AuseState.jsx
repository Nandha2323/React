import React from "react";
import { useState } from 'react'
import $ from "jquery";
function AuseState() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [ValueEmail, setValueEmail] = useState("");
  const [ValueName, setValueName] = useState("");

  const handleFunction = (ev) => {
    ev.preventDefault();
    alert("details are to be Added");
    setValueEmail(Email);
    setValueName(Name);
    $("#Name").val("");
    $("#Email").val("");
  };
  return (
    <div className="row border border-primary border-3">
      <div className=" border border-primary border-3">
        <h1>Using useState in FunctionalComponent</h1>
        <form action="" onSubmit={handleFunction}>
          <fieldset>
            <legend>form</legend>
            <div>
              <label htmlFor="Email">Name</label>
              <input
                type="text"
                id="Name"
                placeholder="Enter Your Name"
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Enter Your Email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
        <div>
          <p>Name:{ValueName}</p>
          <p>Email:{ValueEmail}</p>
        </div>
      </div>
    </div>
  );
}

export default AuseState;
