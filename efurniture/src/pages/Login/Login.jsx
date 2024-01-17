// import React, { useState, useRef } from "react";
// import "./Login.scss";
// import { Login, Register } from "../../components/Login/index";

// const LoginPage = () => {
//   const [isLogginActive, setIsLogginActive] = useState(true);
//   const container = useRef();
//   const current = useRef();
//   const rightSide = useRef();

//   const changeState = () => {
//     if (isLogginActive) {
//       rightSide.current.classList.remove("right");
//       rightSide.current.classList.add("left");
//     } else {
//       rightSide.current.classList.remove("left");
//       rightSide.current.classList.add("right");
//     }
//     setIsLogginActive(!isLogginActive);
//   };

//   return (
//     <div className="login-form">
//       <div className="login">
//         <div className="container" ref={container}>
//           {isLogginActive && <Login containerRef={current} />}
//           {!isLogginActive && <Register containerRef={current} />}
//         </div>
//         <RightSide
//           current={isLogginActive ? "Register" : "Login"}
//           currentActive={isLogginActive ? "login" : "register"}
//           containerRef={rightSide}
//           onClick={changeState}
//         />
//       </div>
//     </div>
//   );
// };

// const RightSide = ({ current, currentActive, containerRef, onClick }) => {
//   return (
//     <div className="right-side" ref={containerRef} onClick={onClick}>
//       <div className="inner-container">
//         <div className="text">{current}</div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { UserServices } from "../services/userServices";
// import { actUserLogin } from "../store/user/action";

// import "./Login.scss";
import "../Login/Login.scss"
import { useEffect } from "react";

function LoginPage({ setIsSidebarOpen }) {
  // const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState(null);
  // const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // useEffect(() => {
  //   setIsSidebarOpen(false);
  // }, []);
  // const dispatch = useDispatch();
  // const handleSubmit = (event) => {
  //   setTimeout(() => {
  //     setIsSidebarOpen(true);
  //   }, 600);

  //   event.preventDefault();
  //   UserServices.loginUser(formData)
  //     .then((resFetchMe) => {
  //       const token = resFetchMe.data.token;
  //       const currentUser = resFetchMe.data.userInfo;
  //       const role = resFetchMe.data.role;
  //       UserServices.fetchMe(token)
  //         .then((res) => {
  //           dispatch(actUserLogin(currentUser, token, role));
  //           toast.success(
  //             `Bạn đã đăng nhập với role ${role}. Chào mừng đã vào cổng`
  //           );
  //           navigate("/");
  //         })
  //         .catch((err) => alert("Login or password failed"));
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         toast.error("Server error:", error.response.data);
  //       } else if (error.request) {
  //         toast.error("Network error:", error.request);
  //       } else {
  //         toast.error("Error:", error.message);
  //       }
  //     });
  // };
  // function handleChange(e) {
  //   const { name, value, type, checked } = e.target;
  //   if (type === "checkbox") {
  //     setFormData({
  //       ...formData,
  //       [name]: checked,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // }

  return (
    <div className="login">
      <div className="login-container">
        <div className="row">
          <div className="login_form">
            <h2>Login</h2>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            <form >
              <div className="mb-3 mt-3">
                <label htmlFor="loginInput">Email or Username:</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email or username here"
                  // value={formData?.email}
                  // onChange={handleChange}
                />
              </div>
              <div className="mb-3 password-input-container">
                <label htmlFor="password">Password:</label>
                <input
                  // type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password here"
                  // value={formData?.password}
                  // onChange={handleChange}
                />
              </div>
              <Link to={"/forgot"} className="forgot">
                Forgot password?
              </Link>
              <br />
              <button type="submit">Login</button>
            </form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
