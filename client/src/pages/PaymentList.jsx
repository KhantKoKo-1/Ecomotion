import { useState, useEffect } from 'react';

export default function PaymentList() {
    const [payments, setPayments] = useState([]);
  
    useEffect(() => {
      fetch('/api/payments')
        .then((response) => response.json())
        .then((data) => setPayments(data))
        .catch((error) => console.error('Error fetching payments:', error));
    }, []);
  
    return (
      <div>
        <h2>Payments</h2>
        {payments.map((payment) => (
          <div key={payment.id}>
            <p>Payment ID: {payment.id}</p>
            <p>Payment Method: {payment.paymentMethod}</p>
            <p>Payment Info: {payment.paymentInfo}</p>
          </div>
        ))}
      </div>
    );
  };