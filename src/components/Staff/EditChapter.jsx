import { FiPlus, FiTrash2, FiSave, FiX, FiChevronRight, FiArrowLeft } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const EditChapter = () => {
  const navigate = useNavigate(); 
  const [chapterData, setChapterData] = useState({
    title: "One Piece - Chapter 1",
    pages: Array(12).fill("/src/assets/image45.png")
  });

  const [loading, setLoading] = useState(true);
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    const fetchChapterData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };

    fetchChapterData();
  }, []);

  const handleAddPage = () => {};

  const handleDeleteSelected = () => {
    setChapterData(prev => ({
      ...prev,
      pages: prev.pages.filter((_, index) => !selectedPages.includes(index))
    }));
    setSelectedPages([]);
  };

  const handleDeleteAll = () => {
    setChapterData(prev => ({ ...prev, pages: [] }));
    setSelectedPages([]);
  };

  const togglePageSelection = (index) => {
    setSelectedPages(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <main className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Nút back */}
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition"
            >
              <FiArrowLeft />
              <span>Quay lại</span>
            </button>
          </div>

          {/* Chapter Title */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{chapterData.title}</h2>
          </div>

          {/* Page Management */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <div className="text-sm text-gray-600">
                {selectedPages.length > 0 ? (
                  <span>{selectedPages.length} trang được chọn</span>
                ) : (
                  <span>Tổng cộng {chapterData.pages.length} trang</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleAddPage}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors"
                >
                  <FiPlus className="mr-1" /> Thêm trang
                </button>

                {chapterData.pages.length > 0 && (
                  <button
                    onClick={handleDeleteAll}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors"
                  >
                    <FiTrash2 className="mr-1" /> Xóa toàn bộ
                  </button>
                )}

                {selectedPages.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors"
                  >
                    <FiTrash2 className="mr-1" /> Xóa trang đã chọn
                  </button>
                )}
              </div>
            </div>

            {/* Pages Grid */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
            ) : chapterData.pages.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border-2 border-dashed rounded-lg">
                Chưa có trang nào trong chương này
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {chapterData.pages.map((page, index) => (
                  <div
                    key={index}
                    className={`relative border rounded-md overflow-hidden ${selectedPages.includes(index) ? 'ring-2 ring-teal-500' : ''}`}
                  >
                    <div
                      className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                      onClick={() => togglePageSelection(index)}
                    >
                      <div className={`w-5 h-5 border-2 rounded ${selectedPages.includes(index) ? 'bg-teal-500 border-teal-500' : 'bg-white border-white'}`}></div>
                    </div>
                    <img
                      src={page}
                      alt={`Page ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                    <div className="p-2 bg-gray-100 text-center text-sm font-medium">
                      Trang {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors">
              <FiX className="mr-1" /> Hủy
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
              <FiSave className="mr-1" /> Xác nhận
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditChapter;
