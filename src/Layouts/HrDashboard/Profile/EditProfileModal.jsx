import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EditProfileModal = ({ profile, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, formState: { isSubmitting }, } = useForm({ defaultValues: { name: profile?.name || "", companyName: profile?.companyName || "", dateOfBirth: profile?.dateOfBirth || "", }, });

  const onSubmit = async (data) => {
    await axiosSecure.put(`/users/profile/${profile.email}`, data);

    Swal.fire("Updated!", "Profile updated successfully", "success");
    refetch();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label>Full Name</label>
            <input {...register("name")} className="input outline-0 w-full" />
          </div>

          {/* Company Name */}
          <div>
            <label>Company Name</label>
            <input {...register("companyName")} className="input outline-0 w-full" />
          </div>

          {/* Date of Birth */}
          <div>
            <label>Date of Birth</label>
            <input type="date" {...register("dateOfBirth")} className="input outline-0 w-full" />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn btn-ghost" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
