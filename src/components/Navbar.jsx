import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png"

const Navbar = () => {
    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar max-w-[1380px] lg:mx-auto">
                {/* Mobile  */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li>
                                <a>Join as Employee</a>
                                <ul className="p-2">
                                    <li><NavLink to="/employeeDashboard/myAssets">My Assets</NavLink></li>
                                    <li><NavLink to="/employeeDashboard/myTeam">My Team</NavLink></li>
                                    <li><NavLink to="/employeeDashboard/requestAsset">Request Asset</NavLink></li>
                                    <li><NavLink to="/employeeDashboard/profile">Profile</NavLink></li>
                                </ul>
                            </li>
                            <li>
                                <a>Join as HR Manager</a>
                                <ul className="p-2">
                                    <li><NavLink to="/hrDashboard/assetList">Asset List</NavLink></li>
                                    <li><NavLink to="/hrDashboard/addAsset">Add Asset</NavLink></li>
                                    <li><NavLink to="/hrDashboard/allRequests">All Requests</NavLink></li>
                                    <li><NavLink to="/hrDashboard/employeeList">Employee List</NavLink></li>
                                    <li><NavLink to="/hrDashboard/profile">Profile</NavLink></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link to="/"><img className="w-[82px]" src={logo} alt="logo" /></Link>
                </div>


                {/* Desktop  */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li>
                            <details>
                                <summary>Join as Employee</summary>
                                <ul className="p-2">
                                    <li><NavLink to="/employeeDashboard/myAssets">My Assets</NavLink></li>
                                    <li><NavLink to="/employeeDashboard/myTeam">My Team</NavLink></li>
                                    <li><NavLink to="/employeeDashboard/requestAsset">Request Asset</NavLink></li>
                                    <li><NavLink to="/employeeDashboard/profile">Profile</NavLink></li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>Join as HR Manager</summary>
                                <ul className="p-2">
                                    <li><NavLink to="/hrDashboard/assetList">Asset List</NavLink></li>
                                    <li><NavLink to="/hrDashboard/addAsset">Add Asset</NavLink></li>
                                    <li><NavLink to="/hrDashboard/allRequests">All Requests</NavLink></li>
                                    <li><NavLink to="/hrDashboard/employeeList">Employee List</NavLink></li>
                                    <li><NavLink to="/hrDashboard/profile">Profile</NavLink></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                {/* login register  */}
                <div className="navbar-end">
                    <Link to="/login" className="btn btn-outline btn-info mr-3">
                        Login
                    </Link>

                    <div className="dropdown dropdown-end mr-3">
                        <div tabIndex={0} role="button" className="btn btn-info m-1">Register</div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-blue-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <NavLink to="/hr-register"><li><a>HR</a></li></NavLink>
                            <NavLink to="/employee-register"><li><a>Employee</a></li></NavLink>
                        </ul>
                    </div>
                </div>

                {/* avater  */}
                <div role="button" className="cursor-default btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;