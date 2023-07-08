import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../styles/invoice.css";
import {
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
} from "react-icons/fa";
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
      borderTop: "1px solid #ddd",
      padding: "10px",
      textAlign: "right",
      color: "white",
      backgroundColor: "rgb(56, 56, 56)",
      icons: "white",
    },
  },
};

const Invoice = () => {
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => {
        const date = new Date(row.date);
        return date
          .toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, ".");
      },
    },
    {
      name: "Cost",
      selector: (row) => `$${row.cost}`,
    },
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/get/1" //we need to add login user id
      );
      if (response.data === "fail") {
        console.log(response.data);
      } else {
        setRecord(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [records, setRecord] = useState([]);

  const handleFilter = (e) => {
    const newData = records.filter((row) => {
      console.log(row.date.toLowerCase().toString());
      return row.date
        .toLowerCase()
        .toString()
        .includes(e.target.value.toLowerCase());
    });
    setRecord(newData);
    if (e.target.value === "") fetchData();
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
  const bottomStyle = {
    backgroundColor: "rgb(56, 56, 56)",
    color: "green",
    padding: "10px",
    fontSize: "15px",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/create-payment-intent", {
        amount: 2000,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        toast.error("Payment Error!", {
          autoClose: 2000,
        });
      });
  };
  return (
    <div
      style={{
        padding: "40px 25%",
        margin: "10vh",
      }}>
      <div style={titleStyle}>
        <h1>Invoices</h1>
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
        fixedheader={true}
        responsive="true"
        customStyles={customStyles}
        fixedHeader={true}
        fixedHeaderScrollHeight="55vh"
        pagination
        paginationIconPrevious={<FaChevronLeft color="white" />}
        paginationIconFirstPage={<FaAngleDoubleLeft color="white" />}
        paginationIconNext={<FaChevronRight color="white" />}
        paginationIconLastPage={<FaAngleDoubleRight color="white" />}
      />
      <div style={bottomStyle}>
        <button
          onClick={handleOnClick}
          style={{
            color: "white",
            backgroundColor: "green",
            borderRadius: "40px",
          }}>
          On click
        </button>
      </div>
    </div>
  );
};

export default Invoice;
