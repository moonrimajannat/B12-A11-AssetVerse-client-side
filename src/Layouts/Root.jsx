import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Root = () => {
    const location = useLocation();
    const noHeader = location.pathname.includes('login') || location.pathname.includes('employee-register') ||
        location.pathname.includes('hr-register');
    return (
        <div>
            {noHeader || <Navbar></Navbar>}
            <Outlet></Outlet>
            <Footer />
        </div>
    );
}

export default Root;