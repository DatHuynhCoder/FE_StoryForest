import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiChevronRight, FiArrowLeft, FiStar } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router';
import { apiAuth, api } from '../../services/api';

const EditStory = () => {
  const { id_story } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [totalChapters, setTotalChapters] = useState(0);
  const [coverPreview, setCoverPreview] = useState('');

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true);
        const storyResponse = await api.get(`/api/staff/book/${id_story}`);
        setStory(storyResponse.data.data);
        setCoverPreview(storyResponse.data.data.bookImg.url || '');
        setChapters([]);
      } catch (err) {
        setError(err.message || 'An error occurred while loading data.');
        console.error('Error when getting story data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [id_story]);

  useEffect(() => {
    if (story) {
      if (story.type === "manga") fetchChapters(story.mangaid, currentPage);
      else fetchNovelChapters(story._id, currentPage);
    }
  }, [story, currentPage]);

  const fetchChapters = async (mangaid, page = 1) => {
    try {
      const response = await api.get(`/api/staff/chapter/${mangaid}/chapters`);
      setChapters(response.data.data);
      setTotalChapters(response.data.total || 0);
    } catch (err) {
      console.error('Error fetching chapters:', err);
      setChapters([]);
    }
  };

  const fetchNovelChapters = async (novelid, page = 1) => {
    try {
      const response = await api.get(`/api/staff/chapter/${novelid}/novelchapters`);
      setChapters(response.data.data);
      setTotalChapters(response.data.total || 0);
    } catch (err) {
      console.error('Error fetching chapters:', err);
      setChapters([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setStory(prev => ({
        ...prev,
        coverFile: file
      }));
    }
  };

  const renderChapterTitle = (chapter) => {
    if (chapter.title) return chapter.title;
    return `Chapter ${chapter.chapter}${chapter.volume ? ` (Vol. ${chapter.volume})` : ''}`;
  };

  const handleEditChapter = (chapter) => {
    if (story.type === 'manga') {
      const chapterId = chapter.chapterid;
      const chapterTitle = chapter.title ? chapter.title : "No Title";
      navigate(`/staff/story-management/edit-chapter/${chapterTitle}/${chapterId}`);
    }
    else if (story.type === 'novel') {
      const chapterId = chapter._id;
      navigate(`/staff/story-management/edit-novel-chapter/${chapterId}`);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      if (story.type === 'manga') {
        try {
          await apiAuth.delete(`/api/staff/chapter/manga/${chapterId}`);
          // Refresh chapters list after deletion
          fetchChapters(story.mangaid, currentPage);
        } catch (err) {
          console.error('Error deleting chapter:', err);
        }
      } else if (story.type === 'novel') {
        try {
          await apiAuth.delete(`/api/staff/chapter/novel/${chapterId}`);
          // Refresh chapters list after deletion
          fetchNovelChapters(story._id, currentPage);
        } catch (err) {
          console.error('Error deleting chapter:', err);
        }
      }
    }
  };

  const handleAddChapter = () => {
    if (story.type === 'manga') {
      navigate(`/staff/story-management/add-chapter/${story.mangaid}`);
    } else if (story.type === 'novel') {
      navigate(`/staff/story-management/add-novel-chapter/${story._id}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', story.title);
      // Convert strings to arrays before sending
      const authorArray = typeof story.author === 'string'
        ? story.author.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : story.author || [];

      const artistArray = typeof story.artist === 'string'
        ? story.artist.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : story.artist || [];

      const tagsArray = typeof story.tags === 'string'
        ? story.tags.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : story.tags || [];

      formData.append('author', JSON.stringify(authorArray));
      formData.append('artist', JSON.stringify(artistArray));
      formData.append('tags', JSON.stringify(tagsArray));
      formData.append('type', story.type);
      formData.append('status', story.status);
      formData.append('synopsis', story.synopsis);

      if (story.coverFile) {
        formData.append('bookImg', story.coverFile);
      }

      await apiAuth.patch(`/api/staff/book/${id_story}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Story updated successfully!');
      navigate(`/staff/story-management`);
    } catch (err) {
      console.error('Error while updating story:', err);
      alert('An error occurred while updating the story.');
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard your changes?")) {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading story data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error loading data</h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Story not found</h3>
          <p className="text-gray-700 mb-4">Story with ID {id_story} does not exist or has been deleted.</p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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

        {/* Story edit form */}
        <form onSubmit={handleSubmit} className="px-4 py-4 md:px-6 md:py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover image */}
            <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
              <img
                src={coverPreview || '/placeholder.jpg'}
                alt={`${story.title} cover`}
                className="w-full h-auto rounded shadow-md mb-2 aspect-[3/4] object-cover"
              />
              <input
                type="file"
                id="cover-upload"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
              <label
                htmlFor="cover-upload"
                className="block w-full px-3 py-2 bg-teal-600 text-white text-center rounded hover:bg-teal-700 cursor-pointer"
              >
                Change cover
              </label>
            </div>

            {/* Story details form */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    name="title"
                    value={story.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <FiStar className="text-yellow-500 mr-1" />
                  <span className="font-medium">{story.rate}/5</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authors (comma separated)</label>
                  <input
                    name="author"
                    value={typeof story.author === 'string' ? story.author : story.author?.join(', ') || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Artists (comma separated)</label>
                  <input
                    name="artist"
                    value={typeof story.artist === 'string' ? story.artist : story.artist?.join(', ') || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={story.type}
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
                    value={typeof story.tags === 'string' ? story.tags : story.tags?.join(', ') || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={story.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="hiatus">Hiatus</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manga/Novel ID</label>
                  <input
                    name="mangaid"
                    value={story.mangaid}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Synopsis</label>
                <textarea
                  name="synopsis"
                  rows={6}
                  value={story.synopsis}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Views</p>
                  <p className="font-medium">{story.views || 0}</p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Followers</p>
                  <p className="font-medium">{story.followers || 0}</p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Total Chapters</p>
                  <p className="font-medium">{totalChapters || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter management section */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h2 className="text-xl font-semibold">Chapter List</h2>

              <button
                type="button"
                onClick={handleAddChapter}
                className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 flex items-center text-sm"
              >
                <FiPlus className="mr-1" />
                <span>Add Chapter</span>
              </button>
            </div>

            {/* Chapters table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-y-auto max-h-[400px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {chapters?.length > 0 ? (
                      chapters.map((chapter) => (
                        <tr key={chapter._id} className="hover:bg-gray-50">
                          {chapter.order ? (
                            <>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {chapter.chapter_title || 'No Title'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {chapter.order || '-'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {chapter.chapter_content.length || '-'} paragraphs
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {'-'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-3">
                                  <button
                                    type="button"
                                    onClick={() => handleEditChapter(chapter)}
                                    className="text-teal-600 hover:text-teal-800 cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteChapter(chapter._id)}
                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {renderChapterTitle(chapter)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {chapter.volume || '-'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {chapter.pages || 0} pages
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {chapter.publishDate
                                  ? new Date(chapter.publishDate).toLocaleDateString()
                                  : '-'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-3">
                                  <button
                                    type="button"
                                    onClick={() => handleEditChapter(chapter)}
                                    className="text-teal-600 hover:text-teal-800"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteChapter(chapter.chapterid)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </>
                          )}

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                          No chapters found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>


          </div>

          {/* Action buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStory;

<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
  <div className="flex space-x-3">
    <button
      type="button"
      onClick={() => handleEditChapter(chapter)}
      className="text-teal-600 hover:text-teal-800"
    >
      Edit
    </button>
    <button
      type="button"
      onClick={() => handleDeleteChapter(chapter.chapterid)}
      className="text-red-600 hover:text-red-800"
    >
      Delete
    </button>
  </div>
</td>