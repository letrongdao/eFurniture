import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import generateId from "../../assistants/GenerateId";

export default function Reset() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)

    const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"
    useEffect(() => {
        console.log(location)
    }, [])
    const [userInfo, setUserInfo] = useState({
        userId: '',
        email: '',
        password: '',
        fullName: '',
        roleId: '',
        phone: '',
        createAt: '',
        status: false,
    })

    const resetPasswordForm = useFormik({
        initialValues: {
            password: '',
            confirm: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().min(5, "Password must contains within 5-18 letters").max(18, "Password must contains within 5-18 symbols").required(""),
            confirm: Yup.string().test('passwords-match', 'Passwords does not match', function (value) { return this.parent.password === value }),
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            const userId = "us9949701574607"
            await axios.get(`http://localhost:3344/users/${userId}`)
                .then(res => res.json())
                .then(data => {
                    data?.map((account) => {
                        console.log(account.email)
                    })
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
            <div className="right-container row" style={{ padding: "20px 0" }}>
                <Image className="image" src="https://efurniturerepurposing.com.au/wp-content/uploads/2023/12/efurniture-logo.png" width={200} preview={false} />
                <form onSubmit={resetPasswordForm.handleSubmit}>
                    <h5>Enter your email address to reset password.</h5>
                    <br />
                    <div className="mb-2 mt-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            onChange={resetPasswordForm.handleChange}
                            onBlur={resetPasswordForm.handleBlur}
                            value={resetPasswordForm.values.password}
                        />
                        <div className="error">
                            {resetPasswordForm.errors.password ? (
                                <i>{resetPasswordForm.errors.password}</i>
                            ) : null}
                        </div>
                    </div>

                    <div className="mb-2 mt-2">
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm your password"
                            onChange={resetPasswordForm.handleChange}
                            onBlur={resetPasswordForm.handleBlur}
                            value={resetPasswordForm.values.confirm}
                        />
                        <div className="error">
                            {resetPasswordForm.errors.confirm ? (
                                <i>{resetPasswordForm.errors.confirm}</i>
                            ) : null}
                        </div>
                    </div>
                    <span className="modal-button-group" style={{ flexDirection: "column", marginTop: "20px" }}>
                        <Button type="primary" htmlType="submit" shape="round" block disabled={isLoading ? true : false}>
                            {isLoading ? <LoadingOutlined /> : <p>Finish</p>}
                        </Button>
                        <Button type="default" shape="round" block onClick={() => { navigate(-1) }}>Back</Button>
                    </span>
                </form>
            </div>
        </div>

    )
}
