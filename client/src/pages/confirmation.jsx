import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import '../styles/confirmation.css';

const Confirmform = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handletest = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className={`modalbox success ${isVisible ? '' : 'hidden'}`}>
            <div className="icon">
              <FontAwesomeIcon icon={faCheck} size="4x" />
            </div>
            <h1>Payment Success!</h1>
            <p>We've sent a confirmation to your e-mail for verification.</p>
            <button type="button" className="redo btn">
              Ok
            </button>
          </div>
        </div>
        <div className="row">
          <div className={`modalbox error ${isVisible ? 'hidden' : ''}`}>
            <div className="icon">
            <FontAwesomeIcon icon={faThumbsDown} size="4x" />
            </div>
            <h1>Oh no!</h1>
            <p>Oops! Something went wrong, you should try again.</p>
            <button type="button" className="redo btn" onClick={handletest}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmform;
