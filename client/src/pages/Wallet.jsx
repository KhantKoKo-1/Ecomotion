import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/wallet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Wallet = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [card, setCard] = useState([]);
  const [username, setUsername] = useState("User");
  const [balance, setBalance] = useState("User");

  const [formattedNumber, setformattedNumber] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/get/card" //we need to add login user id
        );
        // console.log(response.data)
        const cardData = response.data[0];
        setCard(response.data);

        let formattedValue = "";
        for (let i = 0; i < cardData.card_number.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedValue += " "; // Append a space after every 4 characters
          }
          formattedValue += cardData.card_number[i];
        }
        setformattedNumber(formattedValue);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // for Success Message
    const handleSuccess = (message) => {
      if (message === "add_success") {
        toast.success("Adding Card Success!");
      } else if (message === "update_success") {
        toast.success("Update Card Success!");
      }
      setIsModalOpen(false);
    };
    handleSuccess(message); // Replace this with your logic to set the 'message' variable
    return () => {
      toast.dismiss(); // Dismiss any existing toast notifications when the component is unmounted
    };
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/delete/card/${card[0].id}`
        );
        toast.success("Delete Card Success!");
        setCard([]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsModalOpen(false);
  };

  const handleClickTP = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const balanceChange = (e) => {
    const value = e.target.value;
    setBalance(value);
  };

  const handlesubmitModel = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3001/api/topup/card/${card[0].id}`,
          {
            balance,
          }
        );
        toast.success("Top Up Success!");
        setBalance("");
        setCard([response.data]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container">
        <div>
          <ToastContainer />
        </div>
        <main className="app-screen">
          <header className="app-header">
            <div>
              <h2>Hello {username}</h2>
            </div>
          </header>
          {card.length !== 0 ? (
            <>
              <section className="app-card-balance">
                <span>Balance: ${card[0].balance}</span>
              </section>
              <section
                onClick={() => (window.location.href = "/credit_card_form")}
                className="app-card-wrapper">
                <p>Mycredit</p>
                <div className="card">
                  <h3>{formattedNumber}</h3>
                  <div className="card-date">
                    <p>
                      Expires Date
                      <br />
                      {card[0].exp_month}||{card[0].exp_year}
                    </p>
                    <span>{card[0].cvv}</span>
                  </div>
                  <div className="card-details">
                    <p>{card[0].cardholder_name}</p>
                    <span className="card-logo"></span>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section onKeyUpCapture={"hello"}>Nothing Card</section>
          )}

          <section className="app-upcoming-payments-wrapper">
            <span>Add new credit card</span>
            <div className="upcoming-payments">
              <div>
                <Link to="/credit_card_form">+</Link>
              </div>
            </div>
          </section>

          {card.length !== 0 ? (
            <button className="button button1" onClick={handleClickTP}>
              Top up
            </button>
          ) : null}

          {card.length === 0 ? null : (
            <div>
              <button
                className="button button2"
                onClick={(e) => handleDelete(e)}>
                Delete
              </button>
            </div>
          )}
        </main>

        {isModalOpen && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h3>Payment</h3>
              <form>
                <label>Enter amount to top up</label>
                <input type="number" value={balance} onChange={balanceChange} />
                <div className="dialog-buttons">
                  <button onClick={handlesubmitModel} type="submit">
                    Confirm
                  </button>
                  <button onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wallet;
