import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import pricelistpdf from '../../assets/thangathai.pdf'
import './PriceList.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../components/NavBar/Footer/Footer'

export default function PriceList() {
    return (
        <>
          

            <section id='price'>
                <h2 className='pricelist-h2 container'>Price List</h2>
                <div className='desktop-view container'>
                    <object data={pricelistpdf} type='application/pdf' width={'100%'} height={'800px'}></object>
                </div>
                {/* For Media Query */}
                <div className='mobile-view container'>
                    <a href={pricelistpdf} style={{ backgroundColor: '#002366', color: '#ffffff', padding: '5px' }}>Download Price List</a>
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
