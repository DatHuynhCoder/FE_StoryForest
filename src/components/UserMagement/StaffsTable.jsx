import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Search, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import AddStaffForm from './AddStaffForm';

const StaffTable = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const names = [
        'Eiichiro Oda', 'Tite Kubo', 'Masashi Kishimoto', 'Akira Toriyama',
        'Yoshihiro Togashi', 'Hajime Isayama', 'Naoko Takeuchi', 'Gosho Aoyama',
        'Ken Wakui', 'Koyoharu Gotouge', 'Gege Akutami', 'Hiromu Arakawa',
        'Tsugumi Ohba', 'Takeshi Obata', 'Sui Ishida', 'Haruichi Furudate',
        'ONE', 'Makoto Yukimura', 'Osamu Tezuka', 'Kazuki Takahashi'
      ];
      
      const data = names.map((name, i) => ({
        id: i + 1,
        name,
        email: `${name.toLowerCase().replace(/ /g, '')}@gmail.com`,
        phone: `0123${456000 + i}`,
        avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      }));
      setUsers(data);
      setFilteredUsers(data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [search, users]);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/user-management/staff/${id}`);
  };

  return (
    <div className="mx-auto px-2 sm:px-4 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-medium text-gray-800">Danh sách nhân viên</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center justify-center gap-1 bg-teal-600 text-white px-3 py-2 rounded text-sm hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Thêm mới</span>
          </button>
        </div>
      </div>

      {/* Modal thêm nhân viên */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          
            <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl transform transition-all duration-300"
            style={{
                animation: showAddForm ? 'modalFadeIn 0.3s ease-out forwards' : ''}}>
            <div className="flex justify-end mb-4">
                <button 
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                <X className="h-5 w-5" />
                </button>
            </div>
            <AddStaffForm onSuccess={handleCloseForm} />
            </div>
    
        </div>
        )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">Điện thoại</th>
                <th className="px-3 sm:px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-8 h-8 rounded-full mr-2" 
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="sm:hidden text-xs text-gray-500">{user.email}</div>
                          <div className="xs:hidden text-xs text-gray-500">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden xs:table-cell">
                      {user.phone}
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(user.id)}
                          className="text-teal-600 hover:text-teal-900"
                          title="Sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-2">
          <div className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">{indexOfFirst + 1}</span> đến{' '}
            <span className="font-medium">{Math.min(indexOfLast, filteredUsers.length)}</span> trong{' '}
            <span className="font-medium">{filteredUsers.length}</span> kết quả
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Trước
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Hiển thị tối đa 5 nút trang
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
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === pageNum ? 'bg-teal-600 text-white border-teal-600' : ''
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 py-1">...</span>
            )}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1 border rounded text-sm"
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;