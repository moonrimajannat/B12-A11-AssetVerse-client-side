import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ProfileImage from "../../Layouts/HrDashboard/Profile/ProfileImage";
import EditProfileModal from "../../Layouts/HrDashboard/Profile/EditProfileModal";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [openModal, setOpenModal] = useState(false);

    const { data: profile = {}, refetch } = useQuery({
        queryKey: ["profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    // Fetch companies user belongs to
    const { data: companies = [] } = useQuery({
        queryKey: ["my-companies", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-companies?email=${user?.email}`);
            return res.data;
        },
    });

    return (
        <div className="lg:ml-64 mx-auto mt-16 lg:px-6">
            {/* Header */}
            <div className="flex flex-col items-center">
                <ProfileImage />
            </div>

            {/* Personal Info */}
            <div className="lg:ml-20">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="btn btn-sm btn-outline"
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p><strong>Full Name:</strong> {profile?.name}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Company Name:</strong> {profile?.companyName}</p>
                    <p><strong>Date Of Birth:</strong> {profile?.dateOfBirth || "N/A"}</p>
                </div>
            </div>

            {/* Company Affiliations */}
            {
                profile?.role === "employee" && (
                    <div className="lg:ml-20 mt-10">
                        <h3 className="text-lg font-semibold mb-3">Company Affiliations</h3>

                        <p className="text-gray-500">
                            {companies && companies.length > 0
                                ? companies.map(c => c.companyName).join(" , ")
                                : "No company affiliations"}
                        </p>
                    </div>
                )
            }

            {/* Modal */}
            {
                openModal && (
                    <EditProfileModal
                        profile={profile}
                        onClose={() => setOpenModal(false)}
                        refetch={refetch}
                    />
                )
            }
        </div >
    );
};

export default Profile;
