import { useContext, useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthContext";
import Swal from "sweetalert2";

const AssetList = () => {
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: assets = [], refetch } = useQuery({
        queryKey: ['assets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets?email=${user?.email}`)
            return res.data;
        }
    })

    // DELETE ASSET
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This asset will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e63946",
            cancelButtonColor: "#457b9d",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/assets/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Asset has been removed.", "success");
                    refetch();
                }
            }
        });
    };

    // EDIT ASSET
    const handleEdit = (asset) => {
        Swal.fire({
            title: "Edit Asset",
            html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${asset.productName}" />
        <input id="quantity" class="swal2-input" placeholder="Quantity" value="${asset.productQuantity}" />
      `,
            showCancelButton: true,
            confirmButtonText: "Update",
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById("name").value;
                const quantity = document.getElementById("quantity").value;

                if (!name || !quantity) {
                    Swal.showValidationMessage("All fields are required");
                }

                return { name, quantity };
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { name, quantity } = result.value;

                const res = await axiosSecure.put(`/assets/${asset._id}`, {
                    productName: name,
                    productQuantity: quantity,
                });

                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Asset updated successfully.", "success");
                    refetch();
                }
            }
        });
    };

    // Filtered search
    const filteredAssets = assets?.filter((item) =>
        item?.productName?.toLowerCase().includes(search?.toLowerCase())
    );

    return (
        <div className="lg:ml-[350px] mt-20 lg:mt-10 h-screen lg:pr-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl text-center font-bold text-gray-800">Asset List</h1>

                {/* Search Bar */}
                <div className="relative w-72">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white shadow-sm focus:ring focus:ring-blue-200 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-xl">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Date Added</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAssets.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500 text-lg">
                                    🚫 No products found
                                </td>
                            </tr>
                        ) : (
                            filteredAssets.map((asset, index) => (
                                <tr
                                    key={asset._id}
                                    className={`${index !== filteredAssets.length - 1 ? "border-b" : ""} hover:bg-gray-50`}
                                >
                                    <td className="p-4">
                                        <img
                                            src={asset.productImage}
                                            alt={asset.productName}
                                            className="w-14 h-14 rounded-md object-cover border"
                                        />
                                    </td>
                                    <td className="p-4 font-medium">{asset.productName}</td>
                                    <td className="p-4">{asset.productType}</td>
                                    <td className="p-4">{asset.productQuantity}</td>
                                    <td className="p-4">{asset.dateAdded}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleEdit(asset)}
                                                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(asset._id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;