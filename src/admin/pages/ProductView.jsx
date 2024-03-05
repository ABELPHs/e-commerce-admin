import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { API } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export const ProductView = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const [salesStatus, setSalesStatus] = useState({});

  useEffect(() => {
    API.get.productInfo({
      product_id
    }).then((response) => {
      setProductInfo(response['product_info']);
      setSalesStatus(response['sales_status']);
    });
  }, [product_id]); 

  const handleEdit = () => {
    navigate(`/product/${productInfo.id}/edit`); 
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">{productInfo.name}</Typography>
          <Button variant="contained" onClick={handleEdit}>
            Edit Product
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={productInfo.url} alt={productInfo.name} style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              {productInfo.description}
            </Typography>
            <Typography variant="body1">Price: ${productInfo.price}</Typography>
            <Typography variant="body1">Stock: {productInfo.stock}</Typography>
            <Typography variant="body1">
              Sold: {salesStatus.selled_number} units for ${salesStatus.selled_money}
            </Typography>
            <Typography variant="body1">
              Created at: {new Date(productInfo.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              Last updated: {new Date(productInfo.updated_at).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
