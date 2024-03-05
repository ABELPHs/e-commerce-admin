import React, { useEffect, useState } from 'react';
import { OrdersTable } from '../components/OrdersTable';
import {Box, Button} from '@mui/material';
import { API } from '../../services/api';

export const OrdersPage = () => {
  const [sales, useSales] = useState([]);

  useEffect(() => {
    API.get.orders().then((response) => {
      useSales(response['sales']);
    });
  }, []);

  return (
    <div>
        <Box sx={{ width: '100%' }}>
            <OrdersTable sales={sales} />
        </Box>
    </div>
  );
};

