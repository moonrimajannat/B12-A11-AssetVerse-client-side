import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink, Outlet } from "react-router";
import { TiArrowForwardOutline } from "react-icons/ti";
import { GrMenu } from "react-icons/gr";

const HrDashboard = () => {
    const user = "Moon";
    const [sidebar, setSidebar] = useState(false)

    const navlinks = <>
        <li>
            <NavLink to="/hrDashboard/assetList" className={({ isActive, isPending }) =>
                isActive ? "active rounded-lg py-2 pl-3 pr-[70px] bg-blue-800 text-white" : isPending ? "pending" : ""}>
                <TiArrowForwardOutline className="text-xl inline"/> Asset List
            </NavLink>
        </li>
        <li>
            <NavLink to="/hrDashboard/addAsset" className={({ isActive, isPending }) =>
                isActive ? "active rounded-lg py-2 pl-3 pr-[70px] bg-blue-800 text-white" : isPending ? "pending" : ""}>
                <TiArrowForwardOutline className="text-xl inline"/> Add an Asset
            </NavLink>
        </li>
        <li>
            <NavLink to="/hrDashboard/allRequests" className={({ isActive, isPending }) =>
                isActive ? "active rounded-lg py-2 pl-3 pr-[70px] bg-blue-800 text-white" : isPending ? "pending" : ""}>
                <TiArrowForwardOutline className="text-xl inline"/> All Requests
            </NavLink>
        </li>
        <li>
            <NavLink to="/hrDashboard/employeeList" className={({ isActive, isPending }) =>
                isActive ? "active rounded-lg py-2 pl-3 pr-[70px] bg-blue-800 text-white" : isPending ? "pending" : ""}>
                <TiArrowForwardOutline className="text-xl inline"/> My Employee List
            </NavLink>
        </li>
        <li>
            <NavLink to="/hrDashboard/upgradePackage" className={({ isActive, isPending }) =>
                isActive ? "active rounded-lg py-2 pl-3 pr-[70px] bg-blue-800 text-white" : isPending ? "pending" : ""}>
                <TiArrowForwardOutline className="text-xl inline"/> Upgrade Package
            </NavLink>
        </li>
        <li>
            <NavLink to="/hrDashboard/profile" className={({ isActive, isPending }) =>
                isActive ? "active rounded-lg py-2 pl-3 pr-[70px] bg-blue-800 text-white" : isPending ? "pending" : ""}>
                <FaRegUser className="text-lg inline mb-2"/> Profile
            </NavLink>
        </li>

        <div className="divider divider-neutral"></div>
        <li>
            <NavLink to="/">
                <div className="flex items-center font-bold gap-1">
                    <IoHomeOutline className="text-xl mb-1" />
                    Home
                </div>
            </NavLink>
        </li>
    </>

    return (
        <div className="flex bg-blue-100 lg:p-0 p-5">
            <div className="absolute z-10 top-0 left-0">
                {
                    sidebar ? <div className="w-[320px] min-h-screen fixed bg-blue-200">
                        <div className="p-5 pt-20">
                            <div className="mb-12">
                                {
                                    user.photoURL ?
                                        <img className="w-[70px] h-[70px] mx-auto rounded-full" src={user.photoURL} /> :
                                        <img className="w-[70px] h-[70px] mx-auto rounded-full" src="https://i.ibb.co/VC1vhmp/user.png" />
                                }
                                <p className="text-xl text-center mt-2 font-semibold">{user.displayName}</p>
                            </div>
                            <ul className="font-bold flex flex-col gap-4">
                                {navlinks}
                            </ul>
                        </div>
                    </div> : ""
                }
            </div>
            
            <div className="hidden lg:block w-[320px] fixed min-h-screen bg-blue-200">
                <div className="p-5 mt-20">
                    <div className="mb-12">
                        {
                            user.photoURL ?
                                <img className="w-[70px] h-[70px] mx-auto rounded-full" src={user.photoURL} /> :
                                <img className="w-[70px] h-[70px] mx-auto rounded-full" src="https://i.ibb.co/VC1vhmp/user.png" />
                        }
                        <p className="text-xl text-center mt-2 font-semibold">{user.displayName}</p>
                    </div>
                    <ul className="font-bold flex flex-col gap-4">
                        {navlinks}
                    </ul>
                </div>
            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>
             <button onClick={() => setSidebar(!sidebar)} className="btn lg:hidden block text-white text-xl btn-info"><GrMenu /></button>
        </div>
    );
};

export default HrDashboard;