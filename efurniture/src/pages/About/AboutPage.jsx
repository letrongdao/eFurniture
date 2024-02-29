import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { Paragraph } = Typography
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <Paragraph className="lead text-center">
          Welcome to eFurniture, where we turn spaces into living dreams. As a premier destination for quality furniture and exceptional customer service, we take pride in offering a curated selection of stylish and functional pieces to elevate your home or office.
          At eFurniture, we believe that furniture is more than just objects; it's an expression of personal style and a reflection of individuality. Whether you're furnishing a cozy apartment, a spacious house, or a modern office, we are here to help you find the perfect pieces that complement your lifestyle and inspire creativity.
          What sets us apart is our commitment to excellence in every aspect of our business. From sourcing materials to craftsmanship and delivery, we prioritize quality and attention to detail to ensure that every piece meets our high standards. Our curated collection features a blend of timeless classics and contemporary designs, sourced from trusted manufacturers and artisans around the world.
          But it's not just about the furniture; it's about the experience. Our team of knowledgeable and friendly professionals is dedicated to providing personalized assistance every step of the way. Whether you need help choosing the right pieces, coordinating colors and fabrics, or navigating the ordering process, we are here to make your furniture shopping experience seamless and enjoyable.
          As a family-owned business, we understand the importance of creating spaces that feel like home. That's why we go above and beyond to offer exceptional value, competitive pricing, and flexible financing options to accommodate every budget. Our goal is simple: to help you create spaces that inspire, comfort, and delight for years to come.
          Thank you for choosing eFurniture as your trusted partner in furnishing your world. We look forward to helping you bring your vision to life and making your house a home.
          Contact us today to discover the endless possibilities for your space.
        </Paragraph>

        <h2 className="text-center py-4">Our Featured Products</h2>
        {/* <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Luxury Beds</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Fancy Lamps</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Furniture</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Electronics</h5>
              </div>
            </div>
          </div>
        </div> */}
        <Row gutter={16}>
          <Col span={6}>
            <Link to={"/category/bed"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://5.imimg.com/data5/ANDROID/Default/2020/12/MD/UL/RG/119453154/img-20201210-wa0017-jpg.jpg"
                  />
                }
              >
                <h4 className="card-title text-center">Bed</h4>
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/category/sofa"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://www.norwalkfurniture.com/media/wysiwyg/_7-alt_MAYFAIR-SET_RS_alt-moibleweb_2.gif"
                  />
                }
              >
                <h4 className="card-title text-center">Sofa</h4>
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/category/table"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://www.bassettfurniture.com/dw/image/v2/BGNC_PRD/on/demandware.static/-/Sites-bassett-Library/default/dwd515dec9/dining/2-col-home-for-the-holidays-m.jpg?sw=768&sfrm=jpg"
                  />
                }
              >
                <h4 className="card-title text-center">Table</h4>
              </Card>
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/category/outdoor"}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <img
                    alt=""
                    src="https://www.ubuy.vn/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFBbFNQallqUVMuX0FDX1NMMTUwMF8uanBn.jpg"
                  />
                }
              >
                <h4 className="card-title text-center">Outdoor</h4>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
