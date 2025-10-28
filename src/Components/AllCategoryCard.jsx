import { FiEdit, FiTag, FiTrash2, FiUser } from "react-icons/fi";
import authApiClient from "../Services/authApiClient";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const AllCategoryCard = ({ allCategory, setCategory }) => {
  const navigate = useNavigate();
  if (allCategory.length < 1)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <CircleLoader color="#ec4899" size={50} />
      </div>
    );

  const handleEdit = (category) => {
    navigate(`categories/edit/${category.id}/`);
  };

  const handleDelete = (category) => {
    if (window.confirm("Are you sure you want to delete this category item?")) {
      authApiClient.delete(`categories/${category.id}/`);
      setCategory((prev) => prev.filter((item) => item.id !== category.id));
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
          {allCategory.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-6">
                <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  #{category.id}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {category.name || "Uncategorized"}
                </span>
              </td>

              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
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

export default AllCategoryCard;
