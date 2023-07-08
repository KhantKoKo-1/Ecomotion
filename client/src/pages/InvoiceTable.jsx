import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
} from "react-icons/fa";
import "../styles/customDataTable.css";

const customStyles = {
  title: {
    style: {
      backgroundColor: "red",
    },
  },
  headRow: {
    style: {
      backgroundColor: "rgb(56, 56, 56)",
      color: "green",
    },
  },
  headCells: {
    style: {
      fontSize: "20px",
      fontWeight: "700",
      textTransform: "uppercase",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      color: "white",
      backgroundColor: "rgb(56, 56, 56)",
    },
  },

  pagination: {
    style: {
      padding: "10px",
      textAlign: "right",
      color: "white",
      backgroundColor: "rgb(56, 56, 56)",
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
    },
  },
};
const titleStyle = {
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "rgb(56, 56, 56)",
  color: "white",
  padding: "10px",
  fontSize: "8px",
  borderTopLeftRadius: "30px",
  borderTopRightRadius: "30px",
};

const InvoiceTable = () => {
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Cost",
      selector: (row) => row.cost,
    },
    {
      name: "Stripe Secret Key",
      selector: (row) => row.stripe_client_secret,
    },
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get/1");
      setRecords(response.data);
      console.log("records", records);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [records, setRecords] = useState([]);
  const handleFilter = (e) => {
    const newData = records.filter((row) => {
      console.log(row.date.toLowerCase().toString());
      return row.date
        .toLowerCase()
        .toString()
        .includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
    if (e.target.value === "") fetchData();
  };

  return (
    <>
      <div className="custom-data-table">
        <div style={titleStyle}>
          <h1>Customer invoices</h1>
          <div className="sb-example-1">
            <div className="Search with Date">
              <input
                type="text"
                onChange={handleFilter}
                className="searchTerm"
                placeholder="Serach"
              />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={records}
          fixedHeader={true}
          responsive={true}
          theme="custom"
          fixedHeaderScrollHeight="55vh"
          customStyles={customStyles}
          pagination
          paginationIconPrevious={<FaChevronLeft color="white" />}
          paginationIconFirstPage={<FaAngleDoubleLeft color="white" />}
          paginationIconNext={<FaChevronRight color="white" />}
          paginationIconLastPage={<FaAngleDoubleRight color="white" />}
        />
      </div>
    </>
  );
};

export default InvoiceTable;
