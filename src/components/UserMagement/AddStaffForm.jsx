import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Briefcase, Shield, Check, X } from 'lucide-react';

const AddStaffForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    position: '',
    department: '',
    permissions: []
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const permissionOptions = [
    'Thêm truyện',
    'Sửa truyện',
    'Xóa truyện',
    'Duyệt chapter',
    'Quản lý thành viên',
    'Quản lý VIP'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => {
      if (prev.permissions.includes(permission)) {
        return {
          ...prev,
          permissions: prev.permissions.filter(p => p !== permission)
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permission]
        };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.username.trim()) newErrors.username = 'Vui lòng nhập tên đăng nhập';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Email không hợp lệ';
    if (!formData.phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (!formData.position) newErrors.position = 'Vui lòng chọn chức vụ';
    if (formData.permissions.length === 0) newErrors.permissions = 'Vui lòng chọn ít nhất 1 quyền';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Gửi dữ liệu lên server
      console.log('Form data submitted:', formData);
      setSuccess(true);
      // Reset form sau 3 giây
      setTimeout(() => {
        setFormData({
          fullName: '',
          username: '',
          email: '',
          phone: '',
          password: '',
          position: '',
          department: '',
          permissions: []
        });
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <User className="h-6 w-6 mr-2 text-blue-600" />
        Thêm nhân viên mới
      </h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
          <Check className="h-5 w-5 mr-2" />
          Thêm nhân viên thành công!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`pl-10 w-full rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Nguyễn Văn A"
              />
            </div>
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập <span className="text-red-500">*</span></label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`pl-10 w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="nguyenvana"
              />
            </div>
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="nguyenvana@truyen.vn"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`pl-10 w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="0987654321"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu <span className="text-red-500">*</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Ít nhất 6 ký tự"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
        </div>

        {/* Thông tin công việc */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
            Thông tin công việc
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ <span className="text-red-500">*</span></label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`w-full rounded-md border ${errors.position ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Chọn chức vụ</option>
                <option value="Biên tập viên">Biên tập viên</option>
                <option value="Quản lý nội dung">Quản lý nội dung</option>
                <option value="Admin hệ thống">Admin hệ thống</option>
                <option value="Kiểm duyệt viên">Kiểm duyệt viên</option>
              </select>
              {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ví dụ: Biên tập"
              />
            </div>
          </div>
        </div>

        {/* Quyền hạn */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Phân quyền <span className="text-red-500">*</span>
          </h3>
          {errors.permissions && <p className="mt-1 text-sm text-red-600 mb-2">{errors.permissions}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {permissionOptions.map((permission) => (
              <div key={permission} className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePermissionChange(permission)}
                  className={`flex items-center justify-center w-5 h-5 rounded mr-2 ${
                    formData.permissions.includes(permission) 
                      ? 'bg-blue-600 text-white' 
                      : 'border border-gray-300'
                  }`}
                >
                  {formData.permissions.includes(permission) && <Check className="h-3 w-3" />}
                </button>
                <span className="text-sm">{permission}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nút submit */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Thêm nhân viên
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaffForm;