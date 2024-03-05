import React, { useEffect } from 'react';

const PaymentTransform = () => {
  useEffect(() => {
    // Function to submit payment form
    const submitPaymentForm = () => {
      // Create a form element
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
      form.setAttribute('target', '_blank'); // Open in a new tab

      // Add input fields for payment data
      const fields = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        // Add other payment data here
      };

      // Append input fields to the form
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', value);
        form.appendChild(input);
      });

      // Append the form to the body and submit
      document.body.appendChild(form);
      form.submit();

      // Clean up: remove the form from the DOM
      document.body.removeChild(form);
    };

    // Call the function to submit payment form
    submitPaymentForm();
  }, []);

  return (
    <div>
      <h2>Redirecting to Payment...</h2>
      {/* Add loading indicator or message here */}
    </div>
  );
};

export default PaymentTransform;