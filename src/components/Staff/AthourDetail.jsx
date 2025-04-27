import React from 'react';
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const AuthorDetail = () => {
  const navigate = useNavigate();

  // Dữ liệu tác giả
  const author = {
    name: "Eiichiro Oda",
    country: "Nhật Bản",
    gender: "Nam",
    birthDate: "01/01/1975",
    avatarUrl: "https://randomuser.me/api/portraits/men/13.jpg", 
   
    description: `
      Eiichiro Oda là một họa sĩ truyện tranh người Nhật Bản, nổi tiếng toàn cầu với việc sáng tạo và minh họa bộ manga huyền thoại One Piece. 
      Sinh ngày 1 tháng 1 năm 1975 tại tỉnh Kumamoto, Nhật Bản, Oda bắt đầu sự nghiệp truyện tranh từ khi còn trẻ và sớm thể hiện được tài năng của mình.
      One Piece, được đăng lần đầu tiên vào năm 1997 trên tạp chí Weekly Shonen Jump, đã trở thành một trong những manga bán chạy nhất mọi thời đại.
    `,
    works: [
      { title: "One Piece", chapters: 1080, viewed: true },
      { title: "Wanted!", chapters: 5, viewed: false },
      { title: "Monsters", chapters: 1, viewed: true },
    ]
  };

  const handleBack = () => navigate(-1);
  const handleConfirm = () => {
    alert("Thông tin đã được xác nhận");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 mr-2"
          >
            <FiArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{author.name}</h1>
        </div>

        {/* Author Info */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-teal-100">
                <img 
                  src={author.avatarUrl} 
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-medium text-gray-500">Quốc gia</h3>
                  <p>{author.country}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Giới tính</h3>
                  <p>{author.gender}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Ngày sinh</h3>
                  <p>{author.birthDate}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-500 mb-2">Giới thiệu</h3>
                <p className="whitespace-pre-line">{author.description}</p>
              </div>
            </div>
          </div>

          {/* Works Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Danh sách truyện</h2>
            
            <div className="mb-4 flex justify-between items-center">
              <span className="text-gray-500">Sắp xếp: Mới nhất</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Truyện</th>
                    <th className="text-left py-2">Số chương</th>
                    <th className="text-left py-2">Xem</th>
                  </tr>
                </thead>
                <tbody>
                  {author.works.map((work, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{work.title}</td>
                      <td className="py-3">{work.chapters}</td>
                      <td className="py-3">
                        {work.viewed ? (
                          <FiCheck className="text-green-500" />
                        ) : (
                          <FiX className="text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;