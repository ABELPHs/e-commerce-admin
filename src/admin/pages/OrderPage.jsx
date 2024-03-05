import React, { useEffect, useState } from 'react';
import { Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../services/api';

export const OrderPage = () => {
  const { sale_id } = useParams();
  const [order, useOrder] = useState({});
  const [products, useProducts] = useState([]);
  
  useEffect(()=> {
    API.get.orderInfo({
      sale_id
    }).then((response) => {
      useOrder(response['order']);
      useProducts(response['products']);
    })
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Order Details</Typography>
        <Typography variant="body1">Order ID: {order.id}</Typography>
        <Typography variant="body1">User Name: {order.user_name}</Typography>
        <Typography variant="body1">Total Items: {order.items}</Typography>
        <Typography variant="body1">Total Price: ${order.price}</Typography>
        <Typography variant="body1">Created At: {new Date(order.created_at).toLocaleString()}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Products in Order</Typography>
        <TableContainer>
          <Table aria-label="order products">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar src={product.url} alt={product.name} sx={{ width: 56, height: 56 }} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.order_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
