import React from "react";
import { useState, useEffect } from 'react';

function BuseEffect() {
  const [count, setCount] = useState(0);
  const [add, setAdd] = useState(0);

  useEffect(() => {
    document.title = ` ${add} times`;
  }, [add]);

  return (
    <div className=" border border-primary border-3">
      <h1>Functional Component</h1>
      <h2>useEffect</h2>
      <div className="box">
        <h3>{count}</h3>
        <p>No Dependency</p>
        <button onClick={() => setCount(count + 1)}>ADD</button>
      </div>
      <div className="box">
        <h3>{add}</h3>
        <p>Selective Dependency</p>
        <button onClick={() => setAdd(add + 1)}>ADD</button>
      </div>
      <br />
      <br />
    </div>
  );
}

export default BuseEffect;
