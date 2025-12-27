import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home";
import HrRegister from "../pages/HrRegister";
import EmployeeRegister from "../pages/EmployeeRegister";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import HrDashboard from "../Layouts/HrDashboard/HrDashboard";
import EmployeeDashboard from "../Layouts/EmployeeDashboard/EmployeeDashboard";
import AssetList from "../Layouts/HrDashboard/AssetList";
import AddAsset from "../Layouts/HrDashboard/AddAsset";
import AllRequests from "../Layouts/HrDashboard/AllRequests";
import EmployeeList from "../Layouts/HrDashboard/EmployeeList";
import UpgradePackage from "../Layouts/HrDashboard/UpgradePackage";
import Profile from "../components/Shared/Profile";
import MyAssets from "../Layouts/EmployeeDashboard/MyAssets";
import MyTeam from "../Layouts/EmployeeDashboard/MyTeam";
import RequestAsset from "../Layouts/EmployeeDashboard/RequestAsset";


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
                element: <AssetList/>
            },
            {
                path: "addAsset",
                element: <AddAsset/>
            },
            {
                path: "allRequests",
                element: <AllRequests/>
            },
            {
                path: "employeeList",
                element: <EmployeeList/>
            },
            {
                path: "upgradePackage",
                element: <UpgradePackage/>
            },
            {
                path: "profile",
                element: <Profile/>
            },

        ]
    },
    {
        path: "employeeDashboard",
        element: <EmployeeDashboard></EmployeeDashboard>,
        children: [
            {
                path: "myAssets",
                element: <MyAssets/>
            },
            {
                path: "myTeam",
                element: <MyTeam/>
            },
            {
                path: "requestAsset",
                element: <RequestAsset/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
        ]
    },
]);

export default router;