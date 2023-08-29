import React, { useState ,useEffect} from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function BasicTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => [...data]);
  const [searchInput, setSearchInput] = useState(""); 

  useEffect(() => {
    // Filter the data based on the search input
    const filteredData = data.filter((row) =>
      row.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setTableData(filteredData);
  }, [data, searchInput]);
  
  const openEditModal = (row) => {
    setEditedRow(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedRow(null);
    setIsEditModalOpen(false);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `https://64d08349ff953154bb78f9e5.mockapi.io/api/as/Employees/${updatedData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        // Update tableData using the current state
        const editedRowIndex = data.findIndex(

          (row) => row.id === updatedData.id
        );
        if (editedRowIndex !== -1) {
          const newData = [...tableData];
          newData[editedRowIndex] = updatedData;
          setTableData(newData);
        }

      } else {
        console.error("Failed to update data on the server");
      }
      // Close the modal
      closeEditModal();

    } catch (error) {
      console.error("An error occurred while updating data:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://64d08349ff953154bb78f9e5.mockapi.io/api/as/Employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted row from tableData
        const newData = tableData.filter((row) => row.id !== id);
        setTableData(newData);
      } else {
        console.error("Failed to delete data on the server");
      }
    } catch (error) {
      console.error("An error occurred while deleting data:", error);
    }
  };
  
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter:searchInput,
    },
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
    },
  });


  return (

    <div className="container">
      <div className="mb-3">
        <input 
          type="text"
          className="form-control w-25 shadow border  border-2"
          placeholder="Search by Name..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            
          }}
        />

      </div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={
                    header.id === "id"
                      ? header.column.getToggleSortingHandler()
                      : null
                  }
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        <span>
                          {header.column.isSortedDesc ? "🔽" : "🔼"}
                        </span>
                      ) : null}
                    </div>
                  )}
                </th>
              ))}
              <th>Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => openEditModal(row.original)}
                >
                  Edit
                </button>
                &nbsp;  &nbsp;  &nbsp;
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(row.original.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Row</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeEditModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="id">Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      value={editedRow.id}
                      disabled // Make the field non-editable
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={editedRow.name || ""}
                      onChange={(e) =>
                        setEditedRow({ ...editedRow, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={editedRow.email || ""}
                      onChange={(e) =>
                        setEditedRow({ ...editedRow, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={editedRow.phone || ""}
                      onChange={(e) =>
                        setEditedRow({ ...editedRow, phone: e.target.value })
                      }
                    />
                  </div>


                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEditModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdate(editedRow)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
}
