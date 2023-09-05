import React from "react";
import Routing from "./component/Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routing />
    
      </div>
    </QueryClientProvider>
  );
}

export default App;
