import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About/About'
import PriceList from '../pages/PriceList/PriceList'
import Contact from '../pages/Contact/Contact'
import Products from '../pages/Products/Products'
import Home from '../pages/Home/Home'
import SampleTable from '../pages/SampleTable'
import CrackersModal from '../components/Modal/CrackersModal'
import Admin from '../pages/Admin/Admin'
import EstimateForm from '../pages/Estimate/EstimateForm'
import Layout from '../Layout/Layout'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/about" exact element={<About/>}></Route>
        {/* <Route path="/pricelist" exact element={<PriceList/>}></Route> */}
        <Route path="/contact" exact element={<Contact/>}></Route>
        <Route path="/products" exact element={<Products/>}></Route>

        <Route path="/preview" exact element={<EstimateForm/>}></Route>
        <Route path="/admin" exact element={<Admin/>}></Route>
        <Route path="/sam" exact element={<SampleTable/>}></Route>
      </Route>

    </Routes>
  )
}
