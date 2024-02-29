import React from 'react';

function PaymentResult({ code }) {
  return (
    <div>
      {code === '00' ? (
        <p style={{ textAlign: 'center' }}>GD thành công</p>
      ) : (
        <p style={{ textAlign: 'center', color: 'red' }}>GD thất bại</p>
      )}
      <p style={{ textAlign: 'center' }}>
        <a className="btn btn-default" href="/order">Về danh sách</a>
      </p>
    </div>
  );
}

export default PaymentResult;