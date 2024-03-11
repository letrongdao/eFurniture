import React, { useEffect, useState } from "react";
import {
  Flex,
  Image,
  Typography,
  InputNumber,
  Button,
  Divider,
  Skeleton,
  Modal,
} from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  CheckCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import styles from "./Product.module.css";
import { generateId } from "../../assistants/Generators";
import Navbar from "../../components/Navbar/Navbar";
import RelatedProducts from "../../components/Related Products/RelatedProducts";
import Footer from "../../components/Home/Footer";
import dateFormat from "../../assistants/date.format";

export default function Product() {
  const userId = sessionStorage.getItem("loginUserId");

  const { Text, Title, Link } = Typography;
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    image_url: "",
    description: "",
    price: "",
    category_name: "",
    status: 0,
  });
  const { id } = useParams();

  const fetchProductInfo = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:3344/products/${id}`)
      .then((res) => {
        setCurrentProduct(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const onQuantityChange = (value) => {
    if (value) setQuantity(value);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((currentQuantity) => currentQuantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 20) setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const addToCartForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: quantity,
    },
    onSubmit: (values) => {
      console.log("Form values: ", values);
      const cartItemId = generateId(30, "");
      axios
        .get(`http://localhost:3344/cartItems/${userId}/${id}`)
        .then((res) => {
          if (res.data.length > 0) {
            const newQuantity = values.quantity + res.data[0].quantity;
            axios
              .patch(
                `http://localhost:3344/cartItems/${res.data[0].cartItem_id}`,
                {
                  quantity: newQuantity,
                }
              )
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err.message));
          } else {
            console.log(res.data);
            axios
              .post(`http://localhost:3344/cartItems`, {
                cartItem_id: cartItemId,
                quantity: values.quantity,
                product_id: id,
                user_id: userId,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
          navigate(0);
        });
    },
  });

  const buyNowForm = useFormik({
    initialValues: {
      quantity: quantity,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("Buy now form values: ", values);
      const newOrderId = generateId(30, '')

      try {
        const orderCreateDate = dateFormat(new Date, 'yyyy/mm/dd HH:MM:ss')
        await axios.post(`http://localhost:3344/orders`, {
          order_id: newOrderId,
          date: orderCreateDate,
          total: currentProduct.price * values.quantity,
          isDelivered: 0,
          status: 0,
          user_id: userId
        })
          .then((res) => {
            console.log("Post order: ", res.data)
          })
          .catch((err) => console.log(err))


        const newOrderItemId = generateId(30, '')

        axios.post(`http://localhost:3344/orderItems`, {
          orderItem_id: newOrderItemId,
          price: currentProduct.price,
          quantity: values.quantity,
          order_id: newOrderId,
          product_id: currentProduct.product_id
        })
          .then((res) => {
            console.log("Order items post: ", res.data)
          })
          .catch((err) => console.log(err))
      } catch (err) {
        console.log('Error: ', err)
      }

      await axios.post('http://localhost:3344/create_payment_url', {
        amount: currentProduct.price * values.quantity * 24650,
        bankCode: 'VNBANK',
        language: 'vn',
        orderDescription: `Purchase eFurniture order ${newOrderId}`,
        orderType: 'billpayment',
        orderId: newOrderId,
      })
        .then((res) => {
          const responseData = res.data.vnpUrl;
          window.location.href = responseData;
        })
        .catch(error => console.log(error))
    },
  });

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Flex align="center" justify="center" style={{ minHeight: "80vh" }}>
          <Skeleton
            active
            avatar={{ shape: "square", size: 400 }}
            paragraph={{ rows: 5 }}
            style={{ margin: "0 5% 0 8%" }}
          />
        </Flex>
      ) : (
        <>
          <form onSubmit={addToCartForm.handleSubmit}>
            <Flex
              justify="space-around"
              align="center"
              className={styles.productInfoContainer}
            >
              <span className={styles.imageSection}>
                <Image
                  src={currentProduct.image_url}
                  alt=""
                  width={400}
                  style={{ minWidth: "400px", maxWidth: "400px" }}
                  preview={false}
                />
              </span>
              <Flex
                vertical
                justify="space-around"
                align="center"
                style={{ maxHeight: "min-content", minWidth: "50%" }}
              >
                <Flex vertical justify="space-between" align="center">
                  <Title
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontSize: "200%",
                    }}
                  >
                    {currentProduct.name.toUpperCase()}
                  </Title>
                  <Text
                    style={{
                      fontSize: "150%",
                      fontWeight: "300",
                      minWidth: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "100%",
                        fontWeight: "300",
                        minWidth: "100%",
                        textAlign: "center",
                      }}
                      delete={currentProduct.status === 0}
                    >
                      {currentProduct.price} $
                    </Text>
                    &ensp;{currentProduct.status === 0 ? "SOLD OUT" : ""}
                  </Text>
                  <Divider />
                </Flex>
                <Flex
                  vertical
                  justify="space-between"
                  align="center"
                  className={styles.detailSection}
                >
                  <ul style={{ listStyleType: "circle" }}>
                    <li>
                      <Text>
                        Category: &nbsp;
                        <Link
                          className={styles.link}
                          onClick={() =>
                            navigate(
                              `/category/${currentProduct.category_name}`
                            )
                          }
                        >
                          {currentProduct.category_name}
                        </Link>
                      </Text>
                    </li>
                    <br />
                    <li>
                      <Text>Description: {currentProduct.description}</Text>
                    </li>
                  </ul>
                  <Divider />
                </Flex>
                <Flex
                  justify="center"
                  align="center"
                  className={styles.quantitySection}
                >
                  <Button
                    onClick={decreaseQuantity}
                    style={{ marginRight: "" }}
                  >
                    <MinusOutlined />
                  </Button>
                  <InputNumber
                    min={1}
                    max={20}
                    onChange={onQuantityChange}
                    controls={false}
                    value={quantity}
                    size="medium"
                    style={{ width: "17%" }}
                  />
                  <Button
                    onClick={increaseQuantity}
                    style={{ marginLeft: "3%" }}
                  >
                    <PlusOutlined />
                  </Button>
                </Flex>
                <Flex justify="center" align="center" style={{ margin: "2% 0" }}>
                  <Link href={`/bookings/${currentProduct.product_id}`} className={styles.favoriteSection}>
                    <CheckCircleOutlined /> Set an appointment for this
                  </Link>
                </Flex>
                <Flex
                  vertical
                  justify="space-evenly"
                  align="center"
                  gap={2}
                  className={styles.buttonSection}
                >
                  <Button block className={styles.button} htmlType="submit">
                    <ShoppingCartOutlined className={styles.cartIcon} />
                    ADD TO CART
                  </Button>
                  <Button
                    block
                    className={styles.button}
                    id={styles.buyButton}
                    onClick={() => setModalOpen(true)}
                  >
                    <ShoppingOutlined className={styles.cartIcon} />
                    BUY NOW
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </form>
          <Modal
            title="Confirm before paying..."
            centered
            open={modalOpen}
            footer={[
              <Button key="back" onClick={() => setModalOpen(false)}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  buyNowForm.submitForm();
                  setModalOpen(false);
                }}
              >
                Continue
              </Button>,
            ]}
          >
            <form onSubmit={buyNowForm.handleSubmit}>
              <Flex justify="space-between" align="center">
                <Image
                  src={currentProduct.image_url}
                  alt=""
                  width={200}
                  style={{ minWidth: "200px", maxWidth: "200px" }}
                />
                <Flex
                  vertical
                  justify="space-between"
                  align="center"
                  style={{ textAlign: "center" }}
                >
                  <Text style={{ fontSize: "150%" }}>
                    <strong>{currentProduct.name}</strong>
                  </Text>
                  <Text>Select quantity:</Text>
                  <Flex
                    justify="center"
                    align="center"
                    className={styles.quantitySection}
                  >
                    <Button
                      onClick={decreaseQuantity}
                      style={{ marginRight: "1%" }}
                    >
                      -
                    </Button>
                    <InputNumber
                      min={1}
                      max={20}
                      onChange={onQuantityChange}
                      controls={false}
                      value={quantity}
                      size="medium"
                      style={{ width: "17%" }}
                    />
                    <Button
                      onClick={increaseQuantity}
                      style={{ marginLeft: "1%" }}
                    >
                      +
                    </Button>
                  </Flex>
                  <Flex style={{ marginTop: "10%" }} gap={10}>
                    <Text style={{ fontSize: "180%" }}>
                      {Math.round(currentProduct.price * quantity * 100) / 100} $
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </form>
          </Modal>
          <RelatedProducts />
          <Footer />
        </>
      )}
    </>
  );
}
