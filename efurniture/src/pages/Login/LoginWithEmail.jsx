import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "./firebase/auth";

export default function LoginWithEmail() {
    const [loginData, setLoginData] = useState([])
    const [loginEmail, setLoginEmail] = useState("")
    const navigate = useNavigate()

    const actionCodeSettings = {
        url: 'https://localhost:5173',
        handleCodeInApp: true,
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'efurniture.page.link'
    };

    useEffect(() => {
        fetch('http://localhost:8081/accounts')
            .then(res => res.json())
            .then(data => {
                console.log("Account list: ", data)
                setLoginData(data)
            })
            .catch(err => console.log(err))
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required('Required')
        }),
        onSubmit: (values) => {
            loginData.map((data) => {
                if (data.email === values.email) {
                    setLoginEmail(data.email)
                    toast.success("Welcome " + data.firstName + ". Please check your email.")
                    console.log(loginEmail)
                    sendSignInLinkToEmail(auth, loginEmail, actionCodeSettings)
                        .then(() => {
                            // The link was successfully sent. Inform the user.
                            // Save the email locally so you don't need to ask the user for it again
                            // if they open the link on the same device.
                            console.log("Successfully sent verification mail")
                            window.localStorage.setItem('emailForSignIn', loginEmail);
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode + ": " + errorMessage)
                        });
                } else {
                    toast.error("Incorrect email. Please try again")
                }
            })
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="loginInput">Email:</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                </div>
                <Link to={"/signup"} className="forgot">
                    Sign up
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
