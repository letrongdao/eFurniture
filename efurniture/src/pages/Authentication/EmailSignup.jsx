import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '../../assets/icons/facebook.png'
import { generateId, generatePassword } from "../../assistants/Generators";
import dateFormat from "../../assistants/date.format";
import axios from "axios";
import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'

export default function EmailSignup() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { Text } = Typography;
    const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

    const emailForm = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Please enter your email")
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            await fetch('http://localhost:3344/users')
                .then(res => res.json())
                .then(data => {
                    var foundAccountByEmail = data.find((account) => (account.email === values.email))
                    if (foundAccountByEmail) {
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 2000)
                        setTimeout(() => {
                            navigate('/signin', { state: { noti: "signup", email: values.email } })
                        }, 2000)
                    }
                    else {
                        navigate('/signup', { state: { email: values.email } })
                    }
                })
                .catch(err => console.log(err))
        }
    })

    const onGoogleSuccess = async (credentialResponse) => {
        setIsLoading(true)
        var decoded = jwtDecode(credentialResponse.credential)
        console.log("Google Login user's data:", decoded)
        await fetch("http://localhost:3344/users")
            .then(res => res.json())
            .then(data => {
                var foundUserByEmail = data.find((account) => (account.email === decoded.email))
                if (foundUserByEmail) {
                    navigate('/signin')
                }
                else {
                    const newUserId = generateId(15, "user")
                    const createAt = dateFormat(new Date, "yyyy/mm/dd HH:MM:ss")
                    setRegisterUser({
                        user_id: newUserId,
                        email: decoded.email,
                        password: "unset",
                        fullName: decoded.name,
                        role_id: "US",
                        phone: "unset",
                        createAt: createAt,
                        status: true,
                    })
                    axios.post("http://localhost:3344/register", registerUser)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 2000)
                }
            })
            .catch(err => console.log(err))

    }

    const onGoogleError = (err) => {
        console.log("Failed to login with Google: ", err.message)
    }

    const responseFacebook = async (response) => {
        if (response) {
            console.log("Facebook login credentials: ", response)
            await fetch("http://localhost:3344/users")
                .then(res => res.json())
                .then(data => {
                    var foundUserByEmail = data.find((account) => (account.email === response.email))
                    if (foundUserByEmail) {
                        console.log("Email is already registered.")
                    }
                    else {
                        const newUserId = generateId(15, 'user')
                        const createAt = dateFormat(new Date, "yyyy/mm/dd HH:MM:ss")
                        var registerUser = {
                            user_id: newUserId,
                            email: response.email,
                            password: generatePassword(20),
                            fullName: response.name,
                            role_id: "US",
                            phone: 'unset',
                            create_at: createAt,
                            status: true,
                        }
                        axios.post("http://localhost:3344/users", registerUser)
                            .catch((err) => {
                                console.log("Error: ", err.response.data)
                            })
                        console.log("A new account has been created by Facebook email: ", response.email)
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

    return (
        <div className="container">
            <div className="left-container">
                <Image src={randomImage} width={400} preview={false} />
            </div>
            <Divider type="vertical" />
            <div className="right-container row">
                <Image className="image" src={eFurniLogo} width={250} preview={false} />
                <form onSubmit={emailForm.handleSubmit}>
                    <div className="mb-2 mt-2">
                        <br />
                        <h6 style={{ textAlign: "start" }}>Enter your email address:</h6>
                        <input
                            type="text"
                            name="email"
                            placeholder="email@example.com"
                            onChange={emailForm.handleChange}
                            onBlur={emailForm.handleBlur}
                            value={emailForm.values.email}
                        />
                        <div className="error">
                            {emailForm.errors.email ? (
                                <i>{emailForm.errors.email}</i>
                            ) : null}
                        </div>
                    </div>
                    <br />
                    <Button type="primary" htmlType="submit" shape="round" size="large" disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined /> : <p>Continue</p>}
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
                        autoLoad={false}
                        fields="name,email"
                        callback={responseFacebook}
                        size="small"
                        cssClass="my-facebook-button-class"
                        textButton=""
                        icon={<Image src={FacebookIcon} width={20} preview={false} height={22} />}
                    />
                </div>
                <div className="form-footer">
                    <p>Already have account?&nbsp;</p>
                    <a onClick={() => { navigate('/signin') }}>Sign in</a>
                </div>
            </div>
        </div>

    )
}
