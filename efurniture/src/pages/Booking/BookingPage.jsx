import React, { useEffect, useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { generateId } from "../../assistants/Generators";
import { getProductById } from "../../dataControllers/productController";
import { createBooking } from "../../dataControllers/bookingController";
import axios from "axios";
// import Footer from "../../components/Home/Footer";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [user, setUser] = useState({});
  const [information, setInformation] = useState({
    image_url: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    booking_id: generateId(30, ""),
    date: "",
    time: "",
    status: 0,
    contents: "",
    // user_id: "us5833430108618",
    user_id: currentUserId,
    product_id: id,
  });

  const fetchUserData = async () => {
    await axios
      .get(`http://localhost:3344/users/${currentUserId}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProductById(id).then((res) => {
        setInformation({
          ...information,
          image_url: res.image_url,
          description: res.description,
        });
      });
      await fetchUserData();
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    createBooking(formData);
    setFormData({
      ...formData,
      date: "",
      time: "",
      status: 0,
      contents: "",
      user: "",
    });
    navigate(`/products/${id}`).then(message.success("Booking Successful!!!"));
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      booking_id: "",
      date: "",
      time: "",
      status: 0,
      contents: "",
      user_id: "",
      product_id: "",
    });
    navigate(`/products/${id}`);
  };

  console.log("FORM DATA: ", formData);

  return (
    <>
      <Navbar />
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container">
            <div className="row">
              <div className="booking-form">
                <div
                  className="booking-bg"
                  style={{ backgroundImage: `url(${information.image_url})` }}
                >
                  <div className="form-header">
                    <h2>Make your appointment</h2>
                    <p style={{ fontSize: "20px" }}>
                      {information.description}
                    </p>
                  </div>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">BOOKING DATE</span>
                        <input
                          className="form-control"
                          type="date"
                          value={formData?.date}
                          onChange={(e) => {
                            setFormData((pre) => {
                              return { ...pre, date: e.target.value };
                            });
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <span className="form-label">TIME</span>
                        <input
                          className="form-control"
                          type="time"
                          value={formData?.time}
                          onChange={(e) => {
                            setFormData((pre) => {
                              return { ...pre, time: e.target.value };
                            });
                          }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <span className="form-label">DESCRIPTION</span>
                    <textarea
                      className="form-control"
                      style={{ height: "100px" }}
                      value={formData?.contents}
                      onChange={(e) => {
                        setFormData((pre) => {
                          return { ...pre, contents: e.target.value };
                        });
                      }}
                    ></textarea>
                  </div>
                  <div className="form-btn">
                    <button className="submit-btn" onClick={handleSubmit}>
                      Confirm
                    </button>
                    <button className="submit-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
