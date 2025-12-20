import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.png"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const fetchUserData = async () => {
            try {
                const res = await axiosPublic.get(`/users/${user?.email}`);
                setUserData(res.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        fetchUserData();
    }, [user, axiosPublic]);

    console.log(userData?.role);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire("Thank you", "Logout successfull", "success");
                navigate("/");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="bg-blue-100 shadow-sm">
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
                            {/* Employee Menu*/}
                            <li>
                                <Link>Join as Employee</Link>
                                {userData?.role === "employee" && (
                                    <ul className="p-2">
                                        <li><NavLink to="/employeeDashboard/myAssets">My Assets</NavLink></li>
                                        <li><NavLink to="/employeeDashboard/myTeam">My Team</NavLink></li>
                                        <li><NavLink to="/employeeDashboard/requestAsset">Request Asset</NavLink></li>
                                        <li><NavLink to="/employeeDashboard/profile">Profile</NavLink></li>
                                        {user && <li><button onClick={handleLogOut}>Log Out</button></li>}
                                    </ul>
                                )}
                            </li>

                            {/* HR Menu */}
                            <li>
                                <Link>Join as HR Manager</Link>
                                {userData?.role === "hr" && (
                                    <ul className="p-2">
                                        <li><NavLink to="/hrDashboard/assetList">Asset List</NavLink></li>
                                        <li><NavLink to="/hrDashboard/addAsset">Add Asset</NavLink></li>
                                        <li><NavLink to="/hrDashboard/allRequests">All Requests</NavLink></li>
                                        <li><NavLink to="/hrDashboard/employeeList">Employee List</NavLink></li>
                                        <li><NavLink to="/hrDashboard/profile">Profile</NavLink></li>
                                        {user && <li><button onClick={handleLogOut}>Log Out</button></li>}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                    <Link to="/"><img className="w-[82px]" src={logo} alt="logo" /></Link>
                </div>

                {/* Desktop  */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/">Home</NavLink></li>

                        {/* Employee Menu */}
                        <li>
                            <details>
                                <summary>Join as Employee</summary>
                                {userData?.role === "employee" && (
                                    <ul className="p-2">
                                        <li><NavLink to="/employeeDashboard/myAssets">My Assets</NavLink></li>
                                        <li><NavLink to="/employeeDashboard/myTeam">My Team</NavLink></li>
                                        <li><NavLink to="/employeeDashboard/requestAsset">Request Asset</NavLink></li>
                                        <li><NavLink to="/employeeDashboard/profile">Profile</NavLink></li>
                                        {user && (
                                            <li><button onClick={handleLogOut}>Log Out</button></li>
                                        )}
                                    </ul>
                                )}
                            </details>
                        </li>

                        {/* HR Menu */}
                        <li>
                            <details>
                                <summary>Join as HR Manager</summary>
                                {
                                    userData?.role === "hr" && (
                                        <ul className="p-2">
                                            <li><NavLink to="/hrDashboard/assetList">Asset List</NavLink></li>
                                            <li><NavLink to="/hrDashboard/addAsset">Add Asset</NavLink></li>
                                            <li><NavLink to="/hrDashboard/allRequests">All Requests</NavLink></li>
                                            <li><NavLink to="/hrDashboard/employeeList">Employee List</NavLink></li>
                                            <li><NavLink to="/hrDashboard/profile">Profile</NavLink></li>
                                            {user && (
                                                <li><button onClick={handleLogOut}>Log Out</button></li>
                                            )}
                                        </ul>
                                    )}
                            </details>
                        </li>
                    </ul>
                </div>

                {/* login register  */}
                <div className="navbar-end">
                    {
                        user ? "" : (
                            <Link to="/login" className="btn btn-outline btn-info mr-3">
                                Login
                            </Link>
                        )
                    }

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-info m-1">Register</div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-blue-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <NavLink to="/hr-register"><li><Link>HR</Link></li></NavLink>
                            <NavLink to="/employee-register"><li><Link>Employee</Link></li></NavLink>
                        </ul>
                    </div>
                </div>

                {/* avater  */}
                {
                    user ? (
                        <div className="group">
                            <img
                                className="w-[45px] h-[45px] mx-3 rounded-full object-cover"
                                src={
                                    user?.photoURL
                                        ? user.photoURL
                                        : "https://i.ibb.co/VC1vhmp/user.png"
                                }
                                alt="user"
                            />
                        </div>
                    ) : ""
                }
            </div>
        </div>
    );
};

export default Navbar;