import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import { Snackbar } from '@mui/material';
import { AddQuestionContainer } from '../components';
import { UnauthenticatedError } from '../errors/customErrors.js';

const apiEndpoint =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

export const loader = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${apiEndpoint}/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMsg = error || 'An error occurred';
    localStorage.setItem('admLoaderError', errorMsg);
    return null;
  }
};

const Admin = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const admLoaderError = localStorage.getItem('admLoaderError');
    if (admLoaderError) {
      setError(admLoaderError);
      setOpenSnackbar(true);
      localStorage.removeItem('admLoaderError');
    }
    try {
      if (user.role !== 'admin')
        throw new UnauthenticatedError(
          'You are not authorized to view this page'
        );
    } catch (error) {
      setError(error);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  }, [navigate]);

  return (
    <Wrapper>
      {!error && <AddQuestionContainer />}
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          message={`Error: ${error}`}
        />
      )}
    </Wrapper>
  );
};

export default Admin;
