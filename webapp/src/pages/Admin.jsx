import { useLoaderData, redirect } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/StatsContainer';
import { AddQuestionContainer } from '../components';

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
    console.log('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { user } = useLoaderData();

  return <AddQuestionContainer />;
};

export default Admin;
