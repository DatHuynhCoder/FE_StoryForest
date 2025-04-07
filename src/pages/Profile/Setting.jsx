import { FaCog} from 'react-icons/fa';

const Settings = () => (
  <div className="w-full min-h-1/2 flex flex-col bg-white p-4 sm:p-5 rounded-2xl">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 flex flex-row items-center gap-2 sm:gap-3 mb-4">
      <div>Cài đặt tài khoản</div>
      <FaCog />
    </h2>

    <div className="space-y-3 sm:space-y-4">
      <div className="p-3 sm:p-4 border rounded-lg">
        <h3 className="text-lg sm:text-xl font-bold mb-2">Bảo mật tài khoản</h3>
        <button className="text-blue-600 hover:underline text-sm sm:text-base">Đổi mật khẩu</button>
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

export default Settings;