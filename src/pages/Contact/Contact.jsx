import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/NavBar/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Contact() {
    return (
        <>
          
            <section id='contact'>
                <div className='container'>
                    <div className='row d-flex'>
                        <div className='col-lg-4 col-md-7'>
                            <h2>Thangathai Fireworks</h2>
                            Sivakasi, Tamil Nadu, India 626130
                            thangathaaicrackers@gmail.com
                            <br></br>
                            +91 9043338930, 8190827346
                        </div>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62969.99610821822!2d77.7514228435043!3d9.454264267551483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cee43d812d0d%3A0x8ce12e9dcdaa2a2c!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1723967599749!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </section>

            <div className="sticky-sidebar">
                <a href="https://wa.me/9092346104?text=Hello, I have a question about how to place an Order?" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                    <i className="fab fa-whatsapp"></i>
                </a>
                <div className="callus-button">
                    <a href="tel:8190827346" className="phone-icon">
                        <i className="fas fa-phone-alt"></i>
                    </a>
                    <div className="phone-tooltip" style={{ color: 'black' }}>
                        For more details, call: <span style={{ color: 'white' }}>9092346104, 8190827346</span>
                    </div>
                </div>
            </div>

         

        </>
    )
}
