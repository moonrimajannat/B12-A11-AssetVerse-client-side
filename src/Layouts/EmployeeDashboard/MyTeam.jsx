import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";

const MyTeam = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [selectedCompany, setSelectedCompany] = useState("");

    // Fetch companies user belongs to
    const { data: companies = [] } = useQuery({
        queryKey: ["my-companies", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-companies?email=${user?.email}`);
            return res.data;
        },
    });

    // Fetch team members
    const { data: team = [] } = useQuery({
        queryKey: ["my-team", selectedCompany],
        enabled: !!selectedCompany,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-team?company=${selectedCompany}`
            );
            return res.data;
        },
    });

    // Upcoming birthdays (current month)
    const currentMonth = new Date().getMonth();
    const upcomingBirthdays = team.filter(emp => {
        if (!emp.dob) return false;
        return new Date(emp.dob).getMonth() === currentMonth;
    });

    return (
        <div className="lg:ml-[350px] mt-16 p-6">
            <h2 className="text-2xl font-bold mb-6">My Team</h2>

            {/* Company Selector */}
            <div className="mb-6 max-w-sm">
                <select
                    className="select select-bordered outline-0 w-full"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                >
                    <option value="">Select Company</option>
                    {companies.map(c => (
                        <option key={c.companyName} value={c.companyName}>
                            {c.companyName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team
                    .filter(emp => emp.email !== user?.email)
                    .map(emp => (
                        <div
                            key={emp.email}
                            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={emp.photo || "/avatar.png"}
                                alt={emp.name}
                                className="w-20 h-20 rounded-full mx-auto"
                            />

                            <div className="text-center mt-4">
                                <h3 className="font-semibold text-lg">{emp.name}</h3>
                                <p className="text-sm text-gray-500">{emp.position}</p>
                                <p className="text-xs text-gray-400 mt-1">{emp.email}</p>
                            </div>
                        </div>
                    ))}

                {selectedCompany && team.length === 1 && (
                    <p className="text-gray-500 col-span-full text-center">
                        No team members found
                    </p>
                )}
            </div>

            {/* Upcoming Birthdays */}
            {upcomingBirthdays.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4">
                        🎉 Upcoming Birthdays (This Month)
                    </h3>

                    <div className="bg-white border rounded-lg p-4">
                        {upcomingBirthdays.map(emp => (
                            <div
                                key={emp.email}
                                className="flex items-center gap-4 py-2 border-b last:border-none"
                            >
                                <img
                                    src={emp.photo || "/avatar.png"}
                                    className="w-10 h-10 rounded-full"
                                    alt=""
                                />
                                <div>
                                    <p className="font-medium">{emp.name}</p>
                                    <p className="text-sm text-gray-500">
                                        🎂 {new Date(emp.dob).toDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTeam;