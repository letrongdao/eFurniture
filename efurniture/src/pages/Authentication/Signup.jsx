import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'
import { Button, Image, Divider, Typography, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '../../assets/icons/facebook.png'
import emailjs from '@emailjs/browser';
import { generateId, generatePassword } from "../../assistants/Generators";
import dateFormat from "../../assistants/date.format";
import axios from "axios";
import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'

export default function Signup() {
    const navigate = useNavigate()
    const formRef = useRef();
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const { Text } = Typography;
    const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

    const [registerUser, setRegisterUser] = useState({
        userId: '',
        email: '',
        password: '',
        fullName: '',
        roleId: '',
        phone: '',
        createAt: '',
        status: false,
    })

    const [verifyCode, setVerifyCode] = useState("")
    const [codeStatus, setCodeStatus] = useState("")

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onGoogleSuccess = async (credentialResponse) => {
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
                        const newUserId = generateId(30, 'u')
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

    const responseFacebook = async (response) => {
        if (response) {
            console.log("Facebook login credentials: ", response)
            await fetch("http://localhost:3344/users")
                .then(res => res.json())
                .then(data => {
                    var foundUserByEmail = data.find((account) => (account.email === response.email))
                    if (foundUserByEmail) {
                        sessionStorage.setItem("loginUserId", foundUserByEmail.user_id)
                    }
                    else {
                        const newUserId = generateId(30, 'u')
                        const createAt = dateFormat(new Date, "yyyy/mm/dd HH:MM:ss")
                        var registerUser = {
                            user_id: newUserId,
                            email: response.email,
                            password: generatePassword(20),
                            fullName: response.name,
                            role_id: "US",
                            phone: '',
                            create_at: createAt,
                            status: true,
                        }
                        axios.post("http://localhost:3344/users", registerUser)
                            .then(() => {
                                console.log("A new account has been created by Facebook email: ", response.email)
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

    const sendEmail = () => {
        emailjs.sendForm('service_qm91avr', 'template_yyrd4jj', formRef.current, 'WcYGL3eDIXuI0SMzS')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    const signupForm = useFormik({
        initialValues: {
            email: location.state?.email,
            password: '',
            confirm: '',
            fullName: '',
            code: generateId(6, ""),
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required('Please enter your email'),
            password: Yup.string().min(5, "Password must contains within 5-18 symbols").max(18, "Password must contains within 5-18 letters").required("Please enter your password"),
            confirm: Yup.string().test('passwords-match', 'Passwords does not match', function (value) { return this.parent.password === value }),
            fullName: Yup.string().required("Please enter your full name"),
        }),
        onSubmit: async (values) => {
            const newUserId = generateId(30, "u")
            const createAt = dateFormat(new Date, "yyyy/mm/dd HH:MM:ss")
            setVerifyCode(values.code)
            setRegisterUser({
                user_id: newUserId,
                email: values.email,
                password: values.password,
                fullName: values.fullName,
                role_id: "US",
                phone: "",
                create_at: createAt,
                status: true,
            })
            // sendEmail()
            showModal()
        }
    })

    const codeVerifyForm = useFormik({
        initialValues: {
            code: "",
            email: registerUser.email,
        },
        validationSchema: Yup.object({
            code: Yup.string().min(6, "Verify code should be a 6-digit one.").max(6, "Verify code should be a 6-digit one.").required("")
        }),
        onSubmit: (values) => {
            if (values.code === verifyCode) {
                axios.post('http://localhost:3344/users', registerUser)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                setIsLoading(true)
                setTimeout(() => {
                    setOpen(false);
                    setIsLoading(false);
                    navigate('/signin', { state: { noti: "create" } })
                }, 2000);
            }
            else {
                setCodeStatus("Incorrect verification code ! Please check your email and try again.")
            }
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
                <form ref={formRef} onSubmit={signupForm.handleSubmit} className={styles.formContainer}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.email}
                        />
                        <div className={styles.error}>
                            {signupForm.touched.email && signupForm.errors.email ? (
                                <i>{signupForm.errors.email}</i>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.password}
                        />
                        <div className={styles.error}>
                            {signupForm.touched.password && signupForm.errors.password ? (
                                <i>{signupForm.errors.password}</i>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm password"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.confirm}
                        />
                        <div className={styles.error}>
                            {signupForm.touched.confirm && signupForm.errors.confirm ? (
                                <i>{signupForm.errors.confirm}</i>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full name"
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.fullName}
                        />
                        <div className={styles.error}>
                            {signupForm.touched.fullName && signupForm.errors.fullName ? (
                                <i>{signupForm.errors.fullName}</i>
                            ) : null}
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name="code"
                        onChange={signupForm.handleChange}
                        onBlur={signupForm.handleBlur}
                        value={signupForm.values.code}
                    />
                    <br />
                    <Button type="primary" htmlType="submit" shape="round" block disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined /> : <p>Sign up</p>}
                    </Button>
                </form>
                <Divider><Text italic style={{ fontSize: "70%" }}>or you can sign up with</Text></Divider>
                <div className={styles.otherLogin}>
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
                        cssClass={styles.myFacebookButtonClass}
                        textButton=""
                        icon={<Image src={FacebookIcon} width={20} preview={false} height={22} />}
                    />
                    <Modal
                        title="Email sent"
                        open={open}
                        onCancel={handleCancel}
                        confirmLoading={isLoading}
                        footer={null}
                    >
                        <form onSubmit={codeVerifyForm.handleSubmit}>
                            <h5>Please check your email for the verification code.</h5>
                            <br />
                            <input type="text"
                                name="code"
                                placeholder="Enter the code here"
                                onChange={codeVerifyForm.handleChange}
                                onBlur={codeVerifyForm.handleBlur}
                                value={codeVerifyForm.values.code}
                            />
                            <div className={styles.error}>
                                {codeStatus != "" ? (
                                    <i>{codeStatus}</i>
                                ) : null}
                            </div>
                            <input
                                type="hidden"
                                name="email"
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                value={signupForm.values.email}
                            />
                            <span className={styles.modalButtonGroup}>
                                <Button type="default" shape="round" onClick={handleCancel}>Cancel</Button>
                                <Button type="primary" htmlType="submit" shape="round" disabled={isLoading ? true : false}>
                                    {isLoading ? <LoadingOutlined /> : <p>Verify {verifyCode}</p>}
                                </Button>
                            </span>
                        </form>
                    </Modal>
                </div>
                <div className={styles.formFooter}>
                    <p>Already have account?</p>
                    <a onClick={() => { navigate('/signin') }}>Sign in</a>
                </div>
            </div>
        </div>
    )
}
