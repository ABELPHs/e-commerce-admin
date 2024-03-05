import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../services/api';

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    url: ''
  });
  const [image, setimage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    API.get.productInfo({ product_id }).then((response) => {
      setProduct(response['product_info']);
      setPreviewUrl(response['product_info'].url);
    });
  }, [product_id]);

  const handleInputChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setimage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    API.put.updateProduct({
      description: product['description'],
      name: product['name'],
      price: product['price'],
      stock: product['stock'],
      product_id
  }).then((response) => {
      if(image){
          API.post.updateProductImage({
              product_id: product_id,
              data: image
          }).then((response) => {
              navigate(`/product/${product_id}`);
          });
      }else{
        navigate(`/product/${product_id}`);
      }
  })
  
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h5">Edit Product</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            autoFocus
            inputProps={{ maxLength: 25 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            multiline
            rows={4}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            name="price"
            type="number"
            step="0.01"
            value={product.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleInputChange}
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: '20px' }}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
