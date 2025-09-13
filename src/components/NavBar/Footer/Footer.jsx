import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-content bg-light mt-4">
      <div className="container py-4">
        <div className="row">
          {/* Legal Notice */}
          <div className="col-12">
            <div className="p-3 rounded" style={{ background: "#86fdcc" }}>
              <p className="mb-2">
                As per 2018 Supreme Court order, online sale of firecrackers is not permitted!
                We value our customers and at the same time respect jurisdiction.
                Please add your products to the cart and submit the required crackers
                through the enquiry button.
              </p>
              <p className="mb-2">
                We will contact you within 24 hrs and confirm the order through WhatsApp or phone call. 
                Please add and submit your enquiries and enjoy your Diwali with 
                <strong> Thangathaai Fireworks Sivakasi</strong>.
              </p>
              <p className="mb-2">
                Our License No. ----. Thangathaai Fireworks Sivakasi is a company following 100% legal & statutory
                compliances, and all our shops & go-downs are maintained as per the Explosive Acts.
              </p>
              <p className="mb-0">
                We send parcels through registered and legal transport service providers, 
                just like every other major company in Sivakasi.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="col-12 text-center mt-3">
            <hr />
            <p className="mb-0">© {new Date().getFullYear()} All Rights Reserved | Thangathaai Fireworks</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
