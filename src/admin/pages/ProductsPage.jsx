import React, { useEffect, useState } from "react";
import {Box, Button} from '@mui/material';
import { API } from "../../services/api";
import { ProductsTable } from "../components";
import { useNavigate }  from 'react-router-dom';

export const ProductsPage = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const goToCreation = () => {
        navigate('/product/new');
    } 

  useEffect(() => {
    API.get.products().then((response) => {
        setProducts(response.products)
    });

  }, []);

  return (
    <div>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button variant="contained" onClick={goToCreation}>Create New Product</Button>
            </Box>
            <ProductsTable products={products} />
        </Box>
    </div>
  );

}