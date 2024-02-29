import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [language, setLanguage] = useState('vn');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('/payments', {
        amount: amount,
        bankCode: bankCode,
        language: language,
      });
      const { paymentUrl } = response.data;
      setPaymentUrl(paymentUrl);
      window.location.href = paymentUrl; // Chuyển hướng đến trang thanh toán VNPay
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Thanh Toán</h2>
      <div>
        <label htmlFor="amount">Số Tiền:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Chọn Phương Thức Thanh Toán:</label>
        <select value={bankCode} onChange={(e) => setBankCode(e.target.value)}>
          <option value="">Cổng thanh toán VNPAYQR</option>
          <option value="VNPAYQR">Thanh toán qua ứng dụng hỗ trợ VNPAYQR</option>
          <option value="VNBANK">Thanh toán qua ATM-Tài khoản ngân hàng nội địa</option>
          <option value="INTCARD">Thanh toán qua thẻ quốc tế</option>
        </select>
      </div>
      <div>
        <label>Ngôn Ngữ:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="vn">Tiếng Việt</option>
          <option value="en">Tiếng Anh</option>
        </select>
      </div>
      <button onClick={handlePayment}>Thanh Toán</button>
      {paymentUrl && (
        <div>
          <p>Đang chuyển hướng đến trang thanh toán...</p>
          {/* Có thể hiển thị thông báo chờ */}
        </div>
      )}
    </div>
  );
}

export default PaymentForm;