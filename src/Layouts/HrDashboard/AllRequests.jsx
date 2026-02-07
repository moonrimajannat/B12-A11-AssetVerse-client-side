import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";

const AllRequests = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/asset-requests?email=${user?.email}`)
            return res.data;
        }
    })

    return (
        <div className="lg:ml-[350px] mt-20 lg:mt-10 p-6">
            <h2 className="text-2xl font-bold mb-4">All Asset Requests</h2>

            <div className="overflow-x-auto bg-white border border-gray-200 shadow rounded-lg">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Asset</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.employeeName}</td>
                                <td>{req.assetName}</td>
                                <td>{req.requestDate}</td>

                                <td>
                                    <span className={`badge 
                    ${req.requestStatus === "pending" && "badge-warning"}
                    ${req.requestStatus === "approved" && "badge-success"}
                    ${req.requestStatus === "rejected" && "badge-error"}
                  `}>
                                        {req.requestStatus}
                                    </span>
                                </td>

                                <td className="flex gap-2 justify-center">
                                    {req.requestStatus === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(req)}
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(req._id)}
                                                className="btn btn-xs btn-error"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {req.requestStatus !== "pending" && "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllRequests;
