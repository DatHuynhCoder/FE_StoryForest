import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import { toast } from 'react-toastify';
import { apiAuth } from '../../services/api';

const Settings = () => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const handleChangePass = async () => {
    try {
      const response = await apiAuth.patch('/api/reader/account/changepass', {password, newpassword});

      if(response.data.success){
        setPassword('');
        setNewpassword('');
        toast.success(response.data.message);
      } else {
        toast.error(error.response?.data?.message || "Change Pass failed");
      }
    } catch (error) {
      console.error("An error occurred during change pass:", error);
      toast.error("Error: Cannot change Pass");
    }
  }

  return (
    <div className="w-full min-h-1/2 flex flex-col bg-white p-4 sm:p-5 rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 flex flex-row items-center gap-2 sm:gap-3 mb-4">
        <div>Cài đặt tài khoản</div>
        <FaCog />
      </h2>

      <div className="space-y-3 sm:space-y-4">
        <div className="p-3 sm:p-4 border rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Đổi mật khẩu</h3>

          {/* Pass word input  */}
          <div className="bg-(--primary-color) flex items-center rounded-3xl gap-2.5 px-5 py-2">
            <RiLockPasswordFill className="w-8 h-8 text-blue-800" />
            <input
              className="flex-1 w-full pl-2 py-1 focus:outline-none"
              type="text"
              placeholder="Old Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* New Password Input */}
          <div className="bg-(--primary-color) flex items-center rounded-3xl gap-2.5 px-5 py-2">
            <RiLockPasswordFill className="w-8 h-8 text-blue-800" />
            <input
              className="flex-1 w-full pl-2 py-1 focus:outline-none"
              type="text"
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
            />
          </div>

          {/* Change Pass Button */}
          <button
            type="button"
            className="text-sm sm:text-base cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleChangePass}
          >
            ✏️ Chỉnh sửa
          </button>
        </div>

        <div className="p-3 sm:p-4 border rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Thông báo</h3>
          <div className="flex items-center">
            <input type="checkbox" id="emailNotif" className="mr-2" />
            <label htmlFor="emailNotif" className="text-sm sm:text-base">Nhận thông báo qua email</label>
          </div>
        </div>

        <div className="p-3 sm:p-4 border rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Giao diện</h3>
          <div className="flex items-center">
            <input type="checkbox" id="darkMode" className="mr-2" />
            <label htmlFor="darkMode" className="text-sm sm:text-base">Chế độ tối</label>
          </div>
        </div>

        <div className="p-3 sm:p-4 border rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Ngôn ngữ</h3>
          <select className="border p-2 rounded text-sm sm:text-base">
            <option>Tiếng Việt</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;