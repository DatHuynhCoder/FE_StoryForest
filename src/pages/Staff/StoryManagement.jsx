import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiInfo, FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { api, apiAuth } from '../../services/api';
import debounce from 'lodash.debounce';

const StoryManagement = () => {
  const [stories, setStories] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm fetch stories với phân trang, tìm kiếm và sắp xếp
  const fetchStories = async (page = 1, query = '', sort = 'newest') => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/staff/book/allbooks', {
        params: {
          page,
          limit: itemsPerPage,
          search: query,
          sort
        }
      });
      setStories(response.data.data);
      console.log(response.data.data)
      setTotalItems(response.data.total || response.data.data.length);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu truyện:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce tìm kiếm
  const debouncedSearch = debounce((query) => {
    setCurrentPage(1);
    fetchStories(1, query, sortOption);
  }, 500);

  useEffect(() => {
    fetchStories(currentPage, searchQuery, sortOption);
  }, [currentPage, sortOption]);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery]);

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

  // Tính toán phân trang
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Hiển thị một phần của trang
  const displayPages = () => {
    const maxVisiblePages = 5;
    const pages = [];
    
    // Luôn hiển thị trang đầu tiên
    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`px-3 py-1 rounded-md ${currentPage === 1 
          ? 'bg-teal-600 text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        1
      </button>
    );

    // Thêm dấu "..." nếu currentPage cách xa trang đầu
    if (currentPage > maxVisiblePages - 1) {
      pages.push(
        <span key="start-ellipsis" className="px-2 py-1">...</span>
      );
    }

    // Tính toán các trang ở giữa
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Điều chỉnh nếu gần đầu hoặc cuối
    if (currentPage <= maxVisiblePages - 1) {
      endPage = maxVisiblePages - 1;
    } else if (currentPage >= totalPages - (maxVisiblePages - 2)) {
      startPage = totalPages - (maxVisiblePages - 2);
    }

    // Thêm các trang giữa
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded-md ${currentPage === i 
              ? 'bg-teal-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {i}
          </button>
        );
      }
    }

    // Thêm dấu "..." nếu currentPage cách xa trang cuối
    if (currentPage < totalPages - (maxVisiblePages - 2)) {
      pages.push(
        <span key="end-ellipsis" className="px-2 py-1">...</span>
      );
    }

    // Luôn hiển thị trang cuối cùng nếu có nhiều hơn 1 trang
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-3 py-1 rounded-md ${currentPage === totalPages 
            ? 'bg-teal-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const handleEdit = (storyId) => {
    navigate(`/staff/story-management/edit-story/${storyId}`);
  };

  const handleSeeDetails = (id) => {
    navigate(`/staff/story-management/detail-story/${id}`);
  };

  const handleAdd = () => {
    navigate('/staff/story-management/add-story');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStories(1, searchQuery, sortOption);
  };

  const handleDelete = async (storyId) => {
    if (window.confirm(`Bạn có chắc muốn xóa truyện này?`)) {
      try {
        await apiAuth.delete(`/api/staff/book/${storyId}`);
        fetchStories(currentPage, searchQuery, sortOption);
      } catch (error) {
        console.error('Lỗi khi xóa truyện:', error);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <form onSubmit={handleSearch} className="relative w-full md:w-64">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 text-gray-400" />
              </div>
            </form>

            <div className="relative w-full md:w-auto">
              <select
                className="w-full md:w-40 appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={sortOption}
                onChange={(e) => {

                  setSortOption(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full md:w-auto flex items-center justify-center space-x-1 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <FiPlus className="text-sm" />
            <span>Add</span>
          </button>
        </div>

        {/* Story count */}
        <div className="px-4 md:px-6 py-2 md:py-3 bg-gray-100 border-b border-gray-200">
          <span className="text-sm font-medium">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} stories
          </span>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="p-4 text-center text-gray-500">Loading data...</div>
        )}

        {/* Story list */}
        {!isLoading && (
          <div className="divide-y divide-gray-200">
            {stories.length > 0 ? (
              stories.map((story) => (
                <div key={story._id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto">
                      <div className="w-16 h-24 md:w-20 md:h-28 flex-shrink-0">
                        <img 
                          src={story.bookImg?.url || '/placeholder.jpg'} 
                          alt={`${story.title} cover`} 
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = '/placeholder.jpg';
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{story.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
                          <span>Update: {formatDate(story.updatedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3 md:space-x-4 w-full sm:w-auto">
                      <button 
                        className="flex items-center text-teal-600 hover:text-teal-800 text-sm cursor-pointer" 
                        onClick={() => handleSeeDetails(story._id)}
                      >
                        <FiInfo className="mr-1 md:hidden" />
                        <span>Detail</span>
                      </button>
                      <button 
                        className="flex items-center text-green-600 hover:text-green-800 text-sm cursor-pointer" 
                        onClick={() => handleEdit(story._id)}
                      >
                        <FiEdit2 className="mr-1 md:hidden" />
                        <span>Edit</span>
                      </button>
                      <button 
                        className="flex items-center text-red-600 hover:text-red-800 text-sm cursor-pointer" 
                        onClick={() => handleDelete(story._id)}
                      >
                        <FiTrash2 className="mr-1 md:hidden" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No stories found</div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="px-4 md:px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-1 rounded-md ${currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <FiChevronLeft className="mr-1" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-1">
              {displayPages()}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-1 rounded-md ${currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <span>Next</span>
              <FiChevronRight className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryManagement;