// this is for staff
import { useState } from 'react';
import '../styles/wallet_form.css';
import { AiFillIdcard, AiOutlineKey, AiTwotoneCalendar } from "react-icons/ai";
const WalletForm = () => {
  const [users, setUsers] = useState([]);
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [CVC, setCVC] = useState('');
  const [selectedUser, setSelectedUser] = useState([]);
  const handleCardNameChange = (e) => {
    const value = e.target.value;
    setCardHolderName(value);
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);

  };

  const handleCardMmChange = (e) => {
    const value = e.target.value;
    setCardMonth(value);
  };

  const handleCardYyChange = (e) => {
    const value = e.target.value;
    setCardYear(value);
  };

  const handleCardcvcchange = (e) => {
    setCVC(e.target.value);
  }

  const handleSelectChange = (e) => {
    setSelectedUser(e.target.value);
  };
  
  // useEffect(() => {
  //   axios.get('https://api.example.com/users')
  //     .then(response => {
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  const iconStyle = {
    color: '#7ce010',
    fontSize: '28px',
    // Add other CSS properties as needed
  };
  return (

    <>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Card Form</h2>
          </div>
          <div className="row clearfix">
            <div >
              <form>
                <div className="input_field select_option">
                  <select value={selectedUser} onChange={handleSelectChange} className={selectedUser ? '' : 'placeholder'}>
                    <option value="" disabled hidden>
                      Select A User
                    </option>
                    {/* before use api */}
                    <option value="">option 1</option>
                    {/* after use api  */}
                    {/* {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))
                    } */}
                  </select>
                  <div className="select_arrow"></div>
                </div>
                {/* AiOutlineUser */}
                <div className="input_field">
                  <span style={iconStyle}>
                    <AiFillIdcard />
                  </span>
                  <input type="text" maxLength="30" placeholder="Your Name" value={cardHolderName} onChange={handleCardNameChange} required />
                </div>
                <div className="input_field">
                  <span style={iconStyle}>
                    <AiFillIdcard />
                  </span>
                  <input type="text" maxLength="16" placeholder="0000000000000000" value={cardNumber} onChange={handleCardNumberChange} required />
                </div>
                <div className="row clearfix">
                  <div className="col_half">
                    <div className="input_field">
                      <span style={iconStyle}>
                        <AiTwotoneCalendar />
                      </span>
                      <input type="text" maxLength="2" placeholder="00" value={cardMonth} onChange={handleCardMmChange} required />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      <span style={iconStyle}>
                        <AiTwotoneCalendar />
                      </span>
                      <input type="text" maxLength="2" placeholder="00" value={cardYear} onChange={handleCardYyChange} required />
                    </div>
                  </div>
                </div>
                <div className="input_field">
                  <span style={iconStyle}>
                    <AiOutlineKey />
                  </span>
                  <input type="text" maxLength="3" placeholder="000" value={CVC} onChange={handleCardcvcchange} required />
                </div>
                <input className="button_submit" type="submit" value="ADD" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WalletForm;
