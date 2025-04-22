import React, { useState } from 'react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const AuthorEdit = () => {
  const navigate = useNavigate();
  
  // State cho dữ liệu tác giả
  const [author, setAuthor] = useState({
    name: "Eiichiro Oda",
    country: "Nhật Bản",
    gender: "Nam",
    birthDate: "1975-01-01",
    description: `Eiichiro Oda là một họa sĩ truyện tranh người Nhật Bản, nổi tiếng toàn cầu với việc sáng tạo và minh họa bộ manga huyền thoại One Piece.
Sinh ngày 1 tháng 1 năm 1975 tại tỉnh Kumamoto, Nhật Bản, Oda bắt đầu sự nghiệp truyện tranh từ khi còn rất trẻ và nhanh chóng chứng minh được tài năng của mình.
One Piece, được đăng lần đầu tiên vào năm 1997 trên tạp chí Weekly Shonen Jump, đã trở thành một trong những manga bán chạy nhất mọi thời đại.`,
    avatar: null,
    previewAvatar: "https://randomuser.me/api/portraits/men/13.jpg"
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý upload ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAuthor(prev => ({
        ...prev,
        avatar: file,
        previewAvatar: URL.createObjectURL(file)
      }));
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu đã cập nhật:", author);
    alert("Thông tin tác giả đã được cập nhật thành công!");
    navigate(-1);
  };

  // Xử lý hủy
  const handleCancel = () => {
    if (window.confirm("Bạn có chắc muốn hủy thay đổi?")) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center">
          <button 
            onClick={handleCancel}
            className="p-2 rounded-full hover:bg-gray-100 mr-2"
          >
            <FiArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Chỉnh sửa thông tin tác giả</h1>
        </div>

        {/* Form chỉnh sửa */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Cột ảnh */}
            <div className="w-full md:w-1/3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện</label>
                <div className="relative w-48 h-48 mx-auto md:mx-0">
                  <img 
                    src={author.previewAvatar} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-full border-4 border-teal-100"
                  />
                  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                    <FiUpload className="text-gray-600" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Cột thông tin */}
            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên tác giả</label>
                <input
                  type="text"
                  name="name"
                  value={author.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quốc gia</label>
                <input
                  type="text"
                  name="country"
                  value={author.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                  <select
                    name="gender"
                    value={author.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={author.birthDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
                <textarea
                  name="description"
                  value={author.description}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthorEdit;