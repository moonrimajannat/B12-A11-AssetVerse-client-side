import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddAsset = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
        try {
            
            const imageFile = { image: data.productImage[0] };
            const imgRes = await axiosPublic.post(imageHostingApi, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            if (imgRes.data.success) {
                const assetInfo = {
                    productName: data.productName,
                    productImage: imgRes.data.data.display_url,
                    productType: data.productType,
                    productQuantity: parseInt(data.productQuantity),
                    availableQuantity: parseInt(data.productQuantity),
                    dateAdded: new Date().toISOString().split("T")[0],
                    hrEmail: user?.email,
                    companyName: user?.companyName || "N/A",
                };

                const res = await axiosSecure.post("/assets", assetInfo);

                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Asset added successfully!",
                    });
                    reset();
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to add asset",
            });
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-16 bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-5">Add New Asset</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        {...register("productName", { required: true })}
                        className="input outline-0 input-bordered w-full"
                        placeholder="Enter product name"
                    />
                    {errors.productName && (
                        <span className="text-red-500 text-sm">
                            Product name is required
                        </span>
                    )}
                </div>

                {/* Product Image */}
                <div>
                    <label className="block font-medium mb-1">Product Image</label>
                    <input
                        type="file"
                        {...register("productImage", { required: true })}
                        className="file-input outline-0 file-input-bordered w-full"
                    />
                    {errors.productImage && (
                        <span className="text-red-500 text-sm">
                            Product image is required
                        </span>
                    )}
                </div>

                {/* Product Type */}
                <div>
                    <label className="block font-medium mb-1">Product Type</label>
                    <select
                        {...register("productType", { required: true })}
                        className="select outline-0 select-bordered w-full"
                    >
                        <option value="">Select type</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                    {errors.productType && (
                        <span className="text-red-500 text-sm">
                            Product type is required
                        </span>
                    )}
                </div>

                {/* Product Quantity */}
                <div>
                    <label className="block font-medium mb-1">Product Quantity</label>
                    <input
                        type="number"
                        {...register("productQuantity", {
                            required: true,
                            min: 1,
                        })}
                        className="input outline-0 input-bordered w-full"
                        placeholder="Enter quantity"
                    />
                    {errors.productQuantity && (
                        <span className="text-red-500 text-sm">
                            Quantity must be at least 1
                        </span>
                    )}
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full">
                    Add Asset
                </button>
            </form>
        </div>
    );
};

export default AddAsset;