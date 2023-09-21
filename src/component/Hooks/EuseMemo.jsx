import React from 'react'
import { useState, useMemo } from 'react';

function EuseMemo() {
  const [theme, setTheme] = useState('dark');
  
  const ChangeTheme = () => { 
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'white' : 'dark'));
  };
  const [countt, setCountt] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCountt((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  const SlowCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num ;
  };
  const calculation = useMemo(
    () => SlowCalculation(countt)
  , [countt]);

  return (

    <div className='body2 text-center'><br />
      <div className={`w-50 m-auto border  border-5 ${theme}-theme`}>
        <div ><br />
          <h2>UseMemo</h2><br />
          <button onClick={ChangeTheme}>ChangeTHEME</button><br /><br />
          <p>Current Theme: {theme}</p>
          {todos.map((todo, index) => {
            return <p key={index}>{todo}</p>;
          })}
          <p>this todo button work fast</p>
          <button onClick={addTodo}>Add Todo</button><br />
        </div><br/> <br/> <hr />
        <div   >
         <h4> Count: {countt}</h4>
          <p>this todo button work slow</p>
          <button onClick={increment}>+1</button>
          <h2>Slow Calculation</h2>
          <h3>{calculation}</h3>
        </div>
      </div>
    </div>
  )
}

export default EuseMemo;

