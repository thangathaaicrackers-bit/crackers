import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderError, setOrderError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDataget = () => {
    axios
      // .get("https://web.thangathaaicrackers.com/api/getcrackers")
      .get(`${import.meta.env.VITE_FRONTEND_URL}/api/getcrackers`)
      .then((res) => {
        if (res?.data) {
          setSelectedItems(res.data.data);
          setFilteredItems(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDataget();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = selectedItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(selectedItems);
    }
  }, [searchTerm, selectedItems]);

  const handleQuantityChange = (id, quantity) => {
    const updatedItems = selectedItems.map((item) => {
      if (item._id === id) {
        const updatedQuantity = parseInt(quantity, 10);

        // Apply the discount if available
        const discountedPrice = item.discount
          ? item.price - (item.price * item.discount) / 100
          : item.price;

        const updatedTotal =
          updatedQuantity > 0 ? discountedPrice * updatedQuantity : "";

        return {
          ...item,
          quantity: updatedQuantity >= 0 ? updatedQuantity : "",
          total: updatedTotal,
        };
      }
      return item;
    });

    setSelectedItems(updatedItems);
  };

  const calculateOverallTotal = () => {
    return selectedItems.reduce((acc, item) => acc + (item.total || 0), 0).toFixed(2);
  };

  const calculateSelectedProductCount = () => {
    return selectedItems.filter((item) => item.quantity > 0).length;
  };

  const onSubmit = async (data) => {
    const overallTotal = calculateOverallTotal();

    // if (overallTotal < 3000) {
    //     setOrderError('The minimum order amount is Rs 3000.');
    //     return;
    // } else {
    //     setOrderError('');
    // }

    let filterItems = selectedItems
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        total: item.total,
        name: item.name,
        price: item.price,
        discount: item.discount, // Include discount in the submitted data
      }));

    let finalData = { ...data, overallTotal, orderItems: filterItems };

    localStorage.setItem("orderData", JSON.stringify(finalData));

    await axios.post(
      `${import.meta.env.VITE_FRONTEND_URL}/api/userestim`,
      finalData
    );

    window.location.href = "/preview";
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderCategory = (categoryName) => {
    return (
      <>
        <tr
          className="category_row cart__total"
          style={{
            backgroundColor: "#aab1ff",
            color: "#FFF",
            margin: 0,
            padding: 0,
          }}
        >
          <td colSpan="6">
            <h5 style={{ margin: 0, padding: 0 }}>
              {categoryName.toUpperCase()}
            </h5>
          </td>
        </tr>
        {filteredItems
          ?.filter((item) => item.category === categoryName)
          ?.map((item) => (
            <tr className="product_row" key={item._id}>
              <td className="product_image text-center" width="5%">
                <img
                  src={item.imageUrl}
                  width="50px"
                  alt=""
                  onClick={() => handleImageClick(item.imageUrl)}
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td id="2" className="product_name text-center">
                {item.name}
              </td>
              <td className="text-center" width="10%">
                Rs
                <span className="actual_price"> {item.price}</span>
              </td>
              {/* Discount Column */}
              <td className="text-center" width="10%">
                {item.discount ? `${item.discount}%` : "0%"}
              </td>
              <td className="quantity text-center pd" width="10%">
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  className="form-control qty_box quantity_2"
                  value={item.quantity || 0}
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                  onWheel={(e) => e.currentTarget.blur()} 
                ></input>
              </td>
              <td id="0" className="amount text-center pd" width="10%">
                {/* <input
                  type="text"
                  name="amount"
                  className="form-control"
                  disabled
                  style={{ paddingLeft: 0, paddingRight: "7px" }}
                  value={item.total && item.total !== 0 ? ` ${item.total}` : 0}
                ></input> */}
                {item?.total}
              </td>
            </tr>
          ))}
      </>
    );
  };

  return (
    <>
      <section id="products-lists">
        <div className="container">
          <div className="row d-flex">
            <div className="col-lg-4 col-md-7">
              <h3>Product List</h3>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by product or category..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="container">
          <div
            id="top_section"
            className="table-responsive sticky-top xs-margin-top-20px"
          >
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{ margin: "auto" }}
              className="table-styles"
            >
              <tbody>
                <tr>
                  <td>
                    <strong>Total Products </strong>
                    <span className="product_count">
                      {calculateSelectedProductCount()}
                    </span>
                  </td>
                  <td>
                    <strong>Overall Total </strong>
                    <span className="product_count">
                      {calculateOverallTotal()}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="shopping-cart-table table-responsive">
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  id="example"
                  className="pricelist-table pricelist-products table-styles"
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eca1fe", color: "#fff" }}>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderCategory("Single Sound Crackers")}
                    {renderCategory("Ground Chakkars")}
                    {renderCategory("Fancy Chakkars")}
                    {renderCategory("Flowerpots")}
                    {renderCategory("Fancy Fountains")}
                    {renderCategory("Fancy & Novelties")}
                    {renderCategory("Bombs")}
                    {renderCategory("Loose Crackers")}
                    {renderCategory("Rockets")}
                    {renderCategory("Ariel Fancy")}
                    {renderCategory("Multiple Color shots")}
                    {renderCategory("Sparklers")}
                    {renderCategory("Special Sparklers")}
                    {renderCategory("Twinkling Star")}
                    {renderCategory("Candle")}
                    {renderCategory("Confetti")}
                    {renderCategory("Cartoons")}
                    {renderCategory("New Items")}
                    {renderCategory("Color Matches")}
                    {renderCategory("Deepavali Gun")}
                    {renderCategory("Sky Lanterns")}
                    {renderCategory("Gift Boxes")}

                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "right",
                          fontSize: "16px",
                          color: "#17a3b8",
                          fontWeight: "bold",
                          padding: "10px",
                        }}
                      >
                        Overall Total
                      </td>
                      <td style={{ textAlign: "start", padding: "10px" }}>
                        {calculateOverallTotal()}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="6" className="text-center text-danger">
                        <strong>The minimum order amount is Rs 3000.</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="py-5" style={{ backgroundColor: "#f9f9ff" }}>
  <div className="container">
    {orderError && (
      <div className="alert alert-danger mb-4 shadow-sm">{orderError}</div>
    )}

    <div className="card shadow-lg border-0 rounded-3">
      <div className="card-header text-center" style={{ backgroundColor: "#aab1ff", color: "#fff" }}>
        <h4 className="mb-0">Order Details</h4>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
          {/* Name */}
          <div className="col-md-6">
            <label htmlFor="name" className="form-label fw-semibold">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Enter your full name"
              {...register("username", { required: "Name is required" })}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="col-md-6">
            <label htmlFor="mobile" className="form-label fw-semibold">
              Mobile Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              className={`form-control ${errors.phoneNo ? "is-invalid" : ""}`}
              placeholder="10-digit mobile number"
              {...register("phoneNo", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
            />
            {errors.phoneNo && (
              <div className="invalid-feedback">{errors.phoneNo.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="example@email.com"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Address */}
          <div className="col-md-6">
            <label htmlFor="address" className="form-label fw-semibold">
              Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="address"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              placeholder="Street address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address.message}</div>
            )}
          </div>

          {/* City */}
          <div className="col-md-6">
            <label htmlFor="city" className="form-label fw-semibold">
              City <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="city"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              placeholder="Enter your city"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city.message}</div>
            )}
          </div>

          {/* State */}
          <div className="col-md-6">
            <label htmlFor="state" className="form-label fw-semibold">
              State <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="state"
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              placeholder="Enter your state"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && (
              <div className="invalid-feedback">{errors.state.message}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-lg text-white px-5"
              style={{ backgroundColor: "#6c63ff", borderRadius: "30px" }}
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>


      {modalVisible && selectedImage && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Image Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <img src={selectedImage} alt="Cracker" className="img-fluid" />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
