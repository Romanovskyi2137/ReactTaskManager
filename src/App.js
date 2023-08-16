import { createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider } from 'react-router-dom';
import Task_space from './pages/Task_space';
import StartPage from './pages/StartPage';
import Layout from "./components/Layout"
import Authorization from './pages/Authorization';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<StartPage/>}/>
    <Route path="task_space" element={<Task_space/>}/>
    {/* <Route path="" element={}/> */}
    <Route path="auth" element={<Authorization/>}/>
  </Route>
));



function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App;
