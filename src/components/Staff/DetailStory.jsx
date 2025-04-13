import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StoryDetail = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data - sẽ thay bằng API call sau
  const story = {
    _id: "0",
    mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
    title: "Solo Leveling",
    author: ["Chugong", "Jang Sung-rak"],
    artist: ["Dubu"],
    synopsis: "10 years ago, after 'the Gate' that connected the real world with the monster world opened, some ordinary people gained the power to hunt monsters within the Gate. They are known as 'Hunters'. Sung Jin-Woo, an E-rank Hunter, is the weakest of them all. After barely surviving a deadly dungeon, he gains a mysterious power...",
    tags: ["Action", "Adventure", "Fantasy", "Shounen", "Supernatural"],
    status: "completed",
    type: "manga",
    views: 238,
    followers: 0,
    rate: 5,
    cover_url: "/src/assets/book.jpg",
    updatedAt: "2025-04-12T02:00:00.436+00:00",
    bookImg: {
      url: "/src/assets/book.jpg",
      public_id: ""
    }
  };

  // Mock chapters data
  const chapters = [
    { _id: "1", title: "Chapter 1: E-rank Hunter", updatedAt: "2025-03-01T10:00:00.000Z" },
    { _id: "2", title: "Chapter 2: Double Dungeon", updatedAt: "2025-03-08T10:00:00.000Z" },
    { _id: "3", title: "Chapter 3: The System", updatedAt: "2025-03-15T10:00:00.000Z" },
    { _id: "4", title: "Chapter 4: Daily Quest", updatedAt: "2025-03-22T10:00:00.000Z" },
    { _id: "5", title: "Chapter 5: First Kill", updatedAt: "2025-03-29T10:00:00.000Z" },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditStory = () => {
    navigate(`/staff/story-management/edit-story/${story._id}`);
   
  };



  const handleDeleteStory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa truyện này?')) {
      console.log('Delete story', story._id);
      
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with back button */}
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
          <button 
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiChevronLeft className="mr-1" />
            <span>Quay lại</span>
          </button>
        </div>

        {/* Story info section */}
        <div className="px-4 py-4 md:px-6 md:py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover image */}
            <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
              <img 
                src={story.cover_url || story.bookImg?.url} 
                alt={`${story.title} cover`}
                className="w-full h-auto rounded shadow-md"
              />
            </div>

            {/* Story details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{story.title}</h1>
                
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <FiStar className="text-yellow-500 mr-1" />
                  <span className="font-medium">{story.rate}/5</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                <div>
                  <p className="text-gray-700"><span className="font-medium">Tác giả:</span> {story.author?.join(', ') || 'Không rõ'}</p>
                  <p className="text-gray-700"><span className="font-medium">Họa sĩ:</span> {story.artist?.join(', ') || 'Không rõ'}</p>
                </div>
                <div>
                  <p className="text-gray-700"><span className="font-medium">Thể loại:</span> {story.tags?.join(', ') || 'Không có'}</p>
                  <p className="text-gray-700"><span className="font-medium">Trạng thái:</span> 
                    <span className={`ml-1 px-2 py-1 text-xs rounded-full ${
                      story.status === 'completed' ? 'bg-green-100 text-green-800' :
                      story.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {story.status === 'completed' ? 'Hoàn thành' : 
                       story.status === 'ongoing' ? 'Đang tiến hành' : 
                       story.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-medium mb-2">Tóm tắt:</h2>
                <p className="text-gray-700 whitespace-pre-line">{story.synopsis || 'Chưa có tóm tắt.'}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Lượt xem</p>
                  <p className="font-medium">{story.views || 0}</p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Người theo dõi</p>
                  <p className="font-medium">{story.followers || 0}</p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Cập nhật</p>
                  <p className="font-medium">
                    {story.updatedAt ? new Date(story.updatedAt).toLocaleDateString() : 'Không rõ'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={handleEditStory}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FiEdit className="mr-2" />
              <span>Chỉnh sửa truyện</span>
            </button>
            <button 
              onClick={handleDeleteStory}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <FiTrash2 className="mr-2" />
              <span>Xóa truyện</span>
            </button>
          </div>
        </div>

        {/* Chapter management section */}
        <div className="px-4 py-4 md:px-6 md:py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl font-semibold">Danh sách chương</h2>
          </div>

          {/* Chapters table - responsive */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chương</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng/chỉnh sửa</th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {chapters.length > 0 ? (
                  chapters.map((chapter) => (
                    <tr key={chapter._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{chapter.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(chapter.updatedAt).toLocaleDateString()}
                      </td>
                  
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                      Chưa có chương nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - only show if there are chapters */}
          {chapters.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <span className="text-sm text-gray-500">
                Hiển thị {chapters.length} chương
              </span>
              <div className="flex space-x-2">
                <button 
                  className="p-2 md:px-3 md:py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 flex items-center"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <FiChevronLeft className="md:hidden" />
                  <span className="hidden md:inline">Trước</span>
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm bg-gray-100 font-medium hidden sm:block">
                  {currentPage}
                </button>
                <button 
                  className="p-2 md:px-3 md:py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50 flex items-center"
                  disabled={chapters.length < 10} // Assuming 10 items per page
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  <FiChevronRight className="md:hidden" />
                  <span className="hidden md:inline">Sau</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;