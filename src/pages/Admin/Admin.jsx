import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/NavBar/Footer/Footer';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Resizer from 'react-image-file-resizer';
import './Admin.css';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const handleDataget = () => {
        axios
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
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAuthenticated(true); // Assume logged in if token is present
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Handle form submission for both add and edit
    const handleData = (data) => {
        const { name, price, category, discount } = data;
        if (selectedImage) {
            if (editMode) {
                updateData(currentItemId, name, price, category, discount, selectedImage);
            } else {
                uploadData(name, price, category, discount, selectedImage);
            }
        } else {
            alert('Please select an image before submitting.');
        }
    };

    const uploadData = (name, price, category, discount, image) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('discount', discount);
        formData.append('image', image);

        axios.post('http://localhost:5001/api/crackers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    alert('Data uploaded successfully!');
                    reset();
                    setSelectedImage(null);
                    handleDataget();
                }
            }).catch((err) => {
                alert('Upload failed!');
            });
    };

    const updateData = (id, name, price, category, discount, image) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('discount', discount);
        formData.append('image', image);

        axios.put(`${import.meta.env.VITE_FRONTEND_URL}/api/crackers/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Data updated successfully!');
                    reset();
                    setSelectedImage(null);
                    handleDataget();
                    setEditMode(false);
                    setCurrentItemId(null);
                }
            })
            .catch((err) => {
                alert('Update failed!');
            });
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this cracker?')) {
            axios.delete(`http://localhost:5001/api/crackers/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        alert('Cracker deleted successfully!');
                        handleDataget();
                    }
                })
                .catch((err) => console.error('Error deleting cracker:', err));
        }
    };

    const handleEditClick = (item) => {
        setEditMode(true);
        setCurrentItemId(item._id);
        reset({
            name: item.name,
            price: item.price,
            category: item.category,
            discount: item.discount,
        });
        setSelectedImage(item.imageUrl); // Optionally set the image
        // Open the modal
        document.querySelector('#exampleModal').classList.add('show');
        document.querySelector('#exampleModal').style.display = 'block';
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            Resizer.imageFileResizer(
                file,
                800,
                800,
                'JPEG',
                80,
                0,
                (uri) => setSelectedImage(uri),
                'blob'
            );
        } else {
            alert('Please upload a valid image (JPG/PNG)');
        }
    };

    if (!isAuthenticated) {
        return <AdminLogin setAuth={setIsAuthenticated} />;
    }

    const renderCategory = (categoryName) => {
        return (
            <>
                <tr className='category_row cart__total' style={{ backgroundColor: '#aab1ff', color: '#FFF', margin: 0, padding: 0 }}>
                    <td colSpan='6'>
                        <h5 style={{ margin: 0, padding: 0 }}>{categoryName.toUpperCase()}</h5>
                    </td>
                </tr>
                {filteredItems
                    ?.filter(item => item.category === categoryName)
                    ?.map((item) => (
                        <tr className='product_row' key={item._id}>
                            <td className='product_image text-center' width='5%'>
                                <img
                                    src={item.imageUrl}
                                    width='50px'
                                    alt=''
                                    onClick={() => handleImageClick(item.imageUrl)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </td>
                            <td id='2' className='product_name text-center'>{item.name}</td>
                            <td className='text-center' width='10%'>Rs
                                <span className='actual_price'> {item.price}</span>
                            </td>
                            <td className='text-center' width='10%'>
                                {item.discount ? `${item.discount}%` : '0%'}
                            </td>
                            {/* Edit and Delete Icons */}
                            <td className='text-center' width='5%'>
                                {/* <p style={{ cursor: 'pointer' }}
                                onClick={() => handleEditClick(item)}>Edit
                                </p> */}
                                <div onClick={() => handleEditClick(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" width='24px' class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>

                            </td>
                            <td className='text-center' width='5%'>
                                {/* <p
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={() => handleDeleteClick(item._id)}>Remove
                                </p> */}
                                <div onClick={() => handleDeleteClick(item._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="crimson" width='24px' class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    ))}
            </>
        );
    };

    return (
        <>
           

            <section id='crackers-modal' className='container'>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                    {editMode ? 'Edit Cracker' : 'Add Crackers'}
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    {editMode ? 'Edit Cracker' : 'Add Crackers'}
                                </h1>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleData)}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="col-form-label">Name:</label>
                                        <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
                                        {errors.name && <span className="text-danger">This field is required</span>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="price" className="col-form-label">Price:</label>
                                        <input type="number" className="form-control" id="price" {...register('price', { required: true })} />
                                        {errors.price && <span className="text-danger">This field is required</span>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="category" className="col-form-label">Category:</label>
                                        <select className="form-control" id="category" {...register('category', { required: true })}>
                                            <option value="">Select Category</option>
                                            <option value="Single Sound Crackers">Single Sound Crackers</option>
                                            <option value="Ground Chakkars">Ground Chakkars</option>
                                            <option value="Fancy Chakkars">Fancy Chakkars</option>
                                            <option value="Flowerpots">Flowerpots</option>
                                            <option value="Fancy Fountains">Fancy Fountains</option>
                                            <option value="Fancy & Novelties">Fancy & Novelties</option>
                                            <option value="Bombs">Bombs</option>
                                            <option value="Loose Crackers">Loose Crackers</option>
                                            <option value="Rockets">Rockets</option>
                                            <option value="Ariel Fancy">Ariel Fancy</option>
                                            <option value="Multiple Color shots">Multiple Color shots</option>
                                            <option value="Sparklers">Sparklers</option>
                                            <option value="Special Sparklers">Special Sparklers</option>
                                            <option value="Twinkling Star">Twinkling Star</option>
                                            <option value="Candle">Candle</option>
                                            <option value="Confetti">Confetti</option>
                                            <option value="Cartoons">Cartoons</option>
                                            <option value="New Items">New Items</option>
                                            <option value="Color Matches">Color Matches</option>
                                            <option value="Deepavali Gun">Deepavali Gun</option>
                                            <option value="Sky Lanterns">Sky Lanterns</option>
                                            <option value="Gift Boxes">Gift Boxes</option>
                                        </select>
                                        {errors.category && <span className="text-danger">This field is required</span>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="discount" className="col-form-label">Discount:</label>
                                        <input type="number" className="form-control" id="discount" {...register('discount')} />
                                    </div>

                                    {!editMode && (
                                        <div className="mb-3">
                                            <label htmlFor="image" className="col-form-label">Image:</label>
                                            <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} />
                                        </div>
                                    )}

                                    <div className="modal-footer">
                                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                        <button type="submit" className="btn btn-primary">{editMode ? 'Update' : 'Submit'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table Section */}
            <div className='container' style={{ marginTop: '' }}>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='shopping-cart-table table-responsive'>
                            <table
                                cellPadding='0'
                                cellSpacing='0'
                                id='example'
                                className='pricelist-table pricelist-products table-styles'
                            >
                                <thead>
                                    <tr style={{ backgroundColor: '#eca1fe', color: '#fff' }}>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Edit</th> {/* New column for edit */}
                                        <th>Delete</th> {/* New column for delete */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderCategory('Single Sound Crackers')}
                                    {renderCategory('Ground Chakkars')}
                                    {renderCategory('Fancy Chakkars')}
                                    {renderCategory('Flowerpots')}
                                    {renderCategory('Fancy Fountains')}
                                    {renderCategory('Fancy & Novelties')}
                                    {renderCategory('Bombs')}
                                    {renderCategory('Loose Crackers')}
                                    {renderCategory('Rockets')}
                                    {renderCategory('Ariel Fancy')}
                                    {renderCategory('Multiple Color shots')}
                                    {renderCategory('Sparklers')}
                                    {renderCategory('Special Sparklers')}
                                    {renderCategory('Twinkling Star')}
                                    {renderCategory('Candle')}
                                    {renderCategory('Confetti')}
                                    {renderCategory('Cartoons')}
                                    {renderCategory('New Items')}
                                    {renderCategory('Color Matches')}
                                    {renderCategory('Deepavali Gun')}
                                    {renderCategory('Sky Lanterns')}
                                    {renderCategory('Gift Boxes')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

          
        </>
    );
}
