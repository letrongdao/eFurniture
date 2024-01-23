import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';

export default function LoginWithUsername() {
    const [loginData, setLoginData] = useState([])
    const [loginUser, setLoginUser] = useState(null)
    const navigate = useNavigate()

    const fetchData = async () => {
        await fetch('http://localhost:8081/accounts')
            .then(res => res.json())
            .then(data => {
                console.log("Account list: ", data)
                setLoginData(data)
            })
            .catch(err => console.log(err))
    }

    const formik = useFormik({
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
        onSubmit: values => {
            fetchData()
            if (loginData) {
                setLoginUser(loginData.find(({ username, password }) =>
                    ((username == values.username) && (password == values.password)))
                )
            }
            if (loginUser) {
                console.log("Welcome " + loginUser.firstName)
                toast.success("Login successfully. Welcome " + loginUser.firstName)
                navigate('/')
            }
            else {
                toast.error("Incorrect credentials. Please try again !")
            }
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="loginInput">Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                </div>
                <div className="mb-3 password-input-container">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </div>
                <Link to={"/forgot"} className="forgot">
                    Forgot password?
                </Link>
                <br />
                <button type="submit">Login</button>
            </form>
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
    )
}
