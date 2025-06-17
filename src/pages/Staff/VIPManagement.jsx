import { FiEdit, FiChevronDown, FiSearch, FiChevronLeft, FiChevronRight, FiCheck, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import axios from "axios";
import { apiAuth } from "../../services/api";

const getStatusColor = (status) => {
  switch (status) {
    case true:
      return "bg-green-100 text-green-800";
    case false:
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const VipManagement = () => {
  const [vipReaders, setVipReaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const itemsPerPage = 10;

  //fetchVipReaders
  const fetchVipReaders = async () => {
    try {
      const response = await apiAuth.get("/api/staff/vipcontrol");
      console.log(response.data.data);
      setVipReaders(response.data.data);
    } catch (error) {
      console.error("Error fetching VIP readers:", error);
    }
  }

  // Call fetchVipReaders
  useEffect(() => {
    fetchVipReaders();
  }, []);

  // Filter and sort logic
  const filteredApps = vipReaders.filter(reader => {
    const matchesSearch = reader.userid.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reader.userid.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" ||
      (selectedStatus === "Active" && reader.isActive === true) ||
      (selectedStatus === "InActived" && reader.isActive === false);

    return matchesSearch && matchesStatus;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.startDate) - new Date(a.startDate);
    if (sortBy === "oldest") return new Date(a.startDate) - new Date(b.startDate);
    return 0;
  });


  const totalPages = Math.ceil(sortedApps.length / itemsPerPage);
  const displayedApps = sortedApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status options for filter
  const statusOptions = ["All", "InActived", "Active"];

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const appIndex = applications.findIndex(app => app.id === id);
    if (appIndex !== -1) {
      applications[appIndex].status = newStatus;
    }
    setEditingId(null);
    // In a real app, you would also update the backend here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-white rounded-lg shadow-sm">
      {/* Header with title and controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">VIP Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            All VIP subcriptions: <span className="font-medium text-teal-700">{filteredApps.length}</span>
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full bg-white"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                VIP Reader
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Infomation
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                VIP Package
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedApps.length > 0 ? (
              displayedApps.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {/* If there 's an avatar, show it, otherwise show a first letter of the name */}
                        {app.userid.avatar ?
                          <img className="h-10 w-10 rounded-full" src={app.userid.avatar?.url} alt={app.userid.username} />
                          : <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">{app.userid.username[0]} </div>
                        }
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{app.userid.name}</div>
                        <div className="text-sm text-gray-500">{app.userid.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900">{app.userid.email}</div>
                    <div className="text-sm text-gray-500">{app.userid?.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    <div className="text-sm text-gray-900">{app.name}</div>
                    <div className="text-sm text-gray-500">Start: {formatDate(app.startDate)}</div>
                    <div className="text-sm text-gray-500">End: {formatDate(app.endDate)}</div>
                    <div className="text-md font-bold text-amber-700">Price: {app.price} VND</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {editingId === app._id ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleStatusChange(app._id, true)}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                        >
                          <FiCheck className="inline mr-1" /> Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(app._id, false)}
                          className="px-2 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                        >
                          <FiX className="inline mr-1" /> InActived
                        </button>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.isActive)}`}>
                        {app.isActive ? "Active" : "InActived"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  Cannot find any VIP Reader with this search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredApps.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Show <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredApps.length)}</span> in{' '}
            <span className="font-medium">{filteredApps.length}</span> Result
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show first pages, current page with neighbors, or last pages
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded-md text-sm ${currentPage === pageNum ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VipManagement;