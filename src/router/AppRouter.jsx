
import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Box, CssBaseline, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { useAuth } from '../auth/context'
import { LoginPage } from '../auth/pages/LoginPage';
import { Sidebar } from '../ui/components';
import { AdminRoutes } from '../admin/routes/AdminRoutes';


export const AppRouter = () => {
    let { authData } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    if(authData == null) {
      return(
        <>
          <Routes>
  
              <Route path='/*' element={<LoginPage/>}/>

          </Routes>
        </>
      );
    }
    if(isMobile){
      return (
        <>
          <Sidebar />
          <AdminRoutes />
        </>
      )
    }
    return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
      >
        <Toolbar /> 
        <AdminRoutes />
      </Box>
    </Box>
      )
}

