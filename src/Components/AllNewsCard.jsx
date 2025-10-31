import { FiEdit, FiTag, FiTrash2, FiUser } from "react-icons/fi";
import ArticleEditForm from "./ArticleEditForm";
import { useNavigate } from "react-router-dom";
import authApiClient from "../Services/authApiClient";
import { CircleLoader } from "react-spinners";

const AllNewsCard = ({ allnews, setAllNews }) => {
  const navigate = useNavigate();
  if (allnews.length < 1)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <CircleLoader color="#ec4899" size={50} />
      </div>
    );

  const handleEdit = (news) => {
    console.log("Edit news:", news);
    navigate(`articles/edit/${news.id}`);
  };

  const handleDelete = (news) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      authApiClient.delete(`articles/${news.id}/`);
      setAllNews((prev) => prev.filter((item) => item.id !== news.id));
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
              Author
            </th>
            <th className="text-left py-3 px-6 font-medium text-gray-900 text-sm">
              Category
            </th>
            <th className="text-left py-3 px-6 font-medium text-gray-900 text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {allnews.map((news) => (
            <tr key={news.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6">
                <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  #{news.id}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="max-w-xs">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {news.headline}
                  </p>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-900">
                    {news.author?.name || "Unknown"}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {news.category?.name || "Uncategorized"}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(news)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(news)}
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

export default AllNewsCard;