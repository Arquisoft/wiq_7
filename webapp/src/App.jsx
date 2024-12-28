import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  AddUser,
  Login,
  DashboardLayout,
  Error,
  PlayContainer,
  PlayGame1,
  PlayGame2,
  Ranking,
  Stats,
  Profile,
  Admin,
} from './pages';

import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as adminLoader } from './pages/Admin';
import { loader as game1Loader } from './pages/PlayGame1';
import { loader as game2Loader } from './pages/PlayGame2';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <AddUser />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <PlayContainer />,
          },
          {
            path: 'game1',
            element: <PlayGame1 />,
            loader: game1Loader,
          },
          {
            path: 'game2',
            element: <PlayGame2 />,
            loader: game2Loader,
          },
          {
            path: 'ranking',
            element: <Ranking />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
