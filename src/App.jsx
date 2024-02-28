import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from "./pages/Message";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route  path="/" element={<Registration />}>  </Route>
      <Route  path="/login" element={<Login />}>  </Route>
      <Route  path="/forgotpassword" element={<ForgotPassword />}>  </Route>
      <Route  path="/chat" element={<RootLayout />}> 
        <Route  path="home" element={<Home />}>  </Route>
        <Route  path="message" element={<Message />}>  </Route>
       </Route>
    </Route>
  )
);

function App() { 

  return (
    <>
      <ToastContainer
  position="bottom-center"
  autoClose={5000}
  limit={1}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  transition: Slide
  />

       <RouterProvider router={router} />
    </>
  )
}

export default App
