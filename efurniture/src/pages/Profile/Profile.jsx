import React, { useEffect, useState } from 'react'
import { Flex, Typography, Image, Button } from 'antd'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import styles from './Profile.module.css'
import axios from 'axios'
import efPointLogo from '../../assets/icons/efpoint_transparent.png'

export default function Profile() {
    const { Text, Title } = Typography
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
                        <Image src='https://cdn-icons-png.flaticon.com/512/3364/3364044.png' alt='' width={100} preview={false} />
                        <Title>{user.fullName}</Title>
                    </Flex>
                    <Flex vertical gap={10}>
                        <button className={styles.button}>CHANGE PROFILE NAME</button>
                        <button className={styles.button}>RESET PASSWORD</button>
                        <button className={styles.button} id={styles.deleteButton}>DELETE ACCOUNT</button>
                    </Flex>
                </Flex>
                <Flex vertical justify='space-evenly' align='center' gap={10} className={styles.eFurniPaySection}>
                    <Flex justify='center' align='center' gap={10}>
                        <Title>
                            {user.efpoint}
                        </Title>
                        <Image src={efPointLogo} alt='' width={50} preview={false} style={{ marginBottom: '18%' }} />
                    </Flex>
                    <Text style={{ fontSize: '70%', opacity: '0.5' }}>1 EF Point &#8771; 1 US Dollar &#8771; 24.690,00 VND </Text>
                    <button className={styles.button} id={styles.buyPointButton}>BUY EF POINTS</button>
                    <button className={styles.button}>VIEW TRANSACTION HISTORY</button>
                </Flex>
            </Flex>
            <Footer />
        </>
    )
}
