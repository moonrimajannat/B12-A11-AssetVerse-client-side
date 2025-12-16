import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";
import HrRegister from "../pages/HrRegister";
import EmployeeRegister from "../pages/EmployeeRegister";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import HrDashboard from "../Layouts/HrDashboard";
import EmployeeDashboard from "../Layouts/EmployeeDashboard";


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
    {
        path: "hrDashboard",
        element: <HrDashboard></HrDashboard>,
        children: [
            {
                path: "assetList",
                element: <Home/>
            },
            {
                path: "addAsset",
                element: <Home/>
            },
            {
                path: "allRequests",
                element: <Home/>
            },
            {
                path: "employeeList",
                element: <Home/>
            },
            {
                path: "upgradePackage",
                element: <Home/>
            },
            {
                path: "profile",
                element: <Home/>
            },

        ]
    },
    {
        path: "employeeDashboard",
        element: <EmployeeDashboard></EmployeeDashboard>,
        children: [
            {
                path: "myAssets",
                element: <Home/>
            },
            {
                path: "myTeam",
                element: <Home/>
            },
            {
                path: "requestAsset",
                element: <Home/>
            },
            {
                path: "profile",
                element: <Home/>
            },
        ]
    },
]);

export default router;