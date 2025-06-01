import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router';
import { api, apiAuth } from '../../services/api';

const StoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [totalChapters, setTotalChapters] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true);
        const storyResponse = await api.get(`/api/staff/book/${id}`);
        setStory(storyResponse.data.data);
        setChapters([]);
      } catch (err) {
        setError(err.message || 'An error occurred while loading data.');
        console.error('Error when getting story data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [id]);

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
      console.log(response.data.data);
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


  const handleBack = () => {
    navigate(-1);
  };

  const handleEditStory = () => {
    navigate(`/staff/story-management/edit-story/${story._id}`);
  };

  const handleDeleteStory = async () => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      console.log('Delete story', story._id);
      if (window.confirm(`Bạn có chắc muốn xóa truyện này?`)) {
        try {
          await apiAuth.delete(`/api/staff/book/${story._id}`);
          navigate(-1);
        } catch (error) {
          console.error('Lỗi khi xóa truyện:', error);
        }
      }
    }
  };

  const renderChapterTitle = (chapter) => {
    if (chapter.title) return chapter.title;
    return `Chapter ${chapter.chapter}${chapter.volume ? ` (Vol. ${chapter.volume})` : ''}`;
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
            onClick={handleBack}
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
          <p className="text-gray-700 mb-4">Story with ID {id} does not exist or has been deleted.</p>
          <button
            onClick={handleBack}
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
            onClick={handleBack}
            className="flex items-center text-teal-600 hover:text-teal-800"
          >
            <FiChevronLeft className="mr-1" />
            <span>Back </span>
          </button>
        </div>

        {/* Story info section */}
        <div className="px-4 py-4 md:px-6 md:py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover image */}
            <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
              <img
                src={story.bookImg?.url || story.cover_url || '/placeholder.jpg'}
                alt={`${story.title} cover`}
                className="w-full h-auto rounded shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.jpg';
                }}
              />
            </div>

            {/* Story details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{story.title}</h1>

                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <FiStar className="text-yellow-500 mr-1" />
                  <span className="font-medium">{story.rate}/5</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Author:</span> {story.author?.join(', ') || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Artist:</span> {story.artist?.join(', ') || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Type:</span> {story.type === 'manga' ? 'Manga' : story.type || 'Không rõ'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Tags:</span> {story.tags?.join(', ') || 'N/A'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>
                    <span className={`ml-1 px-2 py-1 text-xs rounded-full ${story.status === 'completed' ? 'bg-green-100 text-green-800' :
                      story.status === 'ongoing' ? 'bg-teal-100 text-teal-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {story.status === 'completed' ? 'Completed' :
                        story.status === 'ongoing' ? 'Ongoing' :
                          story.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-medium mb-2">Synopsis:</h2>
                <p className="text-gray-700 whitespace-pre-line">{story.synopsis || 'No synopsis yet.'}</p>
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
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="font-medium">
                    {story.updatedAt ? new Date(story.updatedAt).toLocaleDateString() : 'Không rõ'}
                  </p>
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-sm text-gray-500">Manga ID</p>
                  <p className="font-medium text-xs break-all">{story.mangaid}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleEditStory}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center"
            >
              <FiEdit className="mr-2" />
              <span>Edit story</span>
            </button>
            <button
              onClick={handleDeleteStory}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <FiTrash2 className="mr-2" />
              <span>Delete story</span>
            </button>
          </div>
        </div>

        {/* Chapter management section */}
        <div className="px-4 py-4 md:px-6 md:py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl font-semibold">List of chapters</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Total: {totalChapters} chapters
              </span>

            </div>
          </div>

          {/* Scrollable chapters container */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[400px]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
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
      </div>
    </div>
  );
};

export default StoryDetail;