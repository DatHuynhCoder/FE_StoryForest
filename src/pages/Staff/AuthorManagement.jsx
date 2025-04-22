import { useState, useMemo } from 'react';
import { FiEdit2, FiTrash2, FiInfo, FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const AuthorManagement = () => {
  const [sortOption, setSortOption] = useState('Mới nhất');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const authorsPerPage = 10;

  
  const allAuthors = Array.from({ length: 20 }, (_, i) => ({
    id: `author_${i + 1}`,
    name: `Tác giả ${i + 1}`,
    description: `Mô tả về tác giả ${i + 1} với những tác phẩm nổi tiếng...`,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(), 
    avatar: {
      url: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`,
      public_id: `avatar_${i + 1}`
    }
  }));

  // Hàm tìm kiếm tác giả
  const filteredAuthors = useMemo(() => {
    return allAuthors.filter(author => {
      const searchLower = searchQuery.toLowerCase();
      return (
        author.name.toLowerCase().includes(searchLower) ||
        author.description.toLowerCase().includes(searchLower)
      );
    });
  }, [allAuthors, searchQuery]);

  // Hàm sắp xếp tác giả
  const sortedAuthors = useMemo(() => {
    const authorsCopy = [...filteredAuthors];
    switch (sortOption) {
      case 'Mới nhất':
        return authorsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'Cũ nhất':
        return authorsCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'A-Z':
        return authorsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'Z-A':
        return authorsCopy.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return authorsCopy;
    }
  }, [filteredAuthors, sortOption]);

  // Tính toán authors hiển thị trên trang hiện tại
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = sortedAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);
  const totalPages = Math.ceil(sortedAuthors.length / authorsPerPage);

  const handleEdit = (authorId) => {
    navigate(`/staff/author-management/edit-author/${authorId}`);
  };
  
  const handleSeeDetails = (authorId) => {
    navigate(`/staff/author-management/detail-author/${authorId}`);
  };
  
  const handleAdd = () => {
    navigate('/staff/author-management/add-author');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Reset về trang 1 khi tìm kiếm
    setCurrentPage(1);
  };

  const handleDelete = (authorId) => {
    if (window.confirm(`Bạn có chắc muốn xóa tác giả này?`)) {
      console.log(`Xóa tác giả có ID: ${authorId}`);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative w-full md:w-64">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Tìm kiếm tác giả..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 text-gray-400" />
              </div>
            </form>
            
            {/* Sort dropdown */}
            <div className="relative w-full md:w-auto">
              <select
                className="w-full md:w-40 appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="Mới nhất">Mới nhất</option>
                <option value="Cũ nhất">Cũ nhất</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Add button */}
          <button 
            onClick={handleAdd}
            className="w-full md:w-auto flex items-center justify-center space-x-1 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <FiPlus className="text-sm" />
            <span>Thêm tác giả</span>
          </button>
        </div>

        {/* Author count */}
        <div className="px-4 md:px-6 py-2 md:py-3 bg-gray-100 border-b border-gray-200">
          <span className="text-sm font-medium">
            Hiển thị {indexOfFirstAuthor + 1}-{Math.min(indexOfLastAuthor, sortedAuthors.length)} trong tổng số {sortedAuthors.length} tác giả
          </span>
        </div>

        {/* Author list */}
        <div className="divide-y divide-gray-200">
          {currentAuthors.length > 0 ? (
            currentAuthors.map((author) => (
              <div key={author.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto">
                    {/* Avatar image */}
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                      <img 
                        src={author.avatar.url} 
                        alt={`${author.name} avatar`} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{author.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{author.description}</p>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3 md:space-x-4 w-full sm:w-auto">
                    <button 
                      className="flex items-center text-teal-600 hover:text-teal-800 text-sm justify-start"
                      onClick={() => handleSeeDetails(author.id)}
                    >
                      <FiInfo className="mr-1 md:hidden" />
                      <span>Chi tiết</span>
                    </button>

                    <button 
                      className="flex items-center text-green-600 hover:text-green-800 text-sm justify-start"
                      onClick={() => handleEdit(author.id)}
                    >
                      <FiEdit2 className="mr-1 md:hidden" />
                      <span>Sửa</span>
                    </button>
                    
                    <button 
                      className="flex items-center text-red-600 hover:text-red-800 text-sm justify-start"
                      onClick={() => handleDelete(author.id)}
                    >
                      <FiTrash2 className="mr-1 md:hidden" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 md:px-6 py-8 text-center">
              <p className="text-gray-500">Không tìm thấy tác giả nào phù hợp</p>
            </div>
          )}
        </div>

        {/* Pagination - chỉ hiển thị nếu có kết quả */}
        {sortedAuthors.length > 0 && (
          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <span className="text-sm text-gray-500">
              Trang {currentPage}/{totalPages}
            </span>
            
            <div className="flex space-x-2">
              <button 
                className="p-2 md:px-3 md:py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 flex items-center"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <FiChevronLeft className="md:hidden" />
                <span className="hidden md:inline">Trước</span>
              </button>
              
              {/* Hiển thị các nút trang */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 border rounded text-sm hidden sm:block ${
                      currentPage === pageNum 
                        ? 'bg-teal-600 text-white border-teal-600' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-2 hidden sm:flex items-center">...</span>
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => goToPage(totalPages)}
                  className={`px-3 py-1 border rounded text-sm hidden sm:block ${
                    currentPage === totalPages 
                      ? 'bg-teal-600 text-white border-teal-600' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {totalPages}
                </button>
              )}
              
              <button 
                className="p-2 md:px-3 md:py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 flex items-center"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                <FiChevronRight className="md:hidden" />
                <span className="hidden md:inline">Sau</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorManagement;