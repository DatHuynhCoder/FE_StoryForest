import { FiPlus, FiTrash2, FiArrowLeft, FiSave, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { api, apiAuth } from "../../services/api";

const EditNovelChapter = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();

  const [chapterData, setChapterData] = useState({
    order: 0,
    novelid: "",
    chapter_title: "",
    chapter_link: "",
    chapter_content: []
  });
  const [contentText, setContentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    fetchChapterData();
  }, [chapterId]);

  const fetchChapterData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/staff/chapter/novel/${chapterId}`);

      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setChapterData({
          order: data.order || 0,
          novelid: data.novelid || "",
          chapter_title: data.chapter_title || "",
          chapter_link: data.chapter_link || "",
          chapter_content: data.chapter_content || []
        });
        
        // Set content text from array
        const contentString = data.chapter_content ? data.chapter_content.join('\n') : '';
        setContentText(contentString);
        
        // Store original data for comparison
        setOriginalData(data);
        console.log(data);
      }
    } catch (err) {
      console.error("Error fetching chapter data:", err);
      alert('Không thể tải dữ liệu chương!');
    } finally {
      setLoading(false);
    }
  };

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
    // Split by line breaks and filter empty lines
    const contentArray = text.split('\n').filter(line => line.trim() !== '');
    setChapterData(prev => ({
      ...prev,
      chapter_content: contentArray
    }));
  };

  // Add a single paragraph to content
  const addParagraph = () => {
    const newParagraph = prompt('Nhập nội dung đoạn văn:');
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
        chapter_link: chapterData.chapter_link,
        chapter_content: contentText // Send as string, backend will split by \n
      };

      const response = await apiAuth.patch(`/api/staff/chapter/novel/${chapterId}`, submitData);
      
      if (response.data.success) {
        alert('Cập nhật chương thành công!');
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
    if (window.confirm('Bạn có chắc muốn hủy thao tác chỉnh sửa? Các thay đổi sẽ không được lưu.')) {
      navigate(-1);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Check if data has been modified
  const hasChanges = () => {
    return (
      chapterData.order !== originalData.order ||
      chapterData.chapter_title !== originalData.chapter_title ||
      chapterData.chapter_link !== originalData.chapter_link ||
      JSON.stringify(chapterData.chapter_content) !== JSON.stringify(originalData.chapter_content)
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải dữ liệu chương...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Chỉnh sửa chương</h1>
          {hasChanges() && (
            <span className="ml-3 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Có thay đổi
            </span>
          )}
        </div>
        
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
              <FiSave className="mr-1" />
              {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNovelChapter;