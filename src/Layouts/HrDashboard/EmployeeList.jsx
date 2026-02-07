import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";

const EmployeeList = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: employees = [], refetch } = useQuery({
        queryKey: ["employees", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employees?hrEmail=${user?.email}`);
            return res.data;
        }
    });

    const handleRemove = async (employee) => {
        const confirm = await Swal.fire({
            title: "Remove employee?",
            text: "This employee will be removed from your team",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove",
        });

        if (!confirm.isConfirmed) return;

        const res = await axiosSecure.patch(
            `/employees/remove/${employee._id}`
        );

        if (res.data.modifiedCount > 0) {
            Swal.fire("Removed!", "Employee removed from team", "success");
            refetch();
        }
    };

    return (
        <div className="lg:ml-[350px] mt-16 p-6">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">My Employee List</h2>
                <p className="text-sm font-medium">
                    {employees.length} / 10 employees used
                </p>
            </div>

            <div className="overflow-x-auto bg-white border shadow rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Email</th>
                            <th>Join Date</th>
                            <th>Assets</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp._id}>
                                <td className="flex items-center gap-3">
                                    <img
                                        src={emp.employeePhoto || "/avatar.png"}
                                        alt="profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-medium">{emp.employeeName}</span>
                                </td>

                                <td>{emp.employeeEmail}</td>
                                <td>{emp.affiliationDate}</td>
                                <td>
                                    <span className="badge badge-info">
                                        {emp.assetsCount}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <button
                                        onClick={() => handleRemove(emp)}
                                        disabled={emp.status === "inactive"}
                                        className={`btn btn-xs 
    ${emp.status === "inactive" ? "btn-disabled" : "btn-error"}
  `}
                                    >
                                        {emp.status === "inactive" ? "Removed" : "Remove"}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6">
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
