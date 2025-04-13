import { FiEdit2, FiTrash2, FiPlus, FiChevronRight, FiArrowLeft } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const EditStory = () => {
  // Mock data state
  const [storyData, setStoryData] = useState({
    _id: "1",
    title: "One Piece",
    coverImage: "/src/assets/book.jpg",
    genres: "Action, Adventure, Fantasy",
    author: "Eiichiro Oda",
    description: "One Piece là một trong những manga/anime nổi tiếng và dài nhất thế giới...",
    chapters: []
  });

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 7;

  // Mock API call
  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      const mockChapters = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Chapter ${i + 1}`,
        date: new Date(Date.now() - (i * 2 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      }));

      setStoryData(prev => ({
        ...prev,
        chapters: mockChapters
      }));
      setLoading(false);
    };

    fetchStoryData();
  }, []);

  const navigate = useNavigate();
  // Pagination logic
  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = storyData.chapters.slice(indexOfFirstChapter, indexOfLastChapter);
  const totalPages = Math.ceil(storyData.chapters.length / chaptersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleEditChapter = (chapterId) => {
    navigate(`/staff/story-management/edit-story/${storyData._id}/${chapterId}`);
    
  };
  
  const handleDeleteChapter = (chapterId) => {
    if (window.confirm("Bà có chắc chắn muốn xóa chương này không?")) {
      setStoryData(prev => ({
        ...prev,
        chapters: prev.chapters.filter(chap => chap.id !== chapterId)
      }));
    }
  };
  const handleAddChapter  = () => {
    navigate(`/staff/story-management/edit-story/${storyData._id}/add-chapter`);
    
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc muốn hủy bỏ các thay đổi?")) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
  
      {/* Main Content */}
      <main className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Top section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Cover Image */}
            <div className="flex-shrink-0 w-full md:w-1/4">
              <img 
                src={storyData.coverImage} 
                alt="Bìa truyện" 
                className="w-full rounded-md border border-gray-300 object-cover aspect-[3/4]"
              />
              <button className="mt-3 w-full px-3 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm transition-colors">
                Đổi ảnh bìa
              </button>
            </div>

            {/* Form section */}
            <div className="w-full md:w-3/4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tên truyện</label>
                <input
                  name="title"
                  value={storyData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Thể loại</label>
                <input
                  name="genres"
                  value={storyData.genres}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tác giả</label>
                <input
                  name="author"
                  value={storyData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  rows={6}
                  value={storyData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Chapter management */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
               Quản lý chương
            </h2>

            {/* Sort & Add */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
              <div className="text-sm text-gray-600">
                Sắp xếp: 
                <select className="border border-gray-300 rounded px-2 py-1 ml-1 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                  <option>Theo số chương</option>
                </select>
              </div>
              <button 
                onClick={() => handleAddChapter()} 
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors">
                <FiPlus className="mr-1" /> Thêm chương mới
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2">Chương</th>
                    <th className="text-left px-4 py-2">Ngày đăng/chỉnh sửa</th>
                    <th className="text-right px-4 py-2">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                        Đang tải dữ liệu...
                      </td>
                    </tr>
                  ) : (
                    currentChapters.map((chapter) => (
                      <tr key={chapter.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{chapter.title}</td>
                        <td className="px-4 py-3">{chapter.date}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-3">
                            <button 
                              onClick={() => handleEditChapter(chapter.id)} 
                              className="text-blue-600 hover:text-blue-800 transition-colors">
                              <FiEdit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteChapter(chapter.id)} 
                              className="text-red-600 hover:text-red-800 transition-colors">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && (
              <div className="mt-6 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>
                  
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
                        onClick={() => paginate(pageNum)}
                        className={`px-3 py-1 border rounded ${currentPage === pageNum ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-2">...</span>
                  )}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => paginate(totalPages)}
                      className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-teal-600 text-white' : 'hover:bg-gray-100'}`}
                    >
                      {totalPages}
                    </button>
                  )}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex justify-end gap-3">
            <button 
              onClick={handleCancel}

              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors">
              Hủy
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditStory;