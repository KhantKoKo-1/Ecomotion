import React, { useState, useRef, useEffect } from 'react';
import '../styles/credit_card.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// changed
const CreditCard = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [CVC, setCVC] = useState('');
  const [formattedNumber, setformattedNumber] = useState('')
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);
  const [card, setCard] = useState([]);
  // const [errorMessage,setErrorMessage] = useState();
  const handleAddSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/post/card', {
      cardHolderName,
      cardNumber,
      cardMonth, cardYear,
      CVC
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data == "success") {
          window.location.href = "/wallet?message=add_success";
        } else {
          toast.error("Please fill in all fields!", {
            autoClose: 2000, // Set the timeout in milliseconds (e.g., 3000 = 3 seconds)
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:3001/api/update/card/${card[0].id}`, {
      cardHolderName,
      cardNumber,
      cardMonth, cardYear,
      CVC
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data == 'success') {
          window.location.href = '/wallet?message=update_success';
        }
        toast.error('Error!', {
          autoClose: 2000 // Set the timeout in milliseconds (e.g., 3000 = 3 seconds)
        });
      })
      
      .catch(function (error) {
       
        console.log('error',error);
      
      });
  };

  //get all data for update  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/get/card" //we need to add login user id
        );

        setCard(response.data)
        const cardData = response.data[0];
        setCardHolderName(cardData.cardholder_name);
        setCardNumber(cardData.card_number);
        setCardMonth(cardData.exp_month);
        setCardYear(cardData.exp_year);
        setCVC(cardData.cvv);

        let formattedValue = '';
        for (let i = 0; i < cardData.card_number.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedValue += ' '; // Append a space after every 4 characters
          }
          formattedValue += cardData.card_number[i];
        }
        setformattedNumber(formattedValue)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log('cardind', card)
  }, []);

  const handleCardNameChange = (e) => {
    const value = e.target.value;
    setCardHolderName(value);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' '; // Append a space after every 4 characters
      }
      formattedValue += value[i];
    }
    setCardNumber(value);
    setformattedNumber(formattedValue)
  };

  const handleCardMmChange = (e) => {
    const value = e.target.value;
    setCardMonth(value);
  };

  const handleCardYyChange = (e) => {
    const value = e.target.value;
    setCardYear(value);
  };

  //   rotation 
  const handleCardSwitch = (type) => {
    if (type === 'enter') {
      frontCardRef.current.style.transform = "perspective(1000px) rotateY(-180deg)";
      backCardRef.current.style.transform = "perspective(1000px) rotateY(0deg)";
    } else {
      frontCardRef.current.style.transform = "perspective(1000px) rotateY(0deg)";
      backCardRef.current.style.transform = "perspective(1000px) rotateY(180deg)";
    }
  }

  const handleCardcvcchange = (e) => {
    setCVC(e.target.value);
  }

  return (
    <div className="cc__main__container">
      <div className="form__container">
        <h1 className="header">
          {card.length !== 0 ? 'Update Credit Card Information' : 'New Credit Card Information'}
        </h1>
        <ToastContainer />
        <div className="card__main">

          <div className="Front_card" ref={frontCardRef}>
            <div className="top_card">
              <span className="visa"></span>
              <div className="logo">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="middle_card">

              <span className="chip"></span>

              <div className="card_number">{cardHolderName}</div>
            </div>
            <div className="bottom_card">
              <div className="card_info">
                <div className="card_holder_name">{formattedNumber}</div>
              </div>
              <div className="card_info">
                <div className="card_holder_info">
                  <span className="expire_month">{cardMonth}</span>
                  <span>/</span>
                  <span className="expire_year">{cardYear}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="back_card" ref={backCardRef}>
            <div className="top_card">
              <span className="black_strip"></span>
              <div className="cvc_strip">
                <span className="cvc_number">{CVC}</span>
              </div>
            </div>
            <div className="bottom_card">
              <div className="flex">
                <span className="sticker"></span>
                <div className="logo1">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form >
          <div className="inputBox">
            <span>card holder name</span>
            <input type="text" maxLength="30" className="card-holder-input" placeholder="Your Name" value={cardHolderName} onChange={handleCardNameChange} required/>

          </div>
          <div className="inputBox">
            <span>card number</span>
            <input type="text" maxLength="16" className="card-number-input" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={handleCardNumberChange} required/>
          </div>

          <div className="multi__box">
            <div className="inputBox">
              <span>exp. (MM)</span>
              <input type="text" maxLength="2" className="card-month-input" placeholder="00" value={cardMonth} onChange={handleCardMmChange} required/>
            </div>
            <div className="inputBox">
              <span>exp. (YY)</span>
               <input type="text" maxLength="2" className="card-month-input" placeholder="00" value={cardMonth} onChange={handleCardMmChange} required/>
            </div>
            <div className="inputBox">
              <span>CVC</span>
              <input type="text" maxLength="3" className="card-cvc-input" placeholder="000" value={CVC} onChange={handleCardcvcchange} onMouseEnter={() => handleCardSwitch('enter')} onMouseLeave={handleCardSwitch} required/>
            </div>
          </div>
          <br />
          <div className="wrap">
            {card.length === 0 ? (
              <button className="button3" onClick={(e) => handleAddSubmit(e)}>Add</button>
            ) : (
              <button className="button3" onClick={(e) => handleUpdateSubmit(e)}>Update</button>
            )}


          </div>

        </form>
      </div>
    </div>
  );
};

export default CreditCard;
