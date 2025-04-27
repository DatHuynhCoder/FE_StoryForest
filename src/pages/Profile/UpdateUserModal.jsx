import { useState, useEffect } from "react";
import { FaSave, FaTimes, FaUser, FaImage, FaCamera, FaPhone } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { apiAuth } from "../../services/api";
import DefaultBG from "../../assets/default_bg_profile.jpg";
import DefaultAvt from "../../assets/default_avatar.jpg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

const UpdateUserModal = ({ isOpen, onClose, user, onUserUpdate }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phone:"",
    gender: "",
    avatar: null,
    bgImg: null
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        name: user.name || "",
        phone: user.phone || "",
        gender: user.gender || "",
      });
      if (user.avatar?.url) {
        setAvatarPreview(user.avatar.url);
      }
      if (user.bgImg?.url) {
        setBgPreview(user.bgImg.url);
      }
    }
  }, [user, isOpen]);

  //Change form data when username, name, phone change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //Change form data when avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //Change form data when background change
  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        bgImg: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("username", formData.username);
      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone)
      submitData.append("gender", formData.gender);
      
      // Add avatar if exists
      if (formData.avatar instanceof File) {
        submitData.append("avatar", formData.avatar);
      }
      
      // Add background image if exists
      if (formData.bgImg instanceof File) {
        submitData.append("bgImg", formData.bgImg);
      }
      
      //call api to update user data in backend
      const response = await apiAuth.patch("/api/reader/account", submitData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      if (response.data.success) {
        toast.success("Update user successfully")
        dispatch(updateUser(response.data.data));
        onUserUpdate(response.data.data);
        onClose();
      }
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-xl animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-4 px-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Cập nhật thông tin cá nhân</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Images Upload Section */}
            <div className="flex flex-col items-center gap-6">
              {/* Avatar Upload */}
              <div className="text-center">
                <p className="mb-2 font-bold text-gray-700">Ảnh đại diện</p>
                <div className="relative w-40 h-40">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-500 group">
                    <img
                      src={avatarPreview || DefaultAvt}
                      alt="User Avatar"
                      className="w-full h-full object-cover transition-opacity group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label htmlFor="avatar-upload" className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                        <FaCamera className="w-5 h-5" />
                      </label>
                    </div>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById('avatar-upload').click()}
                  className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
                >
                  <FaCamera className="w-4 h-4" /> Thay đổi ảnh
                </button>
              </div>

              {/* Background Image Upload */}
              <div className="text-center">
                <p className="mb-2 font-bold text-gray-700">Ảnh bìa</p>
                <div className="relative w-64 h-32">
                  <div className="w-64 h-32 rounded-lg overflow-hidden border-4 border-blue-500 group">
                    <img
                      src={bgPreview || DefaultBG}
                      alt="Background Image"
                      className="w-full h-full object-cover transition-opacity group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label htmlFor="bg-upload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                        <FaImage className="w-5 h-5" />
                      </label>
                    </div>
                  </div>
                  <input
                    id="bg-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleBgImageChange}
                    className="hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById('bg-upload').click()}
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
                >
                  <FaImage className="w-4 h-4" /> Thay đổi ảnh bìa
                </button>
              </div>
            </div>

            {/* User Info Form */}
            <div className="flex-1 space-y-5">
              <div>
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                  Tên người dùng (Username)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-600">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="py-3 pl-10 pr-4 block w-full rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-600">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="py-3 pl-10 pr-4 block w-full rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Họ và tên"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-600">
                    <FaPhone />
                  </div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="py-3 pl-10 pr-4 block w-full rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Số điện thoại"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
                  Giới tính
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-600">
                    <BsGenderAmbiguous />
                  </div>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="py-3 pl-10 pr-4 block w-full rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    required
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Không tiện tiết lộ">Không tiện tiết lộ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-bold hover:bg-gray-100 flex items-center gap-2"
            >
              <FaTimes /> Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full hover:from-green-600 hover:to-emerald-700 flex items-center gap-2 shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FaSave />
              )}
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;