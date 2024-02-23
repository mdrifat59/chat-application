import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route  path="/" element={<Registration />}>  </Route>
      <Route  path="/login" element={<Login />}>  </Route>
      <Route  path="/forgotpassword" element={<ForgotPassword />}>  </Route>
    </Route>
  )
);

function App() { 

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
