import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";
import HrRegister from "../pages/HrRegister";
import EmployeeRegister from "../pages/EmployeeRegister";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/hr-register",
                element: <HrRegister></HrRegister>,
            },
            {
                path: "/employee-register",
                element: <EmployeeRegister></EmployeeRegister>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },

        ]
    },
]);

export default router;