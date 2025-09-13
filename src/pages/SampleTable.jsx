import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SampleTable.css'

export default function SampleTable() {
    return (
        <>
            <section className='shopping-cart spad'>
                <div className='container'>
                    <div id='top_section' className='table-responsive sticky-top xs-margin-top-20px'>
                        <div className='row'></div>
                        <table cellPadding='0' cellSpacing='0' style={{ margin: 'auto' }} className='table-styles'>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Total Products</strong>
                                        <span className='product_count'></span>
                                    </td>

                                    <td>
                                        <strong>Overall total</strong>
                                        <span className='product_count'></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='shopping-cart-table table-resposive'>
                                <table cellPadding='0' cellSpacing='0' id='example' class='pricelist-table pricelist-products table-styles'>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f83700', color: '#fff' }}>
                                            <th>Image</th>
                                            <th class="product_name" style={{ display: "none" }}>Code</th>
                                            <th>Product</th>
                                            <th class="medium_visiable" style={{ display: "none" }}>Content</th>
                                            <th style={{ width: '10%' }}>Price</th>
                                            <th style={{ display: "none" }}>Amount</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='category_row cart__total' style={{ backgroundColor: '#F83700', color: '#FFF', margin: 0, padding: 0 }}>
                                            <td colSpan='5'>
                                                <h5 style={{ margin: 0, padding: 0 }}>SOUND CRACKERS</h5>
                                            </td>
                                        </tr>
                                        {selectedItems.map((item, index) => (

                                            <tr className='product_row' key={index}>
                                                <td className='product_image text-center' width='5%'>
                                                    <img src={item.img} width='50px' alt='' />
                                                </td>
                                                <td id='2' className='product_name text-center'>{item.name}</td>
                                                <td className='text-center' width='10%'>Rs
                                                    <span className='actual_price'>{item.price}</span>
                                                </td>
                                                <td className='quantity text-center pd' width='10%'>
                                                    <input type='number' name='quantity' min='1' className='form-control qty_box quantity_2' value={item.quantity}
                                                        onChange={(e) =>
                                                            handleQuantityChange(index, e.target.value)
                                                        }></input>
                                                </td>
                                                <td id='0' className='amount text-center pd' width='10%'>
                                                    <input type='text' name='amount' className='form-control' disabled style={{ paddingLeft: 0, paddingRight: '7px' }} value={item.total !== '' ? ` ${item.total.toFixed(2)}` : ''}></input>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
