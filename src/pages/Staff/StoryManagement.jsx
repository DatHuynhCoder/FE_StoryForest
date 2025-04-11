import { useState } from 'react';
import { FiEdit2, FiTrash2, FiInfo, FiPlus, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StoryManagement = () => {
  const [sortOption, setSortOption] = useState('Mới nhất');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Dummy data
  const stories = Array(5).fill({
    title: 'One Piece',
    chapterCount: 1080
  });

  const handleEdit = (storyId) => {
    navigate(`/staff/story-management/edit-story/${storyId}`);
  };

  const handleAdd = () => {
    navigate('/staff/story-management/add-story');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 text-gray-400" />
              </div>
            </form>
            
            {/* Sort dropdown */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiPlus className="text-sm" />
            <span>Thêm</span>
          </button>
        </div>

        {/* Story count */}
        <div className="px-6 py-3 bg-gray-100 border-b border-gray-200">
          <span className="text-sm font-medium">Danh sách Truyện (129)</span>
        </div>

        {/* Story list */}
        <div className="divide-y divide-gray-200">
          {stories.map((story, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{story.title}</h3>
                  <p className="text-sm text-gray-500">{story.chapterCount} chapters</p>
                </div>
                
                {/* Action buttons */}
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm">
                    <span className="mr-1">Chi tiết</span>
                  </button>
                  <button 
                    className="flex items-center text-green-600 hover:text-green-800 text-sm"
                    onClick={() => handleEdit(index)}
                  >
                    <span className="mr-1">Sửa</span>
                  </button>
                  <button className="flex items-center text-red-600 hover:text-red-800 text-sm">
                    <span className="mr-1">Xóa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-500">Trang {currentPage}</span>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Trước
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-gray-100 font-medium">
              1
            </button>
            <button 
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
              disabled={currentPage === 10}
              onClick={() => setCurrentPage(prev => Math.min(10, prev + 1))}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryManagement;