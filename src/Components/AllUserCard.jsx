import { FiEdit, FiTag, FiTrash2, FiUser } from "react-icons/fi";
import authApiClient from "../Services/authApiClient";
import { CircleLoader } from "react-spinners";

const AllUserCard = ({ allUser, setUser }) => {
  if (allUser.length < 1)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <CircleLoader color="#ec4899" size={50} />
      </div>
    );

  const handleDelete = (user) => {
    if (window.confirm("Are you sure you want to delete this user item?")) {
      authApiClient.delete(`auth/users/${user.id}/`);
      setUser((prev) => prev.filter((item) => item.id !== user.id));
    }
  };

  return (
    <div>
      <table className="w-full mt-10">
        <thead>
          <tr>
            <th className="text-left py-3 px-6 font-medium text-gray-900 text-sm">
              ID
            </th>
            <th className="text-left py-3 px-6 font-medium text-gray-900 text-sm">
              Title
            </th>
            <th className="text-left py-3 px-6 font-medium text-gray-900 text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {allUser.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6">
                <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  #{user.id}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-900">
                    {user.email || "Unknown"}
                  </span>
                </div>
              </td>

              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDelete(user)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserCard;
