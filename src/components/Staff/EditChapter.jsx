import { FiPlus, FiTrash2, FiSave, FiX, FiChevronRight, FiArrowLeft } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router"; 
import { api } from "../../services/api";

const EditChapter = () => {
  const navigate = useNavigate();
  const { chapterId, chapterTitle } = useParams(); // Get chapterId from URL params
  
  const [chapterData, setChapterData] = useState({
    title: "",
    images: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/staff/chapter/${chapterId}`);
        console.log(response)
        
        if (response.data.success && response.data.data.length > 0) {
          const chapter = response.data.data[0];
          setChapterData({
            title: chapterTitle, // Example title format
            images: chapter.images
          });
        }
      } catch (err) {
        console.error("Error fetching chapter data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [chapterId]);

  const handleAddPage = () => {
    // Implement your add page logic here
    // For example, open a file dialog to upload new images
  };

  const handleDeleteSelected = () => {
    setChapterData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => !selectedPages.includes(index))
    }));
    setSelectedPages([]);
  };

  const handleDeleteAll = () => {
    setChapterData(prev => ({ ...prev, images: [] }));
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

  const handleSave = async () => {
    try {
      setLoading(true);
      // Prepare the data to send to the API
      const updatedChapter = {
        chapterId: chapterId,
        images: chapterData.images
      };
      
      // Call the API to update the chapter
      await api.put(`/api/staff/chapter/${chapterId}`, updatedChapter);
      
      // Navigate back after successful save
      navigate(-1);
    } catch (err) {
      console.error("Error saving chapter:", err);
      alert("Failed to save chapter changes");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard your changes?")) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <main className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Back button */}
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition"
            >
              <FiArrowLeft />
              <span>Back</span>
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
                  <span>{selectedPages.length} pages selected</span>
                ) : (
                  <span>Total {chapterData.images.length} pages</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleAddPage}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors"
                >
                  <FiPlus className="mr-1" /> Add Page
                </button>

                {chapterData.images.length > 0 && (
                  <button
                    onClick={handleDeleteAll}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors"
                  >
                    <FiTrash2 className="mr-1" /> Delete All
                  </button>
                )}

                {selectedPages.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors"
                  >
                    <FiTrash2 className="mr-1" /> Delete Selected
                  </button>
                )}
              </div>
            </div>

            {/* Pages Grid */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading data...</div>
            ) : chapterData.images.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border-2 border-dashed rounded-lg">
                No pages in this chapter yet
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {chapterData.images.map((imageUrl, index) => (
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
                      src={imageUrl}
                      alt={`Page ${index + 1}`}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                    <div className="p-2 bg-gray-100 text-center text-sm font-medium">
                      Page {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <FiX className="mr-1" /> Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center transition-colors disabled:opacity-50"
            >
              <FiSave className="mr-1" /> Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditChapter;