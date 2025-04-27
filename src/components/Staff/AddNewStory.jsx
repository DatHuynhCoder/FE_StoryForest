import { FiPlus, FiTrash2, FiSave, FiX, FiUpload, FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddNewStory = () => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({
    title: "",
    genres: "",
    author: "",
    description: "",
    coverImage: null,
    chapters: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [newChapter, setNewChapter] = useState({
    title: "",
    pages: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoryData(prev => ({
          ...prev,
          coverImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý thêm chapter mới
  const handleAddChapter = () => {
    setShowAddChapterModal(true);
    setNewChapter({
      title: "",
      pages: []
    });
  };

  // Xử lý thêm trang vào chapter
  const handleAddPagesToChapter = (e) => {
    const files = Array.from(e.target.files);
    const newPages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setNewChapter(prev => ({
      ...prev,
      pages: [...prev.pages, ...newPages]
    }));
  };

  // Xử lý xác nhận thêm chapter
  const handleConfirmAddChapter = () => {
    if (!newChapter.title || newChapter.pages.length === 0) {
      alert("Vui lòng nhập tên chapter và tải lên ít nhất một trang");
      return;
    }

    setStoryData(prev => ({
      ...prev,
      chapters: [...prev.chapters, {
        id: Date.now(), // Tạo ID tạm thời
        title: newChapter.title,
        pages: newChapter.pages,
        createdAt: new Date().toISOString()
      }]
    }));

    setShowAddChapterModal(false);
  };

  // Xử lý xóa chapter
  const handleDeleteChapter = (chapterId) => {
    if (window.confirm("Bạn có chắc muốn xóa chapter này?")) {
      setStoryData(prev => ({
        ...prev,
        chapters: prev.chapters.filter(chapter => chapter.id !== chapterId)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Story data submitted:", storyData);
      alert("Thêm truyện thành công!");
      navigate("/staff/story-management");
    } catch (error) {
      console.error("Error submitting story:", error);
      alert("Có lỗi xảy ra khi thêm truyện!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc muốn hủy bỏ thao tác thêm truyện?")) {
      navigate("/staff/story-management");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <main className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Form Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Cover Image Upload */}
            <div className="w-full md:w-1/4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center aspect-[3/4]">
                {storyData.coverImage ? (
                  <img 
                    src={storyData.coverImage} 
                    alt="Ảnh bìa truyện" 
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <FiUpload className="mx-auto text-3xl mb-2" />
                    <p>Tải lên ảnh bìa</p>
                  </div>
                )}
                <input
                  type="file"
                  id="cover-upload"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
                <label
                  htmlFor="cover-upload"
                  className="mt-4 w-full px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-center cursor-pointer text-sm transition-colors"
                >
                  Chọn ảnh
                </label>
              </div>
            </div>

            {/* Story Info Form */}
            <div className="w-full md:w-3/4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên truyện</label>
                <input
                  type="text"
                  name="title"
                  value={storyData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập tên truyện"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại</label>
                <input
                  type="text"
                  name="genres"
                  value={storyData.genres}
                  onChange={handleInputChange}
                  placeholder="Nhập thể loại. Vd: Action, Adventure, Fantasy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                <input
                  type="text"
                  name="author"
                  value={storyData.author}
                  onChange={handleInputChange}
                  placeholder="Nhập tên tác giả"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  rows={5}
                  value={storyData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Chapter Management */}
          <div className="mb-8">
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
                </select>
              </div>
              <button 
                type="button"
                onClick={handleAddChapter}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors"
              >
                <FiPlus className="mr-1" /> Thêm chương
              </button>
            </div>

            {/* Chapter List */}
            {storyData.chapters.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border-2 border-dashed rounded-lg">
                <p className="mb-4">Bạn chưa thêm chương truyện nào!!!</p>
                <button 
                  type="button"
                  onClick={handleAddChapter}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center mx-auto"
                >
                  <FiPlus className="mr-1" /> Thêm chương đầu tiên
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left px-4 py-2">Chương</th>
                      <th className="text-left px-4 py-2">Số trang</th>
                      <th className="text-left px-4 py-2">Ngày tạo</th>
                      <th className="text-right px-4 py-2">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storyData.chapters.map((chapter) => (
                      <tr key={chapter.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{chapter.title}</td>
                        <td className="px-4 py-3">{chapter.pages.length}</td>
                        <td className="px-4 py-3">
                          {new Date(chapter.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-3">
                            <button 
                              type="button"
                              className="text-teal-600 hover:text-teal-800 transition-colors"
                              onClick={() => {
                                setNewChapter({
                                  title: chapter.title,
                                  pages: chapter.pages
                                });
                                setShowAddChapterModal(true);
                              }}
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button 
                              type="button"
                              className="text-red-600 hover:text-red-800 transition-colors"
                              onClick={() => handleDeleteChapter(chapter.id)}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <FiX className="mr-1" /> Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || storyData.chapters.length === 0}
              className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center transition-colors ${
                isSubmitting || storyData.chapters.length === 0 ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <FiSave className="mr-1" /> Thêm truyện
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Add Chapter Modal */}
      {showAddChapterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {newChapter.title ? "Chỉnh sửa chương" : "Thêm chương mới"}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên chương</label>
                <input
                  type="text"
                  value={newChapter.title}
                  onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nhập tên chương"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tải lên trang</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload className="text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Click hoặc kéo thả file vào đây</p>
                    <input
                      type="file"
                      id="chapter-upload"
                      accept="image/*"
                      onChange={handleAddPagesToChapter}
                      className="hidden"
                      multiple
                    />
                    <label
                      htmlFor="chapter-upload"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm cursor-pointer transition-colors"
                    >
                      Chọn ảnh
                    </label>
                  </div>
                </div>
              </div>
              
              {newChapter.pages.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Đã tải lên: {newChapter.pages.length} trang
                    </span>
                    <button
                      type="button"
                      onClick={() => setNewChapter(prev => ({ ...prev, pages: [] }))}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center transition-colors"
                    >
                      <FiTrash2 className="mr-1" /> Xóa tất cả
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {newChapter.pages.map((page, index) => (
                      <div key={index} className="relative border rounded-md overflow-hidden">
                        <img
                          src={page.preview}
                          alt={`Page ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1 text-xs">
                          Trang {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddChapterModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddChapter}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewStory;