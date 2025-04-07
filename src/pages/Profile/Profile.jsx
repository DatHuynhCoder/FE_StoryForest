import DefaultBG from "../../assets/default_bg_profile.jpg";
import DefaultAvt from "../../assets/default_avatar.jpg";
import { FaCrown, FaUser, FaBook, FaHeart, FaCog, FaBars } from "react-icons/fa";

//import api
import { apiAuth } from "../../services/api";

import { useEffect, useState } from "react";

//import Spinner
import Spinner from "../../components/Spinner";
//import modal
import UpdateUserModal from "./UpdateUserModal";

//import components
import FavoriteBooks from "./FavoriteBooks";
import AboutMe from "./AboutMe";
import Settings from "./Setting";

const aboutUser = [
  "Có thể dành cả ngày trong một hiệu sách mà không thấy chán.",
  "Thích mùi giấy mới và cả mùi sách cũ.",
  "Luôn mang theo ít nhất một cuốn sách khi đi du lịch.",
  "Sở hữu một danh sách 'Sách cần đọc' dài bất tận.",
  "Tin rằng sách giấy có cảm giác khác biệt hơn so với ebook.",
  "Thích đọc sách với một tách trà hoặc cà phê bên cạnh.",
  "Đôi khi mua sách chỉ vì bìa đẹp, chưa chắc đã đọc ngay.",
  "Có thói quen đánh dấu hoặc ghi chú những câu hay trong sách.",
  "Yêu thích cảm giác hoàn thành một cuốn sách nhưng cũng thấy buồn vì nó đã kết thúc.",
  "Ước gì có thêm thời gian mỗi ngày chỉ để đọc nhiều sách hơn."
];

const books = [
  {
    _id: 1,
    name: "Atomic Habits",
    author: "James Clear",
    picture: "/images/book_cover.png",
    description: "A practical guide to building good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results."
  },
  {
    _id: 2,
    name: "The Alchemist",
    author: "Paulo Coelho",
    picture: "/images/book_cover.png",
    description: "A philosophical novel about a shepherd's journey to fulfill his personal legend and discover the true meaning of life."
  },
  {
    _id: 3,
    name: "Deep Work",
    author: "Cal Newport",
    picture: "/images/book_cover.png",
    description: "A book about the benefits of focused work in a distracted world and how to cultivate deep concentration."
  },
  {
    _id: 4,
    name: "1984",
    author: "George Orwell",
    picture: "/images/book_cover.png",
    description: "A dystopian novel that explores a totalitarian future where government surveillance and control suppress individual freedom."
  },
  {
    _id: 5,
    name: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    picture: "/images/book_cover.png",
    description: "An exploration of the history of human evolution, societies, and the forces that shaped our world today."
  },
  {
    _id: 6,
    name: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    picture: "/images/book_cover.png",
    description: "A self-help book that encourages readers to focus on what truly matters and let go of unimportant worries."
  }
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiAuth.get("/api/reader/account");
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Khong tìm thấy người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Close sidebar when selecting an option on mobile
  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  //Spinner to load while fetching data
  if (isLoading) {
    return <Spinner />;
  }

  // Sidebar menu items
  const sidebarItems = [
    { id: 'profile', label: 'Trang cá nhân', icon: <FaUser /> },
    { id: 'about', label: 'Về tôi', icon: <FaBook /> },
    { id: 'favorite', label: 'Sách yêu thích', icon: <FaHeart /> },
    { id: 'settings', label: 'Cài đặt', icon: <FaCog /> }
  ];

  // Profile Header Component
  const ProfileHeader = () => (
    <div className="w-full min-h-1/2 flex flex-col bg-white pb-5 rounded-2xl">
      {/* Background Profile */}
      <div className="relative h-32 sm:h-40">
        <img className="w-full h-full object-cover object-center" src={user?.bgImg?.url || DefaultBG} alt="background-profile" />

        {/* Avatar */}
        <img
          className="absolute left-1/2 -bottom-16 sm:-bottom-24 transform -translate-x-1/2 rounded-full h-32 w-32 sm:h-48 sm:w-48 border-4 border-white"
          src={user?.avatar?.url || DefaultAvt}
          alt="User Avatar"
        />
      </div>

      {/* Username */}
      <div className="flex flex-col sm:flex-row relative mt-20 sm:mt-24">
        <h1 className="text-center text-2xl sm:text-3xl font-bold flex-1">
          {user?.username}
        </h1>
        {/* upgrade button */}
        <div className="flex justify-center mt-4 sm:mt-0 sm:justify-end sm:absolute sm:right-5 sm:bottom-0">
          <button className="p-[3px] cursor-pointer rounded-full bg-black relative"> {/* Added relative here */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="flex items-center gap-2 px-4 py-2 font-bold bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              <FaCrown className="text-yellow-400 group-hover:animate-pulse group-hover:text-yellow-300 w-5" />
              Upgrade
            </div>
          </button>
        </div>
      </div>

      {/* information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-4">
        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/email.png" alt="email logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="flex-1 text-sm sm:text-xl overflow-hidden text-ellipsis">
            {user?.email}
          </div>
        </div>

        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/phone.png" alt="phone logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className={`flex-1 text-sm sm:text-xl ${user?.phone ? "" : "text-gray-500 italic"}`}>
            {user?.phone ? user.phone : "Thêm số điện thoại"}
          </div>
        </div>

        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/medal.png" alt="medal logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="flex-1 text-sm sm:text-xl">New member</div>
        </div>
      </div>

      {/* Edit and Exit section */}
      <div className="flex flex-row justify-center gap-4 sm:gap-10 mt-4">
        <button
          type="button"
          className="text-sm sm:text-base cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => setIsModalOpen(true)}
        >
          ✏️ Chỉnh sửa
        </button>

        <button type="button" className="text-green-700 font-bold hover:text-white rounded-full border-2 cursor-pointer border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-3 sm:px-5 py-2 sm:py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
          🚪Đăng xuất
        </button>
      </div>
    </div>
  );


  // Render the active section content
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileHeader />;
      case 'about':
        return <AboutMe aboutUser={aboutUser} />;
      case 'favorite':
        return <FavoriteBooks books={books} />;
      case 'settings':
        return <Settings />;
      default:
        return <ProfileHeader />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#d9d9d9]">
      {/* Mobile Navigation Header */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-md">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-bold">{sidebarItems.find(item => item.id === activeSection)?.label}</h1>
        <img
          src={user?.avatar?.url || DefaultAvt}
          alt="User Avatar"
          className="h-8 w-8 rounded-full"
        />
      </div>

      <div className="flex flex-row relative">
        {/* Sidebar - hidden on mobile by default */}
        <div
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:static z-30 w-64 bg-white shadow-md md:pt-8 min-h-screen transition-transform duration-300 ease-in-out top-0 md:top-auto`}
        >
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.avatar?.url || DefaultAvt}
              alt="User Avatar"
              className="rounded-full h-16 w-16 md:h-20 md:w-20 border-2 border-purple-500"
            />
            <h2 className="text-lg md:text-xl font-bold mt-2">{user?.username}</h2>
          </div>

          <nav>
            <ul>
              {sidebarItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSectionClick(item.id)}
                    className={`flex cursor-pointer items-center w-full px-4 md:px-6 py-2 md:py-3 text-left transition-colors ${activeSection === item.id
                      ? 'bg-purple-100 text-purple-700 border-r-4 border-purple-700 font-bold'
                      : 'text-gray-700 hover:bg-purple-50'
                      }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            className="fixed inset-0 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="w-full md:flex-1 p-4 md:p-6">
          <div className="max-w-5xl mx-auto mt-0 md:mt-0">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* update modal */}
      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onUserUpdate={(updatedUser) => setUser(updatedUser)}
      />
    </div>
  );
};

export default Profile;