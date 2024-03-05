import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Avatar } from '@mui/material';
import { useNavigate }  from 'react-router-dom';

export const ProductsTable = ({ products }) => {
    const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" component="div">
            Products List
            </Typography>
        </Box>
        <Table aria-label="products table">
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {products.map((product) => (
                <TableRow key={product.id} onClick={() => {
                    navigate(`/product/${product.id}`)
                }} className='pointer'>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                    <Box
                    sx={{
                        display: 'flex', justifyContent: 'left', alignContent: 'center', alignItems: 'center'
                        }}>
                            <Avatar src={product.url} alt={product.name} variant="square" sx={{ width: 56, height: 56 }} />
                        <Box paddingLeft={'10px'}>
                        {product.name}
                        </Box>
                    </Box>
                    </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};

