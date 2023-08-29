import React from 'react'
import { useState,createContext } from 'react';

function useContext() {
    const UserContext = createContext();
  const [user] = useState("Nandha");
  const [company] = useState("Sumanas tech");
 
  return (
    <div>
         <div className="row border border-primary border-3">
        <UserContext.Provider value={user}>
          <h2>UseContext</h2><br />
          <p>Passing Values through useContext</p>
          <h3> Hi -{user}</h3>
          <h3>Welcome to -{company}</h3><br />
        </UserContext.Provider>
      </div>
    </div>
  )
}

export default useContext