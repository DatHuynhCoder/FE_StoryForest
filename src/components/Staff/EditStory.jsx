import { useState } from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const ChapterEditor = () => {
  const [pages, setPages] = useState([]);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleAddPage = () => {
    setPages([...pages, { id: Date.now(), image: '' }]);
  };

  const handleDeleteAll = () => {
    setIsConfirming(true);
  };

  const confirmDeleteAll = () => {
    setPages([]);
    setIsConfirming(false);
  };

  const cancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">
          Quản lý truyện &gt; One Piece &gt; Chapter 1
        </h1>
        <h2 className="text-lg mt-2">One Piece - Chapter 1</h2>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiCheck className="mr-2" />
            Xác nhận
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            <FiX className="mr-2" />
            Hủy
          </button>
        </div>

        <div className="border-l border-gray-300 h-8 mx-4"></div>

        <div className="flex space-x-3">
          <button 
            onClick={handleAddPage}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FiPlus className="mr-2" />
            Thêm trang
          </button>
          <button 
            onClick={handleDeleteAll}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FiTrash2 className="mr-2" />
            Xóa toàn bộ
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {isConfirming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Xác nhận xóa toàn bộ trang?</h3>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Hủy
              </button>
              <button 
                onClick={confirmDeleteAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pages Grid */}
      <div className="p-6 grid grid-cols-3 gap-4">
        {pages.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-500">
            Chưa có trang nào được thêm
          </div>
        ) : (
          pages.map((page) => (
            <div key={page.id} className="border rounded-lg p-2 h-40 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">Trang {pages.indexOf(page) + 1}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChapterEditor;