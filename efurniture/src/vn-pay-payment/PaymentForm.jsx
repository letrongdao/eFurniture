import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [amount, setAmount] = useState(''); // State để lưu trữ giá trị của input amount
  const [bankCode, setBankCode] = useState(''); // State để lưu trữ mã ngân hàng
  const [language, setLanguage] = useState('vn'); // State để lưu trữ ngôn ngữ

  const handlePayment = async () => {
    try {
        await axios.post('http://localhost:3344/create_payment_url', {
        amount: amount, // Thay bằng giá trị thực tế
        bankCode: bankCode, // Thay bằng mã ngân hàng thực tế nếu có
        language: language, // Thay đổi ngôn ngữ nếu cần
        orderDescription: 'Mô tả đơn hàng',
        orderType: 'billpayment', // Loại đơn hàng (nếu có)
      }).then(res => {
        console.log(res)
        const responseData = res.data.vnpUrl;
        // Redirect đến URL tạo được
        window.location.href = responseData;
      }).catch(error => console.log(error))              
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
    <h3>title</h3>
    <div class="table-responsive">
        <form action="create_payment_url" method="POST" id="createOrder">
            <div class="form-group">
                <label for="amount">Số tiền</label>
                <input type="text" class="form-control" id="amount" name="amount" placeholder="Số tiền" value={amount} 
                      onChange={(e) => setAmount(e.target.value)}/>
            </div>  

            <div class="form-group">
                <label>Chọn Phương thức thanh toán:</label>
                <div class="controls">
                    <label class="radio-inline">
                        <input type="radio" name="bankCode" id="defaultPaymentMethod" value="" checked="true"/> Cổng thanh toán VNPAYQR
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="bankCode" id="vnpayqrPaymentMethod" value="VNPAYQR"/> Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="bankCode" id="vnbankPaymentMethod" value="VNBANK"
                            checked={bankCode === 'VNBANK'} onChange={() => setBankCode('VNBANK')}/> Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="bankCode" id="intcardPaymentMethod" value="INTCARD"/> Thanh toán qua thẻ quốc tế
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="language">Ngôn ngữ</label>
                <div class="controls">
                    <label class="radio-inline">
                        <input type="radio" name="language" id="vnLanguage" value="vn" checked="true" 
                            onChange={() => setLanguage('vn')}/> Tiếng việt
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="language" id="enLanguage" value="en"/> Tiếng anh
                    </label>
                </div>
            </div>

            <button type="submit" class="btn btn-default" id="btnPopup" onClick={handlePayment}>Thanh toán</button>
        </form>
    </div>
</div>
  );
}

export default PaymentForm;