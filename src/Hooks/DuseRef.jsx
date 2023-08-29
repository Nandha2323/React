import React from 'react'
import { useState, useRef } from 'react';

function DuseRef() {
    const sd = useRef("Nandha");
    const [BName, setBName] = useState("");
  
  return (
    <div className=" border border-primary border-3">
        <h2>UseRef</h2>
        <p>Update value without render</p>
        <label htmlFor="Email">BName</label>
        <input type='text'
          placeholder='Enter Your BName'
          onChange={(ev) => setBName(ev.target.value)} />
        <h3> Hi {sd.current}</h3>
        <h3> Hi {sd.current = BName}</h3>
      </div>
  )
}

export default DuseRef