import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { MainPage, OrderPage, OrdersPage, ProductEdit, ProductView, ProductsPage } from '../pages'
import { CreateProductPage } from '../pages/CreateProductPage';

export const AdminRoutes = () => {
  const {pathname, search} = useLocation();
  const lastPath = pathname + search;
  localStorage.setItem('lastPath',lastPath);
  return (
    <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/product' element={<ProductsPage/>}/>
        <Route path='/product/new' element={<CreateProductPage/>}/>
        <Route path='/product/:product_id' element={<ProductView/>}/>
        <Route path='/product/:product_id/edit' element={<ProductEdit/>}/>
        <Route path='/order' element={<OrdersPage/>}/>
        <Route path='/order/:sale_id' element={<OrderPage/>}/>
        <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}
