import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";
import HrRegister from "../pages/HrRegister";
import EmployeeRegister from "../pages/EmployeeRegister";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/> ,
     children: [
            {
                path: "/",
                element: <Home></Home> ,
            },
            {
                path: "/hr-register",
                element: <HrRegister></HrRegister> ,
            },
            {
                path: "/employee-register",
                element: <EmployeeRegister></EmployeeRegister> ,
            },
           
        ]
  },
]);

export default router;