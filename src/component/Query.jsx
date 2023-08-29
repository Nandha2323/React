import React from "react";
import BasicTable2 from "./BasicTable2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Query() {
  
const Columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
  ];
  
  return (
    <QueryClientProvider client={queryClient}>
    <div className="table-container">
      <h1 className="text-center fw-bold">Using TanStack Query</h1>
      <br />
      <BasicTable2 columns={Columns}/>
    </div>
    </QueryClientProvider>
  );
}
export default Query;