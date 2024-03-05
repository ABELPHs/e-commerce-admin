import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Box } from '@mui/material';
import { useNavigate }  from 'react-router-dom';

export const OrdersTable = ({ sales }) => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Orders List</Typography>
        <TableContainer>
          <Table aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id} onClick={() => {
                  navigate(`/order/${sale.id}`)
              }} className='pointer'>
                  <TableCell>
                  {sale.id}
                  </TableCell>
                  <TableCell>{sale.user_name}</TableCell>
                  <TableCell>{sale.items || 'N/A'}</TableCell>
                  <TableCell>${sale.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
