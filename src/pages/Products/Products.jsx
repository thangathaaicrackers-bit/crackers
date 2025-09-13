import React, { useState, useEffect } from "react";
import "./Products.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/NavBar/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Products() {
  const [noOfElement, setnoOfElement] = useState(4);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_FRONTEND_URL}/api/getcrackers`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  };

  const slice = products.slice(0, noOfElement);

  return (
    <>
        <section className="py-5 bg-light">
      <div className="container">
        {/* Title */}
        <div className="text-center mb-5">
          <span className="text-muted d-block">All the best items for You</span>
          <h2 className="fw-bold">Our Products</h2>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {products.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 shadow-sm text-center">
                <div
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ height: "200px" }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxHeight: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-primary fw-semibold">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-5">
          <button onClick={loadMore} className="btn btn-primary px-4">
            Load More
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
