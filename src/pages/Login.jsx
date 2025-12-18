import { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthContext";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signinUser, setLogin } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const emailRef = useRef();

    const handleSignin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signinUser(email, password)
            .then(() => {
                Swal.fire("Good job", "Login successful", "success");
                setLogin(true);
                navigate(location?.state ? location.state : "/");
                e.target.reset();
            })
            .catch(error => {
                Swal.fire("Login Error", error.message, "error")
                console.log(error);
            })
    }

    return (
        <div className="flex my-20 items-center gap-20 justify-center p-5">
            <div className="rounded-2xl border-2 border-blue-400 w-full md:w-[500px] p-1">
                <h1 className="text-4xl text-black text-center font-bold my-5">Login</h1>

                <p className="text-sm text-center font-medium my-2">New here ? <Link to="/register"><span className="header text-base">Create a New Account</span></Link></p>

                <form onSubmit={handleSignin} className="px-5 pt-5">
                    <div>
                        <label>
                            <span>Email</span>
                        </label>
                        <div className="relative">
                            <input ref={emailRef} type="email" name="email" placeholder="your email" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none " />
                        </div>
                    </div>

                    <div>
                        <label>
                            <span>Password</span>
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="border-2 px-3 py-2 w-full border-cyan-400 rounded-lg my-2 focus:outline-none" />
                            <span className="absolute top-6 right-4" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                }
                            </span>
                        </div>
                    </div>

                    <div className="mb-2">
                        <a href="#" className="text-sm text-gray-600 hover:underline hover:underline-offset-2 ">Forgot password?</a>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="cursor-pointer w-full py-2 text-white font-medium rounded-lg mb-8 shadow-lg bg-blue-400 hover:bg-blue-500">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;