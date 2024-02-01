import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.css"
import { Tabs } from 'antd';
import LoginWithUsername from "./LoginWithUsername";
import LoginWithEmail from "./LoginWithEmail";

function LoginPage() {
  const items = [
    {
      key: '1',
      label: 'Login with username',
      children: <LoginWithUsername />,
    },
    {
      key: '2',
      label: 'Login with email',
      children: <LoginWithEmail />,
    },
  ];

  return (
    <div className="login">
      <div className="login-container">
        <div className="row">
          <div className="login_form">
            <h2>LOGIN</h2>
            <Tabs centered defaultActiveKey="1" items={items} />
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
