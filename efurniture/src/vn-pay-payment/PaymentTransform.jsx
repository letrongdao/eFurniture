import React, { useState, useEffect } from 'react';

const VnPayResult = () => {
    const [paymentResult, setPaymentResult] = useState(null);

    useEffect(() => {
        // Đây là nơi bạn sẽ lấy dữ liệu về kết quả thanh toán từ backend của bạn, có thể thông qua API hoặc webhook.
        // Trong ví dụ này, tôi sẽ giả định dữ liệu được trả về từ backend là một object chứa thông tin kết quả thanh toán.
        // Bạn cần thay đổi phần này để phù hợp với cách bạn tích hợp với backend của mình.
        const mockPaymentResult = {
            orderId: '123456',
            amount: 100000, // Số tiền thanh toán
            status: 'success', // Trạng thái thanh toán
            message: 'Payment successful', // Thông điệp
            // Thêm các thông tin khác nếu cần
        };

        // Cập nhật kết quả thanh toán vào state
        setPaymentResult(mockPaymentResult);
    }, []);

    return (
        <div>
            {paymentResult ? (
                <div>
                    <h2>Payment Result</h2>
                    <p><strong>Order ID:</strong> {paymentResult.orderId}</p>
                    <p><strong>Amount:</strong> {paymentResult.amount}</p>
                    <p><strong>Status:</strong> {paymentResult.status}</p>
                    <p><strong>Message:</strong> {paymentResult.message}</p>
                    {/* Hiển thị các thông tin khác nếu cần */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VnPayResult;