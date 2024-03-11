import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'
import { Button, Image, Divider, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { generateCode } from "../../assistants/Generators";
import Reset from "./Reset";
import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'


export default function Forgot() {
    const navigate = useNavigate()
    const formRef = useRef()
    const [isLoading, setIsLoading] = useState(false)
    const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [userId, setUserId] = useState("")
    const [verifyCode, setVerifyCode] = useState("")

    const sendEmail = () => {
        emailjs.sendForm('service_qm91avr', 'template_0ftxhqc', formRef.current, 'WcYGL3eDIXuI0SMzS')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    const emailForm = useFormik({
        initialValues: {
            email: '',
            code: generateCode(6, "")
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("")
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            await fetch('http://localhost:3344/users')
                .then(res => res.json())
                .then(data => {
                    const foundAccountByEmail = data.find((account) => (account.email === values.email))
                    if (foundAccountByEmail) {
                        sendEmail()
                        setUserId(foundAccountByEmail.user_id)
                        setVerifyCode(emailForm.initialValues.code)
                        setIsLoading(false)
                        showModal()
                    }
                    else {
                        setIsLoading(false)
                        emailForm.setErrors({
                            email: "This email is not registered."
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    })

    const codeVerifyForm = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: Yup.object({
            code: Yup.string().min(6, "Verify code should be a 6-digit one.").max(6, "Verify code should be a 6-digit one.").required("")
        }),
        onSubmit: (values) => {
            if (values.code === verifyCode) {
                setIsLoading(true)
                setTimeout(() => {
                    setOpen(false);
                    setIsLoading(false);
                    navigate(`/reset/${userId}`)
                }, 2000);
            }
            else {
                codeVerifyForm.setErrors({
                    code: "Incorrect verification code. Please check your email and try again."
                })
            }
        }
    })

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <Image src={randomImage} width={400} preview={false} />
            </div>
            <Divider type="vertical" />
            <div className={styles.rightContainer} style={{ padding: "20px 0" }}>
                <Image className={styles.image} src={eFurniLogo} width={250} preview={false} />
                <form ref={formRef} onSubmit={emailForm.handleSubmit} className={styles.formContainer}>
                    <h5>Enter your email address to reset password.</h5>
                    <br />
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email address"
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
                    <span className={styles.modalButtonGroup} style={{ flexDirection: "column", marginTop: "20px" }}>
                        <Button type="primary" htmlType="submit" shape="round" block disabled={isLoading ? true : false}>
                            {isLoading ? <LoadingOutlined /> : <p>Continue</p>}
                        </Button>
                        <Button type="default" shape="round" block onClick={() => { navigate(-1) }}>Back</Button>
                    </span>
                </form>
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
                            {codeVerifyForm.errors.code ? (
                                <i>{codeVerifyForm.errors.code}</i>
                            ) : null}
                        </div>
                        <input
                            type="hidden"
                            name="email"
                            onChange={emailForm.handleChange}
                            onBlur={emailForm.handleBlur}
                            value={emailForm.values.email}
                        />
                        <span className={styles.modalButtonGroup}>
                            <Button type="default" shape="round" onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" htmlType="submit" shape="round" disabled={isLoading ? true : false}>
                                {isLoading ? <LoadingOutlined /> : <p>Verify</p>}
                            </Button>
                        </span>
                    </form>
                </Modal>
            </div>
        </div>

    )
}
