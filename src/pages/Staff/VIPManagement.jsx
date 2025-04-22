import { FiEdit, FiChevronDown, FiSearch, FiChevronLeft, FiChevronRight, FiCheck, FiX } from "react-icons/fi";
import { useState } from "react";

// More realistic mock data with varied statuses
const generateMockApplications = () => {
  const names = [
    "Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", 
    "Hoàng Văn E", "Vũ Thị F", "Đặng Văn G", "Bùi Thị H",
    "Ngô Văn I", "Dương Thị K", "Mai Văn L", "Lý Thị M", "Chu Văn N"
  ];
  
  const statuses = ["Chờ duyệt", "Đã duyệt", "Từ chối"];
  
  return names.map((name, index) => ({
    id: index + 1,
    name: name,
    email: name.toLowerCase().replace(/\s/g, '') + "@example.com",
    date: `2025-0${Math.floor(Math.random() * 3) + 4}-${Math.floor(Math.random() * 28) + 1}`.padStart(2, '0'),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    avatar: `https://i.pravatar.cc/40?img=${index + 10}`,
    phone: `09${Math.floor(Math.random() * 90000000) + 10000000}`,
    package: ["VIP 1 tháng", "VIP 3 tháng", "VIP 6 tháng"][Math.floor(Math.random() * 3)]
  }));
};

const applications = generateMockApplications();

const getStatusColor = (status) => {
  switch (status) {
    case "Chờ duyệt":
      return "bg-yellow-100 text-yellow-800";
    case "Đã duyệt":
      return "bg-green-100 text-green-800";
    case "Từ chối":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

const VipManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [editingId, setEditingId] = useState(null);
  const itemsPerPage = 10;
  
  // Filter and sort logic
  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === "Tất cả" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  
  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    return 0;
  });
  
  const totalPages = Math.ceil(sortedApps.length / itemsPerPage);
  const displayedApps = sortedApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status options for filter
  const statusOptions = ["Tất cả", "Chờ duyệt", "Đã duyệt", "Từ chối"];

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
          <h1 className="text-xl font-semibold text-gray-800">Quản lý đăng ký VIP</h1>
          <p className="text-sm text-gray-600 mt-1">
            Tổng số đơn đăng ký: <span className="font-medium text-teal-700">{filteredApps.length}</span>
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
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
                Người dùng
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Thông tin
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gói VIP
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedApps.length > 0 ? (
              displayedApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={app.avatar} alt={app.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{app.name}</div>
                        <div className="text-sm text-gray-500 sm:hidden">{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-900">{app.email}</div>
                    <div className="text-sm text-gray-500">{app.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {app.package}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {editingId === app.id ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleStatusChange(app.id, "Đã duyệt")}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                        >
                          <FiCheck className="inline mr-1" /> Duyệt
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, "Từ chối")}
                          className="px-2 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                        >
                          <FiX className="inline mr-1" /> Từ chối
                        </button>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {app.status === "Chờ duyệt" && (
                      <button 
                        onClick={() => setEditingId(app.id)}
                        className="text-teal-600 hover:text-teal-900 mr-3"
                        disabled={editingId !== null && editingId !== app.id}
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  Không tìm thấy kết quả phù hợp
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
            Hiển thị <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> đến{' '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredApps.length)}</span> trong số{' '}
            <span className="font-medium">{filteredApps.length}</span> kết quả
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