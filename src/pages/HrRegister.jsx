import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";

//img upload
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const HrRegister = () => {
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { name, companyName, image, dateOfBirth, role, packageLimit, currentEmployees, subscription, email, password } = data;

        createUser(email, password)
            .then(async (result) => {

                // Upload image to ImgBB
                const formData = new FormData();
                formData.append("image", image[0]);

                const imgResponse = await axiosPublic.post(img_hosting_api, formData, {
                    headers: { "content-type": "multipart/form-data" },
                });

                if (!imgResponse.data.success) {
                    throw new Error("Image upload failed");
                }

                const imageUrl = imgResponse.data.data.display_url;

                const userInfo = {
                    name: name,
                    companyName: companyName,
                    companyLogo: imageUrl,
                    email: email,
                    password: password,
                    dateOfBirth: dateOfBirth,
                    role: role,
                    packageLimit: parseInt(packageLimit),
                    currentEmployees: parseInt(currentEmployees),
                    subscription: subscription,
                }
                const usersCreate = await axiosPublic.post("/users", userInfo);
                console.log(usersCreate.data);

                if (usersCreate.data) {
                    Swal.fire("Great!", "Registration have completed successfully.", "success");

                    navigate("/");
                }

                reset();
            })
            .catch(error => {
                console.error("Sign-up error:", error);
                Swal.fire("Opps!", error.message, "error");
            })
    };

    return (
        <div className="flex items-center gap-16 my-20 justify-center mb-16 p-5 lg:p-0">
            <div className="rounded-2xl border-2 border-blue-400 w-full md:w-[700px]">
                <h1 className="text-4xl text-black text-center font-bold my-5">HR Register</h1>

                <p className="text-sm font-medium text-center my-2">Already Have an Account ? <Link to="/login"><span className="header text-base">Please Login</span></Link></p>

                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body px-5 md:px-10 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label>
                                <span>Name</span>
                            </label>
                            <div>
                                <input type="text" {...register("name", { required: true })}
                                    name="name" placeholder="Full name" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.name && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Name field is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Company Name</span>
                            </label>
                            <div>
                                <input type="text" {...register("companyName", { required: true })}
                                    name="companyName" placeholder="Company Name" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.companyName && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Company Name field is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Company Logo</span>
                            </label>
                            <div>
                                <input type="file" {...register("image", { required: true })} name="image" placeholder="your photo url" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.image && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Image field is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Email</span>
                            </label>
                            <div>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email@company.com" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.email && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Email address is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z]).*$/ })}
                                    name="password" placeholder="Password" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none" />
                                {errors.password?.type === "required" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password is required.</p>}
                                {errors.password?.type === "minLength" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password must be 6 characters.</p>}
                                {errors.password?.type === "maxLength" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password must be less than 20 characters.</p>}
                                {errors.password?.type === "pattern" && <p className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Password must have one Uppercase and one Lowercase.</p>}

                                <span className="absolute top-5 right-4" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Date Of Birth</span>
                            </label>
                            <div>
                                <input type="date" {...register("dateOfBirth", { required: true })}
                                    name="dateOfBirth" placeholder="Full name" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                                {errors.dateOfBirth && <span className="text-sm text-red-500"><MdError className="mb-0.5 inline" /> Date Of Birth field is required.</span>}
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Role</span>
                            </label>
                            <div>
                                <input type="text" {...register("role", { required: true })}
                                    value="hr"
                                    name="role" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Package Limit</span>
                            </label>
                            <div>
                                <input type="number" {...register("packageLimit", { required: true })}
                                    value="5"
                                    name="packageLimit" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Current Employees</span>
                            </label>
                            <div>
                                <input type="number" {...register("currentEmployees", { required: true })}
                                    value="0"
                                    name="currentEmployees" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                            </div>
                        </div>

                        <div>
                            <label>
                                <span>Subscription</span>
                            </label>
                            <div>
                                <input type="text" {...register("subscription", { required: true })}
                                    value="basic"
                                    name="subscription" className="border-2 px-3 py-2 w-full border-blue-300 rounded-lg my-2 focus:outline-none " />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="cursor-pointer w-full py-2 text-white font-medium rounded-xl mb-8 shadow-lg bg-blue-400 hover:bg-blue-500">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HrRegister;