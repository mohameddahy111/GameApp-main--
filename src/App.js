
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './component/MainLayout/MainLayout';
import Home from './component/Home/Home';
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRouts'
import GamesDetails from './component/gamesDetails/GamesDetails'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import NotFound from './component/NotFound/NotFound'
import All from './component/All/All'
import SortBy from './component/SortBy/SortBy';
import Category from './component/Category/Category'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import PlatForms from './component/PlatForm/PlatForms';
function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, [])
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: '/', element: <MainLayout userData={userData} setUserData={setUserData} />, children: [
        { path: 'home', element: <ProtectedRoutes setUserData={setUserData}><Home /></ProtectedRoutes> },
        { path: '/gameDetails/:id', element: <ProtectedRoutes setUserData={setUserData}><GamesDetails /></ProtectedRoutes> },
        { path: '/platform/:platform', element: <ProtectedRoutes setUserData={setUserData}><PlatForms /></ProtectedRoutes> },
        { path: 'register', element: <Register /> },
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: '*', element: <NotFound /> },
        { path: 'all', element: <ProtectedRoutes setUserData={setUserData}><All /></ProtectedRoutes> },
        {path:'sortBy/:sort', element:<ProtectedRoutes setUserData={setUserData}><SortBy/></ProtectedRoutes>},
        {path:'cat/:category', element:<ProtectedRoutes setUserData={setUserData}><Category/></ProtectedRoutes>},
      ]
    }])
  return (<RouterProvider router={routers} />);
}
export default App;
