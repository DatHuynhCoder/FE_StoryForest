import { useState } from 'react';
import { FiEdit2, FiTrash2, FiInfo, FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const StoryManagement = () => {
  const [sortOption, setSortOption] = useState('Mới nhất');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const storiesPerPage = 10;

  // Dummy data with cover images
  const allStories = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `One Piece ${i + 1}`,
    chapterCount: Math.floor(Math.random() * 1000) + 1,
    coverImage: '/src/assets/book.jpg'
  }));

  // Tính toán stories hiển thị trên trang hiện tại
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = allStories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(allStories.length / storiesPerPage);

  const handleEdit = (storyId) => {
    navigate(`/staff/story-management/edit-story/${storyId}`);
  };
  
  const handleSeeDetails = (storyId) => {
    navigate(`/staff/story-management/detail-story/${storyId}`);
  };
  
  const handleAdd = () => {
    navigate('/staff/story-management/add-story');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Reset về trang 1 khi tìm kiếm
    setCurrentPage(1);
  };

  // Hàm xử lý xóa truyện
  const handleDelete = (storyId) => {
    if (window.confirm(`Bạn có chắc muốn xóa truyện này?`)) {
      console.log(`Xóa truyện có ID: ${storyId}`);
      // Thực hiện xóa 
    }
  };

  // Hàm chuyển đến trang cụ thể
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
                  placeholder="Tìm kiếm..."
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
            <span>Thêm</span>
          </button>
        </div>

        {/* Story count */}
        <div className="px-4 md:px-6 py-2 md:py-3 bg-gray-100 border-b border-gray-200">
          <span className="text-sm font-medium">
            Hiển thị {indexOfFirstStory + 1}-{Math.min(indexOfLastStory, allStories.length)} trong tổng số {allStories.length} truyện
          </span>
        </div>

        {/* Story list */}
        <div className="divide-y divide-gray-200">
          {currentStories.map((story) => (
            <div key={story.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto">
                  {/* Cover image */}
                  <div className="w-16 h-24 md:w-20 md:h-28 flex-shrink-0">
                    <img 
                      src={story.coverImage} 
                      alt={`${story.title} cover`} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{story.title}</h3>
                    <p className="text-sm text-gray-500">{story.chapterCount} chương</p>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3 md:space-x-4 w-full sm:w-auto">
                  <button 
                    className="flex items-center text-teal-600 hover:text-teal-800 text-sm justify-start"
                    onClick={() => handleSeeDetails(story.id)}
                  >
                    <FiInfo className="mr-1 md:hidden" />
                    <span>Chi tiết</span>
                  </button>

                  <button 
                    className="flex items-center text-green-600 hover:text-green-800 text-sm justify-start"
                    onClick={() => handleEdit(story.id)}
                  >
                    <FiEdit2 className="mr-1 md:hidden" />
                    <span>Sửa</span>
                  </button>
                  
                  <button 
                    className="flex items-center text-red-600 hover:text-red-800 text-sm justify-start"
                    onClick={() => handleDelete(story.id)}
                  >
                    <FiTrash2 className="mr-1 md:hidden" />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default StoryManagement;