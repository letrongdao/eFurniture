import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          facere doloremque veritatis odit similique sequi. Odit amet fuga nam
          quam quasi facilis sed doloremque saepe sint perspiciatis explicabo
          totam vero quas provident ipsam, veritatis nostrum velit quos
          recusandae est mollitia esse fugit dolore laudantium. Ex vel explicabo
          earum unde eligendi autem praesentium, doloremque distinctio nesciunt
          porro tempore quis eaque labore voluptatibus ea necessitatibus
          exercitationem tempora molestias. Ad consequuntur veniam sequi ullam
          tempore vel tenetur soluta dolore sunt maxime aliquam corporis est,
          quo saepe dolorem optio minus sint nemo totam dolorum! Reprehenderit
          delectus expedita a alias nam recusandae illo debitis repellat libero,
          quasi explicabo molestiae saepe, dolorem tempore itaque eveniet quam
          dignissimos blanditiis excepturi harum numquam vel nihil? Ipsum
        </p>

        <h2 className="text-center py-4">Our Products</h2>
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
