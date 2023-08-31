import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Task_space from './pages/Task_space';
import StartPage from './pages/StartPage';
import Layout from "./components/Layout"
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import {RequireAuth, authLoader} from './hoc/RequireAuth';




const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<StartPage/>}/>
    <Route path="task_space" loader={authLoader} element={
      <RequireAuth>
        <Task_space/>
      </RequireAuth>
    }/>
    <Route path="auth" element={<Authorization/>}/>
    <Route path="registration" element={<Registration/>}/>
  </Route>
));



function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App;
