import { FiPlus, FiTrash2, FiSave, FiX, FiUpload, FiEdit2, FiArrowLeft, FiStar } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router";
import { apiAuth } from "../../services/api";

const AddNewStory = () => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({
    title: "",
    tags: "",
    author: "",
    artist: "",
    synopsis: "",
    status: "ongoing",
    coverImage: null,
    coverFile: null,
    type: "manga",
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
          coverImage: reader.result,
          coverFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', storyData.title);
      // Convert strings to arrays before sending
      const authorArray = typeof storyData.author === 'string'
        ? storyData.author.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : storyData.author || [];

      const artistArray = typeof storyData.artist === 'string'
        ? storyData.artist.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : storyData.artist || [];

      const tagsArray = typeof storyData.tags === 'string'
        ? storyData.tags.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : storyData.tags || [];

      formData.append('author', JSON.stringify(authorArray));
      formData.append('artist', JSON.stringify(artistArray));
      formData.append('tags', JSON.stringify(tagsArray));
      formData.append('type', storyData.type);
      formData.append('status', storyData.status);
      formData.append('synopsis', storyData.synopsis);

      if (storyData.coverFile) {
        formData.append('bookImg', storyData.coverFile);
      }

      await apiAuth.post(`/api/staff/book`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Story Added Successfully !");
      navigate("/staff/story-management");
    } catch (error) {
      console.log(error)
      alert("Error in adding new story!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc muốn hủy bỏ thao tác thêm truyện?")) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <main className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
          <button
            onClick={handleCancel}
            className="flex items-center text-teal-600 hover:text-teal-800"
          >
            <FiArrowLeft className="mr-1" />
            <span>Back</span>
          </button>
        </div>

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
                    <p>Upload book cover image</p>
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
                  Choose Image
                </label>
              </div>
            </div>

            {/* Story Info Form */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    name="title"
                    value={storyData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authors (comma separated)</label>
                  <input
                    name="author"
                    value={typeof storyData.author === 'string' ? storyData.author : storyData.author?.join(', ') || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Artists (comma separated)</label>
                  <input
                    name="artist"
                    value={typeof storyData.artist === 'string' ? storyData.artist : storyData.artist?.join(', ') || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={storyData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="manga">Manga</option>
                    <option value="novel">Novel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                  <input
                    name="tags"
                    value={typeof storyData.tags === 'string' ? storyData.tags : storyData.tags?.join(', ') || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={storyData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="hiatus">Hiatus</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Synopsis</label>
                <textarea
                  name="synopsis"
                  rows={6}
                  value={storyData.synopsis}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
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
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              AddBook
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewStory;