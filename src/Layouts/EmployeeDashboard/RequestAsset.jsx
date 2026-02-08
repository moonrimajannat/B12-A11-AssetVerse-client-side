import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthContext";

const RequestAsset = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState("");

    const { data: assets = [], refetch } = useQuery({
        queryKey: ['assets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets?email=${user?.email}`)
            return res.data;
        }
    })

    const handleRequest = (asset) => {
        setSelectedAsset(asset);
    };


    const submitRequest = async () => {
        if (!selectedAsset) return;

        const requestData = {
            assetId: selectedAsset._id,
            assetName: selectedAsset.productName,
            assetType: selectedAsset.productType,
            assetImage: selectedAsset.productImage,
            employeeName: user?.displayName,
            requesterEmail: user?.email,
            hrEmail: selectedAsset.hrEmail,
            companyName: selectedAsset.companyName,
            requestDate: new Date().toISOString().split("T")[0],
            requestStatus: "pending",
            note: note || "",
            processedBy: selectedAsset.hrEmail,
            approvalDate: null,
        };

        try {
            const res = await axiosSecure.post("/asset-requests", requestData);

            if (res.data.insertedId) {
                Swal.fire("Success", "Asset request submitted", "success");
                setSelectedAsset(null);
                setNote("");
                refetch();
            }
        } catch (err) {
            console.error(err);
            const message =
                err.response?.data?.message || "Something went wrong";
            Swal.fire("Error", message, "error");
        }
    };


    return (
        <div className="lg:ml-[350px] mt-16 p-6">
            <h2 className="text-2xl font-semibold mb-6">Request an Asset</h2>

            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {assets?.filter(asset => asset.availableQuantity > 0)
                    .map(asset => (
                        <div
                            key={asset.productName}
                            className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
                        >
                            <img
                                src={asset.productImage}
                                alt={asset.productName}
                                className="h-32 w-full object-cover rounded"
                            />

                            <h3 className="text-lg font-semibold mt-3">
                                {asset.productName}
                            </h3>

                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Type:</span> {asset.productType}
                            </p>

                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Available:</span> {asset.availableQuantity}
                            </p>

                            <button
                                onClick={() => handleRequest(asset)}
                                className="btn btn-primary w-full mt-4"
                            >
                                Request
                            </button>
                        </div>
                    ))}
            </div>

            {/* Request Modal */}
            {selectedAsset && (
                <div className="fixed inset-0 z-50 flex items-center justify-center
                  bg-black/40 backdrop-blur-sm
                  transition-opacity duration-300">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Request {selectedAsset.assetName}
                        </h3>

                        <textarea
                            placeholder="Write a note (optional)"
                            className="textarea textarea-bordered w-full mt-3"
                            rows="4"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setSelectedAsset(null)}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitRequest}
                                className="btn btn-primary"
                            >
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestAsset;
