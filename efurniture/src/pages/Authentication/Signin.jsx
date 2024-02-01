import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '../../assets/icons/facebook.png'

export default function Signin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { Text } = Typography;
  const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      toast.warning("Your email has been registered before. Please enter your password to sign in.")
    }
  }, [])


  const onGoogleSuccess = (credentialResponse) => {
    console.log("Google login successfully")
    var decoded = jwtDecode(credentialResponse.credential)
    console.log("Google Login user's data:", decoded)
    navigate('/')
  }

  const onGoogleError = (err) => {
    console.log("Failed to login with Google: ", err.message)
  }

  const responseFacebook = (response) => {
    console.log("ResponseFacebook: ", response)
  }

  const loginForm = useFormik({
    initialValues: {
      email: location.state?.email,
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      await fetch('http://localhost:3344/users')
        .then(res => res.json())
        .then(data => {
          var loginUser = data.find((account) => (account.email === values.email) && (account.password === values.password))
          if (loginUser) {
            setTimeout(() => {
              setIsLoading(false)
            }, 2000)
            setTimeout(() => {
              navigate('/')
            }, 2000)
          }
          else {
            setTimeout(() => {
              setIsLoading(false)
              toast.error("Incorrect credentials. Please try again.")
            }, 1000)
          }
        })
        .catch(err => console.log(err))
    }
  })

  return (
    <div className="container">
      <div className="left-container">
        <Image src={randomImage} width={400} preview={false} />
      </div>
      <Divider type="vertical" />
      <div className="right-container row">
        <Image className="image" src="https://efurniturerepurposing.com.au/wp-content/uploads/2023/12/efurniture-logo.png" width={200} preview={false} />
        <form onSubmit={loginForm.handleSubmit}>
          <div className="mb-2 mt-2">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
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
          <Button type="link" className="forgot" onClick={() => { navigate('/forgot') }}>
            Forgot password?
          </Button>
          <Button type="primary" htmlType="submit" shape="round" size="large" disabled={isLoading ? true : false}>
            {isLoading ? <LoadingOutlined /> : <p>Sign in</p>}
          </Button>
        </form>
        <Divider><Text italic style={{ fontSize: "70%" }}>or you can sign in with</Text></Divider>
        <div className="otherLogin">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={onGoogleError}
            size="large"
            type="icon"
            icon={true}
          />
          <FacebookLogin
            appId="689804996380398"
            autoLoad={true}
            fields="name,email"
            callback={responseFacebook}
            size="small"
            cssClass="my-facebook-button-class"
            textButton=""
            icon={<Image src={FacebookIcon} width={20} preview={false} height={22} />}
          />
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
        <div className="form-footer">
          <p>Don't have an account yet?&nbsp;</p>
          <a onClick={() => { navigate('/signup/email') }}>Sign up</a>
        </div>
      </div>
    </div>
  )
}
