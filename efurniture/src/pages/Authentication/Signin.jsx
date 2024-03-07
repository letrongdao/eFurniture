import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'
import { Button, Image, Divider, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'
import { generateId, generatePassword } from '../../assistants/Generators'
import dateFormat from "../../assistants/date.format";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const { Text } = Typography;
  const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

  useEffect(() => {
    if (location.state) {
      if (location.state?.noti === "signup") {
        toast.warning("Your email has been registered before. Please enter your password to sign in.")
      }
      if (location.state?.noti === "reset") {
        toast.success("Your password has been successfully reset.")
      }
      if (location.state?.noti === "create") {
        toast.success("Your account has been successfully signed up. Please login to continue.")
      }
    }
  }, [])

  const onGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true)
    var decoded
    if (credentialResponse.credential) {
      decoded = jwtDecode(credentialResponse.credential)
      console.log("SIGNIN SUCCESSFULLY. Google login user's email:", decoded.email)

      await fetch("http://localhost:3344/users")
        .then(res => res.json())
        .then(data => {
          var foundUserByEmail = data.find((account) => (account.email === decoded.email))
          if (foundUserByEmail) {
            sessionStorage.setItem("loginUserId", foundUserByEmail.user_id)
          }
          else {
            const newUserId = generateId(30, '')
            const createAt = dateFormat(new Date, "yyyy/mm/dd HH:MM:ss")
            var registerUser = {
              user_id: newUserId,
              email: decoded.email,
              password: generatePassword(20),
              fullName: decoded.name,
              role_id: "US",
              phone: '',
              create_at: createAt,
              status: true,
              efpoint: 0,
            }
            axios.post("http://localhost:3344/users", registerUser)
              .then(() => {
                console.log("A new account has been created by email ", decoded.email)
              })
              .catch((err) => {
                console.log("Error: ", err.response)
              })
            sessionStorage.setItem("loginUserId", newUserId)
          }
        })
        .catch(err => console.log(err))
      setTimeout(() => {
        setIsLoading(false)
        navigate('/')
      }, 2000)
    } else {
      console.log("Not found data")
    }
  }

  const onGoogleError = (err) => {
    console.log("Failed to login with Google: ", err.message)
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
            sessionStorage.setItem("loginUserId", loginUser.user_id)
            setTimeout(() => {
              setIsLoading(false)
              navigate('/')
            }, 2000)
          } else {
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
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Image src={randomImage} width={400} preview={false} />
      </div>
      <Divider type="vertical" />
      <div className={styles.rightContainer}>
        <Image className={styles.image} src={eFurniLogo} width={250} preview={false} />
        <form onSubmit={loginForm.handleSubmit} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
            />
          </div>
          <Button type="link" className={styles.forgot} onClick={() => { navigate('/forgot') }}>
            Forgot password?
          </Button>
          <Button type="primary" htmlType="submit" shape="round" block disabled={isLoading ? true : false}>
            {isLoading ? <LoadingOutlined /> : <p>Sign in</p>}
          </Button>
        </form>
        <Divider><Text italic style={{ fontSize: "70%" }}>or you can sign in with</Text></Divider>
        <div className={styles.otherLogin}>
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={onGoogleError}
            size="medium"
            type="standard"
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
          limit={1}
        />
        <div className={styles.formFooter}>
          <p>Don't have an account yet?&nbsp;</p>
          <a onClick={() => { navigate('/signup/email') }}>Sign up</a>
        </div>
      </div>
    </div>
  )
}
