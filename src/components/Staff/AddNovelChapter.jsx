import { useState, useCallback } from 'react';
import { FiPlus, FiTrash2, FiUpload, FiX } from 'react-icons/fi';
import { Form, useNavigate, useParams } from 'react-router';
import { apiAuth } from '../../services/api';

const AddNovelChapter = () => {
  const { id_novel } = useParams();
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState({
    order: 0,
    novelid: id_novel,
    chapter_title: "",
    chapter_link: "",
    chapter_content: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentText, setContentText] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChapterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle content text area change
  const handleContentChange = (e) => {
    const text = e.target.value;
    setContentText(text);
    // Split by paragraphs (double line breaks) or single line breaks
    const contentArray = text.split('\n').filter(line => line.trim() !== '');
    setChapterData(prev => ({
      ...prev,
      chapter_content: contentArray
    }));
  };

  // Add a single paragraph to content
  const addParagraph = () => {
    const newParagraph = prompt('Enter paragraph content:');
    if (newParagraph && newParagraph.trim()) {
      setChapterData(prev => ({
        ...prev,
        chapter_content: [...prev.chapter_content, newParagraph.trim()]
      }));
      setContentText(prev => prev + (prev ? '\n' : '') + newParagraph.trim());
    }
  };

  // Remove a paragraph from content
  const removeParagraph = (index) => {
    setChapterData(prev => ({
      ...prev,
      chapter_content: prev.chapter_content.filter((_, i) => i !== index)
    }));
    // Update content text
    const updatedContent = chapterData.chapter_content.filter((_, i) => i !== index);
    setContentText(updatedContent.join('\n'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare data for submission
      const submitData = {
        order: parseInt(chapterData.order),
        novelid: chapterData.novelid,
        chapter_title: chapterData.chapter_title,
        chapter_content: contentText // Send as string, backend will split by \n
      };

      const response = await apiAuth.post('api/staff/chapter/novel', submitData);
      
      if (response.data.success) {
        alert('Thêm chương thành công!');
        navigate(-1); // Go back to previous page
      } else {
        alert(response.data.message || 'Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra!';
      alert(errorMessage);
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Thêm chương mới</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Chapter Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên chương <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="chapter_title"
                value={chapterData.chapter_title}
                onChange={handleInputChange}
                placeholder="Nhập tên chương"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thứ tự chương <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="order"
                value={chapterData.order}
                onChange={handleInputChange}
                placeholder="Nhập thứ tự chương"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Novel ID</label>
              <input
                type="text"
                name="novelid"
                value={chapterData.novelid}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link chương (tuỳ chọn)</label>
              <input
                type="url"
                name="chapter_link"
                value={chapterData.chapter_link}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Chapter Content */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Nội dung chương <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addParagraph}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center transition-colors"
              >
                <FiPlus className="mr-1" /> Thêm đoạn
              </button>
            </div>
            
            <textarea
              value={contentText}
              onChange={handleContentChange}
              placeholder="Nhập nội dung chương. Mỗi dòng sẽ là một đoạn văn..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-96"
              required
            />
            
            {/* Content Preview */}
            {chapterData.chapter_content.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Xem trước ({chapterData.chapter_content.length} đoạn):
                </h4>
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {chapterData.chapter_content.map((paragraph, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border">
                      <span className="text-xs text-gray-500 font-mono min-w-[20px]">{index + 1}.</span>
                      <p className="text-sm text-gray-700 flex-1 line-clamp-2">{paragraph}</p>
                      <button
                        type="button"
                        onClick={() => removeParagraph(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
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
              disabled={isSubmitting || !chapterData.chapter_title || chapterData.chapter_content.length === 0}
              className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center transition-colors ${
                isSubmitting || !chapterData.chapter_title || chapterData.chapter_content.length === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              <FiPlus className="mr-1" />
              {isSubmitting ? 'Đang xử lý...' : 'Thêm chương'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNovelChapter;