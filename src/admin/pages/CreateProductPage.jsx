import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { API } from '../../services/api';
import { useNavigate }  from 'react-router-dom';

export const CreateProductPage = ({ onProductCreate }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    
    API.post.createProduct({
        description,
        name,
        price,
        stock
    }).then((response) => {
        if(image){
            API.post.updateProductImage({
                product_id: response.product['id'],
                data: image
            }).then((response) => {
                navigate('/product');
            });
        }else{
            navigate('/product');
        }
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">Create New Product</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            inputProps={{ maxLength: 25 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: '20px' }}
          />
          {previewUrl && <img src={previewUrl} alt="Preview" style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }} />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
