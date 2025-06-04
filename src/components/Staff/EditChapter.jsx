import { FiPlus, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { api, apiAuth } from "../../services/api";

const EditChapter = () => {
  const navigate = useNavigate();
  const { chapterId, chapterTitle = "No Title" } = useParams();

  const [chapterData, setChapterData] = useState({
    title: "",
    images: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChapterData();
  }, [chapterId]);

  const fetchChapterData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/staff/chapter/${chapterId}`);

      if (response.data.success && response.data.data.length > 0) {
        const chapter = response.data.data[0];
        setChapterData({
          title: chapterTitle,
          images: chapter.images
        });
      }
    } catch (err) {
      console.error("Error fetching chapter data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPage = async (pageIndex) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        await uploadPage(file, pageIndex);
      }
    };
    fileInput.click();
  };

  const uploadPage = async (file, pageIndex) => {
    try {
      const formData = new FormData();
      formData.append('pageImg', file);
      formData.append('chapterid', chapterId);
      formData.append('pageindex', pageIndex.toString());

      const response = await apiAuth.patch('/api/staff/chapter/addpage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Refresh chapter data to show the new page
        await fetchChapterData();
      }
    } catch (err) {
      console.error("Error adding page:", err);
    }
  };

  const handleDeletePage = async (pageIndex) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        const response = await apiAuth.patch('/api/staff/chapter/deletepage', {
          chapterid: chapterId,
          pageindex: pageIndex
        });
        
        if (response.data.success) {
          // Refresh chapter data to reflect the deletion
          await fetchChapterData();
        }
      } catch (err) {
        console.error("Error deleting page:", err);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <main className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Back button */}
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition cursor-pointer"
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
            <div className="mb-4">
              <div className="text-sm text-gray-600">
                Total {chapterData.images.length} pages
              </div>
            </div>

            {/* Pages Grid */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading data...</div>
            ) : chapterData.images.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border-2 border-dashed rounded-lg">
                <p className="mb-4">No pages in this chapter yet</p>
                <button
                  onClick={() => handleAddPageBefore(0)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center mx-auto text-sm transition-colors"
                >
                  <FiPlus className="mr-1" /> Add First Page
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {chapterData.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative border rounded-md overflow-hidden group"
                  >
                    {/* Hover overlay with action buttons */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleAddPage(index)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors cursor-pointer"
                          title="Add page before"
                        >
                          <FiPlus className="mr-1" size={12} /> Before
                        </button>
                        <button
                          onClick={() => handleAddPage(index + 1)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors cursor-pointer"
                          title="Add page after"
                        >
                          <FiPlus className="mr-1" size={12} /> After
                        </button>
                        <button
                          onClick={() => handleDeletePage(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center transition-colors cursor-pointer"
                          title="Delete this page"
                        >
                          <FiTrash2 className="mr-1" size={12} /> Delete
                        </button>
                      </div>
                    </div>
                    
                    <img
                      src={imageUrl.split('@')[0]}
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
        </div>
      </main>
    </div>
  );
};

export default EditChapter;