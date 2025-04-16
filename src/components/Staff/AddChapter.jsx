import { useState, useCallback } from 'react';
import { FiPlus, FiTrash2, FiUpload, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const AddChapter = () => {
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState({
    title: '',
    pages: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChapterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    const newPages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setChapterData(prev => ({
      ...prev,
      pages: [...prev.pages, ...newPages]
    }));
  }, []);

  const handleDeleteAll = () => {
    if (chapterData.pages.length === 0) return;
    if (window.confirm('Bạn có chắc muốn xóa tất cả trang đã tải lên?')) {
      setChapterData(prev => ({ ...prev, pages: [] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Chapter data:', chapterData);
      alert('Thêm chương thành công!');
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn hủy thao tác thêm chương?')) {
      navigate(-1);
    }
  };

  return (
    <div >
   
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Chapter Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên chương</label>
            <input
              type="text"
              name="title"
              value={chapterData.title}
              onChange={handleInputChange}
              placeholder="Nhập tên chương"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tải lên trang</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <FiUpload className="text-3xl text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click hoặc kéo thả file vào đây</p>
                <input
                  type="file"
                  id="chapter-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
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

          {/* Uploaded Pages Preview */}
          {chapterData.pages.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Đã tải lên: {chapterData.pages.length} trang
                </span>
                <button
                  type="button"
                  onClick={handleDeleteAll}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center transition-colors"
                >
                  <FiTrash2 className="mr-1" /> Xóa toàn bộ
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {chapterData.pages.map((page, index) => (
                  <div key={index} className="relative border rounded-md overflow-hidden">
                    <img
                      src={page.preview}
                      alt={`Page ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1 text-xs">
                      Trang {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              disabled={isSubmitting || chapterData.pages.length === 0}
              className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center transition-colors ${
                isSubmitting || chapterData.pages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FiPlus className="mr-1" />
              {isSubmitting ? 'Đang xử lý...' : 'Thêm chương'}
            </button>
          </div>
        </form>
     
    </div>
  );
};

export default AddChapter;