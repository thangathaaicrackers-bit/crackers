import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EstimateForm.css";

import { useNavigate } from "react-router-dom";

export default function EstimateForm() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_FRONTEND_URL}/send-estimate`, {
        orderData,
      });
      alert("Estimate sent successfully");
    } catch (error) {
      console.error("Error sending estimate:", error);
      alert("Failed to send estimate");
    }
    navigate("/");
  };

  return (
    <>
      <section className="about spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <div className="card shadow-sm border-0 mx-2 my-3">
                  <div className="card-header bg-light text-center">
                    <h2 className="fw-bold py-3 mb-0">Order Preview</h2>
                  </div>

                  <div className="card-body px-3 py-3">
                    {/* Header Info */}
                    <table className="table table-bordered w-100 mb-4">
                      <thead>
                        <tr>
                          <th colSpan="5" className="text-center align-middle">
                            {/* Company Info */}
                            <div className="mb-2">
                              <div className="fw-bold fs-5">
                                Thangathai Fireworks Sivakasi
                              </div>
                              <div className="text-muted small">
                                Sivakasi, Tamil Nadu, India 626130
                              </div>
                            </div>

                            {/* Estimate + Date */}
                            <div className="row text-center mb-2">
                              <div className="col-sm-6 fw-bold">
                                ESTIMATE BILL
                              </div>
                              <div className="col-sm-6">
                                Date: {formattedDate}
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div className="row text-center">
                              <div className="col-sm-6">
                                Mobile: 9092346104 / 8190827346
                              </div>
                              <div className="col-sm-6">
                                Email: thangathaaicrackers@gmail.com
                              </div>
                            </div>
                          </th>
                        </tr>

                        {/* <tr>
                          <th colSpan="5" className="text-center align-middle">
                          <div className="mt-2">
                              <div className="fw-bold">
                                Thangathai Fireworks Sivakasi
                              </div>
                              <div className="text-muted">
                                Sivakasi, Tamil Nadu, India 626130
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="fw-bold">ESTIMATE BILL</span>
                              <span>Date: {formattedDate}</span>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                              <span>Mobile: 9092346104 / 8190827346</span>
                              <span>Email: thangathaaicrackers@gmail.com</span>
                            </div>
                            
                          </th>
                        </tr> */}
                        {/* <tr>
                          <th colSpan="5" className="text-center bg-light">
                            <strong>Customer Details</strong>
                            <div className="mt-2">
                              <div>{orderData?.username}</div>
                              <div>{orderData?.phoneNo}</div>
                              <div>{orderData?.address}</div>
                              <div>
                                {orderData?.city}, {orderData?.state}
                              </div>
                            </div>
                          </th>
                        </tr> */}
                        <tr>
                          <th colSpan="5" className="text-center align-middle bg-light">
                            {/* <div className="fw-bold mb-2">Customer Details</div> */}
                            <div className="mb-2">
                              <div className="fw-bold fs-5">
                                Customer Details
                              </div>
                            </div>
                            <div className="row text-start px-3">
                              <div className="col-md-6 col-sm-12 mb-2">
                                <strong>Name:</strong> {orderData?.username}
                              </div>
                              <div className="col-md-6 col-sm-12 mb-2">
                                <strong>Mobile:</strong> {orderData?.phoneNo}
                              </div>
                              <div className="col-md-6 col-sm-12 mb-2">
                                <strong>Address:</strong> {orderData?.address}
                              </div>
                              <div className="col-md-6 col-sm-12 mb-2">
                                <strong>City/State:</strong> {orderData?.city},{" "}
                                {orderData?.state}
                              </div>
                            </div>
                          </th>
                        </tr>

                        <tr className="table-secondary text-center">
                          <th style={{ width: "60px" }}>S.NO</th>
                          <th>Product Name</th>
                          <th style={{ width: "100px" }}>Quantity</th>
                          <th style={{ width: "120px" }}>Rate (Rs)</th>
                          <th style={{ width: "120px" }}>Amount (Rs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData?.orderItems.map((item, index) => (
                          <tr key={index} className="text-center">
                            <td>{index + 1}</td>
                            <td className="text-start">{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.total}</td>
                          </tr>
                        ))}

                        {/* Totals */}
                        <tr className="fw-bold">
                          <td colSpan="4" className="text-end">
                            Total Items
                          </td>
                          <td className="text-center">
                            {orderData?.orderItems.length}
                          </td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan="4" className="text-end">
                            Overall Total
                          </td>
                          <td className="text-center">
                            {orderData?.overallTotal}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Buttons */}
                    <div className="d-flex justify-content-start gap-2">
                      {/* <button className="btn btn-outline-secondary btn-sm">Back</button> */}
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
