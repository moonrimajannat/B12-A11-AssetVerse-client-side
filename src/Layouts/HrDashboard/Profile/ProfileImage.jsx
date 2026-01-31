import { useContext, useRef, useState } from "react";
import edit from "../../../assets/edit.svg";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

// img upload
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const ProfileImage = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [isUploading, setIsUploading] = useState(false);

    const { data: users = {}, refetch } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const avatarSrc = users?.profileImage;

    const fileUploaderRef = useRef();

    const handleImageUpload = (e) => {
        e.preventDefault();
        if (isUploading) return;
        fileUploaderRef.current.click();
    };
    
    const updateImageDisplay = async () => {
        try {
            setIsUploading(true);

            const file = fileUploaderRef.current.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            // Upload to ImgBB
            const imgResponse = await axiosPublic.post(
                img_hosting_api,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (!imgResponse.data.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl = imgResponse.data.data.display_url;

            // Save image URL to DB
             const result = await axiosSecure.put(`/users/profile-image/${user.email}`, {
                profileImage: imageUrl,
            });

            await updateProfile(user, {
                photoURL: imageUrl,
            });
            Swal.fire("Great!", "Profile updated successfully.", "success");

            refetch();
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="relative mb-8 h-[120px] w-[120px] rounded-full lg:h-[218px] lg:w-[218px]">
            {/* Avatar */}
            {avatarSrc ? (
                <img
                    className={`h-full w-full rounded-full object-cover ${isUploading ? "opacity-50" : ""
                        }`}
                    src={avatarSrc}
                    alt="avatar"
                />
            ) : (
                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                    <span>{user?.displayName?.[0] || "U"}</span>
                </div>
            )}

            {/* Loading Overlay */}
            {isUploading && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                    <span className="loading loading-spinner loading-md text-white"></span>
                </div>
            )}

            <form>
                <button
                    onClick={handleImageUpload}
                    disabled={isUploading}
                    className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-800 disabled:opacity-50"
                >
                    <img src={edit} alt="Edit" />
                </button>

                <input
                    type="file"
                    ref={fileUploaderRef}
                    hidden
                    accept="image/*"
                    onChange={updateImageDisplay}
                />
            </form>
        </div>
    );
};

export default ProfileImage;
