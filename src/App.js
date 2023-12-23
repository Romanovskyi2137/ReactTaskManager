import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Current from './pages/Current';
import StartPage from './pages/StartPage';
import Layout from "./components/Layout"
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import {RequireAuth} from './hoc/RequireAuth';
import TodayPage from './pages/TodayPage';
import Completed from './pages/Completed';
import Urgently from './pages/Urgently';
import Major from './pages/Major';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"




const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<StartPage/>}/>
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
    <Route path="auth" element={<Authorization/>}/>
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
