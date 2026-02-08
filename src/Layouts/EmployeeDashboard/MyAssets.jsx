import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthContext";
import Swal from "sweetalert2";

const MyAssets = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["myAssets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-assets?email=${user?.email}`);
      return res.data;
    }
  });

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || asset.assetType === filterType;

    return matchesSearch && matchesType;
  });

  const handleReturn = async (asset) => {
    const confirm = await Swal.fire({
      title: "Return asset?",
      text: "This will mark the asset as returned",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, return",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/assets/return/${asset._id}`);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Returned!", "Asset returned successfully", "success");
      refetch();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="lg:ml-[350px] mt-16 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Assets</h2>
        <button onClick={handlePrint} className="btn btn-sm btn-outline">
          Print
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by asset name..."
          className="input input-bordered outline-0 w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select outline-0 select-bordered w-full md:w-1/4"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map(asset => (
              <tr key={asset._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={asset.assetImage}
                    alt={asset.assetName}
                    className="w-12 h-12 rounded"
                  />
                  <span>{asset.assetName}</span>
                </td>

                <td>{asset.assetType}</td>
                <td>{asset.companyName}</td>
                <td>{asset.requestDate}</td>
                <td>{asset.approvalDate || "-"}</td>

                <td>
                  <span className={`badge ${
                    asset.status === "assigned"
                      ? "badge-success"
                      : "badge-soft"
                  }`}>
                    {asset.status}
                  </span>
                </td>

                <td className="text-center">
                  {asset.status === "assigned" &&
                    asset.assetType === "Returnable" ? (
                    <button
                      onClick={() => handleReturn(asset)}
                      className="btn btn-xs btn-warning"
                    >
                      Return
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}

            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;