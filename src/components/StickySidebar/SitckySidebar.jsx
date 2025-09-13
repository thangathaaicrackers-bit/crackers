import React from "react";
// import "./StickySidebar.css"; // styles here

export default function StickySidebar() {
  return (
    // <div className="sticky-sidebar">
    //   {/* WhatsApp Button */}
    //   <a
    //     href="https://wa.me/9092346104?text=Hello, I have a question about how to place an Order?"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="sidebar-button whatsapp-button"
    //   >
    //     <i className="fab fa-whatsapp"></i>
    //   </a>

    //   {/* Call Us Button */}
    //   <div className="sidebar-button callus-button">
    //     <a href="tel:8190827346" className="phone-icon">
    //       <i className="fas fa-phone-alt"></i>
    //     </a>
    //     <div className="phone-tooltip">Call: 8190827346</div>
    //   </div>
    // </div>
    <div className="sticky-sidebar">
      <a
        href="https://wa.me/9092346104?text=Hello, I have a question about how to place an Order?"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
      <div className="callus-button">
        <a href="tel:8190827346" className="phone-icon">
          <i className="fas fa-phone-alt"></i>
        </a>
        <div className="phone-tooltip" style={{ color: "black" }}>
          For more details, call:{" "}
          <span style={{ color: "white" }}>9092346104, 8190827346</span>
        </div>
      </div>
    </div>
  );
}
