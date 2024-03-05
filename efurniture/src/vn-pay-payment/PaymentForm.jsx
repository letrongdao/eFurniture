import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const handlePayment = async () => {
    try {
        await axios.post('http://localhost:3344/create_payment_url', {
        amount: 100000, // Thay bằng giá trị thực tế
        bankCode: 'VNBANK', // Thay bằng mã ngân hàng thực tế nếu có
        language: 'vn', // Thay đổi ngôn ngữ nếu cần
        orderDescription: 'Mô tả đơn hàng',
        orderType: 'billpayment', // Loại đơn hàng (nếu có)
      }).then(res => {
        console.log(res)
        const responseData = res.data.vnpUrl;
        window.location.href = responseData;
      }).catch(error => console.log(error))

        // Redirect đến URL tạo được
        
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Thanh Toán</h2>
      <button onClick={handlePayment}>Thanh Toán</button>
    </div>
  );
}

export default PaymentForm;