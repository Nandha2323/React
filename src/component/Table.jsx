import React, { useState, useEffect, useCallback } from "react";
import BasicTable from "../component/BasicTable"; // Adjust the path as needed

function Table() {
  const itemsPerPage = 10;
  const totalItems = 100;
  const lastPageIndex = Math.floor(totalItems / itemsPerPage);

  const [lastPageData, setLastPageData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async (pageIndex) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(
        `https://64d08349ff953154bb78f9e5.mockapi.io/api/as/Employees?page=${pageIndex}&limit=${itemsPerPage}`
      );

      if (response.ok) {
        const data = await response.json();
        setLastPageData(data);
        setIsLastPage(pageIndex === lastPageIndex);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [itemsPerPage, lastPageIndex]);

  useEffect(() => {
    fetchData(pageIndex);
  }, [fetchData, pageIndex]);

  const handlePreviousPage = () => {
    const newPageIndex = pageIndex - 1;

    if (newPageIndex >= 1) {
      setPageIndex(newPageIndex);
      setIsLastPage(false);
    }
  };

  const goToLastPage = () => {
    setPageIndex(lastPageIndex);
    setIsLastPage(true);
  };

  const GoToNextPage = () => {
    const nextPageIndex = pageIndex + 1;
    setPageIndex(nextPageIndex);
    setIsLastPage(nextPageIndex === lastPageIndex);

    if (nextPageIndex === lastPageIndex) {
      fetchLastPageData();
    }
  };

  const fetchLastPageData = async () => {
    try {
      const response = await fetch(
        `https://64d08349ff953154bb78f9e5.mockapi.io/api/as/Employees?page=${lastPageIndex}&limit=${itemsPerPage}`
      );

      if (response.ok) {
        const data = await response.json();
        setLastPageData(data);
      }
    } catch (error) {
      console.error("Error fetching last page data:", error);
    }
  };

  const currentPageData = isLastPage ? lastPageData.slice(-10) : lastPageData;

  return (
    <div className="body3"><br />
      <h1 className="text-center fw-bold">Using Only TanStack Table</h1>
      <br />
      {isLoading ? (
        <div className="text-center loading">Loading...</div>
      ) : isError ? (
        <div className="text-center error">Error loading data</div>
      ) : (
        (isLastPage || currentPageData.length > 0) && (
          <BasicTable data={currentPageData} columns={Columns} />
        )
      )}
      <div className="button-container">
        <button
          className="btn btn-primary m-1"
          disabled={pageIndex === 1}
          onClick={() => {
            setPageIndex(1);
            setIsLastPage(false);
          }}
        >
          First page
        </button>
        <button
          className="btn btn-primary m-1"
          disabled={pageIndex === 1}
          onClick={handlePreviousPage}
        >
          Previous page
        </button>
        <button
          className="btn btn-primary m-1"
          disabled={isLastPage}
          onClick={GoToNextPage}
        >
          Next page
        </button>
        <button
          className="btn btn-primary m-1"
          disabled={isLastPage}
          onClick={goToLastPage}
        >
          Last page
        </button>
      </div>
    </div>
  );
}

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

export default Table;
