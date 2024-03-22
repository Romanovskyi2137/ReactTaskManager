import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Current from './pages/Current';
import StartPage from './pages/StartPage';
import Layout from "./components/Layout"
import Login from './pages/Login';
import Registration from './pages/Registration';
import {RequireAuth} from './hoc/RequireAuth';
import TodayPage from './pages/TodayPage';
import Completed from './pages/Completed';
import Urgently from './pages/Urgently';
import Major from './pages/Major';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import MenuPage from './pages/MenuPage';




const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<StartPage/>}/>
    <Route path="menu" element={
      <RequireAuth>
        <MenuPage/>
      </RequireAuth>
    }/>
    <Route path="current" element={
      <RequireAuth>
        <Current/>
      </RequireAuth>
    }/>
    <Route path="completed" element={
      <RequireAuth>
        <Completed/>
      </RequireAuth>
    }/>
    <Route path="today" element={
      <RequireAuth>
        <TodayPage/>
      </RequireAuth>
    }/>
    <Route path="urgently" element={
      <RequireAuth>
        <Urgently/>
      </RequireAuth>
    }/>
    <Route path="major" element={
      <RequireAuth>
        <Major/>
      </RequireAuth>
    }/>
    <Route path="login" element={<Login/>}/>
    <Route path="registration" element={<Registration/>}/>
  </Route>
));



function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router}/>
    </LocalizationProvider>
  )
}

export default App;
