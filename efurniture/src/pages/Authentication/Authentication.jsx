import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider, Typography } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from "react-router-dom";
import generateId from "../../assistants/GenerateId.js";
import dateFormat from "../../assistants/date.format.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from "axios";

export default function Authentication() {
  const [isLoginPage, setIsLoginPage] = useState(true)
  const navigate = useNavigate()
  const { Text } = Typography;

  const switchPage = () => {
    setIsLoginPage(!isLoginPage)
  }

  const onGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse)
  }

  const onGoogleError = (err) => {
    console.log("Failed to login with Google: ", err.message)
  }

  const loginForm = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Please enter your username !'),
      password: Yup.string()
        .max(20, 'Password must be less than 20 characters')
        .required('Password is required !'),
    }),
    onSubmit: async (values) => {
      await fetch('http://localhost:3344/users')
        .then(res => res.json())
        .then(data => {
          console.log("List of accounts:", data)
          var loginUser = null
          data.map((account) => {
            if (account.username === values.username && account.password === values.password)
              loginUser = account
          })
          if (loginUser) {
            console.log("Welcome " + loginUser.fullName)
            toast.success("Login successfully. Welcome " + loginUser.fullName)
            navigate('/')
          }
          else {
            toast.error("Incorrect credentials. Please try again.")
          }
        })
        .catch(err => console.log(err))
    }
  })

  const signupForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
      fullName: '',
      email: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(5, "Username must contains within 5-18 letters").max(18, "Username must contains within 5-18 letters").required("Please enter the username"),
      password: Yup.string().min(5, "Password must contains within 5-18 letters").max(18, "Password must contains within 5-18 letters").required("Please enter the password"),
      confirm: Yup.string().test('passwords-match', 'Passwords does not match', function (value) { return this.parent.password === value }),
      fullName: Yup.string().required("Please enter the name"),
      email: Yup.string().email("Invalid email address").required('Please enter your email')
    }),

    onSubmit: async (values) => {
      const id = generateId(15, "user")
      const now = new Date()
      const createDate = dateFormat(now, "yyyy-mm-dd HH:MM:ss")
      await axios.post('/users/', {
        userId: id,
        username: values.username,
        password: values.password,
        roleId: "US",
        fullName: values.fullName,
        phoneNumber: "",
        email: values.email,
        status: true,
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  })

  return (
    <div className="container">
      <div className="left-container">
        <Image src="https://www.ieltsvietop.vn/wp-content/uploads/2023/08/Furniture-la-gi.jpg" width={500} preview={false} />
      </div>

      <div className="right-container row">
        <Image className="image" src="https://efurniturerepurposing.com.au/wp-content/uploads/2023/12/efurniture-logo.png" width={200} preview={false} />
        {isLoginPage ?

          //LOGIN PAGE
          <>
            <form onSubmit={loginForm.handleSubmit}>
              <div className="mb-2 mt-2">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  value={loginForm.values.username}
                />
              </div>
              <div className="mb-2 password-input-container">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  value={loginForm.values.password}
                />
              </div>

              <Link to={"/forgot"} className="forgot">
                Forgot password?
              </Link>
              <br />
              <Button type="primary" htmlType="submit">Login</Button>
            </form>
            <Divider><Text italic>or</Text></Divider>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
            />
            <br />
            <div className="form-footer">
              <p>Don't have an account yet?&nbsp;</p>
              <a onClick={switchPage}>Sign up</a>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </>
          :

          //SIGNUP PAGE
          <>
            <form onSubmit={signupForm.handleSubmit}>
              <div className="mb-2 mt-2">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.username}
                />
                <div className="error">
                  {signupForm.touched.username && signupForm.errors.username ? (
                    <i>{signupForm.errors.username}</i>
                  ) : null}
                </div>
              </div>
              <div className="mb-2 mt-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.password}
                />
                <div className="error">
                  {signupForm.touched.password && signupForm.errors.password ? (
                    <i>{signupForm.errors.password}</i>
                  ) : null}
                </div>
              </div>
              <div className="mb-2 mt-2">
                <input
                  type="password"
                  name="confirm"
                  placeholder="Confirm password"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.confirm}
                />
                <div className="error">
                  {signupForm.touched.confirm && signupForm.errors.confirm ? (
                    <i>{signupForm.errors.confirm}</i>
                  ) : null}
                </div>
              </div>
              <div className="mb-2 mt-2">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.fullName}
                />
                <div className="error">
                  {signupForm.touched.fullName && signupForm.errors.fullName ? (
                    <i>{signupForm.errors.fullName}</i>
                  ) : null}
                </div>
              </div>
              <div className="mb-2 mt-2">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={signupForm.handleChange}
                  onBlur={signupForm.handleBlur}
                  value={signupForm.values.email}
                />
                <div className="error">
                  {signupForm.touched.email && signupForm.errors.email ? (
                    <i>{signupForm.errors.email}</i>
                  ) : null}
                </div>
              </div>
              <br />
              <Button type="primary" htmlType="submit">Sign up</Button>
            </form>
            <br />
            <div className="form-footer">
              <p>Already have account?&nbsp;</p>
              <a onClick={switchPage}>Sign in</a>
            </div>
          </>
        }
      </div>
    </div>
  )
}
