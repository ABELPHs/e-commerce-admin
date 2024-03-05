import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Card, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import { API } from '../../services/api';
import { useAuth } from '../context';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    API.post.login({
        email,
        password,
      }).then((response) => {
        if(response.token){
          login(response);
          navigate('/');
        }
      });
  };

  return (
    <>
      <CssBaseline /> 
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ p: 4, width: '100%', boxShadow: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">Admin Login</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

