import React, { useEffect, useState } from 'react'
import { Flex, Typography, Image, Button } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import styles from './Profile.module.css'
import axios from 'axios'

export default function Profile() {
    const { Text, Title } = Typography
    const navigate = useNavigate()
    const userId = useParams()
    const [user, setUser] = useState({})

    const fetchUserData = async () => {
        await axios.get(`http://localhost:3344/users/${userId.id}`)
            .then((res) => {
                setUser(res.data[0])
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <>
            <Navbar />
            <Flex justify='center' align='center' className={styles.profileContainer}>
                <Flex vertical justify='space-evenly' align='center' gap={10} className={styles.userInfoSection}>
                    <Flex justify='space-evenly' align='center' gap={10}>
                        <Image src='https://cdn-icons-png.flaticon.com/512/3364/3364044.png' alt='' width={100} preview={false}
                            style={{ backgroundColor: "#FFF", borderRadius: "50px" }}
                        />
                        <Title style={{ color: "#FFF" }}>{user.fullName}</Title>
                    </Flex>
                    <Flex vertical gap={10}>
                        <button className={styles.button}>CHANGE PROFILE NAME</button>
                        <button className={styles.button}>RESET PASSWORD</button>
                        <button className={styles.button} id={styles.deleteButton}>DELETE ACCOUNT</button>
                    </Flex>
                </Flex>
            </Flex>
            <Footer />
        </>
    )
}
