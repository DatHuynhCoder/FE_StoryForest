import DefaultBG from "../../assets/default_bg_profile.jpg";
import DefaultAvt from "../../assets/default_avatar.jpg";
import { FaCrown, FaUser, FaBook, FaHeart, FaCog, FaBars } from "react-icons/fa";

//import api
import { apiAuth, api } from "../../services/api";

import { useEffect, useState } from "react";

//import Spinner
import Spinner from "../../components/Spinner";
//import modal
import UpdateUserModal from "./UpdateUserModal";

//import components
import FavoriteBooks from "./FavoriteBooks";
import AboutMe from "./AboutMe";
import Settings from "./Setting";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

// cookie
import { useCookies } from "react-cookie";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [cookie, setCookie, removeCookie] = useCookies(["theme", "intensity"])

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await apiAuth.get('/api/reader/favorite/getFavorite');
        if (response.data.success) {
          setFavoriteBooks(response.data.data);
        }
      } catch (error) {
        console.error("Khong tìm thấy favorite:", error);
      }
    };

    fetchFavorite();
  }, [])

  // Close sidebar when selecting an option on mobile
  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  //Handle click on continue Reading favorite Book
  const handleContinueReading = (book) => {
    try {
      if (book.type === 'manga') {
        navigate(`/manga/${book._id}`);
      }
      else {
        navigate(`/novel/${book._id}`);
      }
    } catch (error) {
      toast.error("An error occur during continue reading:", error);
    }
  }

  //Handle click on remove favorite book
  const handleDeleteFavoritebook = async (bookId) => {
    try {
      const response = await apiAuth.delete('/api/reader/favorite/deleteFavorite', {
        data: { bookId: bookId }
      });
      if (response.data.success) {
        console.log(response.data.data);
        // Update the favoriteBooks state to remove the deleted book
        setFavoriteBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
        toast.success('Delete favorite book sucessfully');
      }
      else {
        toast.error('Error in deleting davorite book');
      }
    } catch (error) {
      toast.error("An error occur during delete favorite book:", error);
    }
  }

  //Handle logout
  const handleLogout = async () => {
    try {
      const response = await api.post("/api/reader/account/logout");
      if (response.data.success) {
        dispatch(logout());
        removeCookie("theme")
        removeCookie("intensity")
        navigate("/login")
      }
    } catch (error) {
      toast.error("An error occur during logout:", error);
    }
  }

  // Handle upgrade vip
  const handleUpgradeVip = () => {
    apiAuth.post('/api/reader/payment/create-payment-link').then(res => {
      window.location.href = res.data.url;
    })
  }

  //Spinner to load while fetching data
  if (!user) {
    return <Spinner />;
  }

  // Sidebar menu items
  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: <FaUser /> },
    { id: 'about', label: 'About Me', icon: <FaBook /> },
    { id: 'favorite', label: 'Favorite Books', icon: <FaHeart /> },
    { id: 'settings', label: 'Setting', icon: <FaCog /> }
  ];

  // Profile Header Component
  const ProfileHeader = () => (
    <div className="w-full min-h-1/2 flex flex-col bg-white pb-5 rounded-2xl">
      {/* Background Profile */}
      <div className="relative h-50 sm:h-70">
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
        {user.role !== "VIP reader" &&
          <div className="flex justify-center mt-4 sm:mt-0 sm:justify-end sm:absolute sm:right-5 sm:bottom-0">
            <button className="p-[3px] cursor-pointer rounded-full bg-black relative" onClick={() => handleUpgradeVip()}> {/* Added relative here */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="flex items-center gap-2 px-4 py-2 font-bold bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                <FaCrown className="text-yellow-400 group-hover:animate-pulse group-hover:text-yellow-300 w-5" />
                Upgrade
              </div>
            </button>
          </div>
        }
      </div>

      {/* information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-4">
        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/email.png" alt="email logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="flex-1 text-sm sm:text-xl overflow-hidden text-ellipsis">
            <span className="font-bold">Email: </span>
            {user?.email}
          </div>
        </div>

        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/phone.png" alt="phone logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className={`flex-1 text-sm sm:text-xl ${user?.phone ? "" : "text-gray-500 italic"}`}>
            <span className="font-bold">Phone: </span>
            {user?.phone ? user.phone : "Add a phone number"}
          </div>
        </div>

        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/medal.png" alt="medal logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="flex-1 text-sm sm:text-xl">
            <span className="font-bold">Achivement: </span>
            {user?.achivement}
          </div>
        </div>

        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/rank.png" alt="medal logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="flex-1 text-sm sm:text-xl">
            <span className="font-bold">Rank: </span>
            {user?.rank}
          </div>
        </div>

        <div className="p-2 sm:p-4 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/level.png" alt="medal logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="flex-1 text-sm sm:text-xl">
            <span className="font-bold">Level: </span>
            {user?.level} ( {user?.exp} )
          </div>
        </div>

        <div className="p-2 sm:p-3 flex flex-row items-center gap-2 sm:gap-4">
          <img src="/images/role.png" alt="role logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="flex-1 text-sm sm:text-xl">
            <span className="font-bold">Role: </span>
            {user?.role}
          </div>
        </div>
      </div>

      {/* Edit and Exit section */}
      <div className="flex flex-row justify-center gap-4 sm:gap-10 mt-4">
        <button
          type="button"
          className="text-sm sm:text-base cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => setIsModalOpen(true)}
        >
          ✏️ Edit
        </button>

        <button onClick={handleLogout} type="button" className="text-green-700 font-bold hover:text-white rounded-full border-2 cursor-pointer border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-3 sm:px-5 py-2 sm:py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
          🚪Log out
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
        return <AboutMe aboutUser={user?.about} />;
      case 'favorite':
        return <FavoriteBooks
          books={favoriteBooks}
          handleContinueReading={handleContinueReading}
          handleDeleteFavoritebook={handleDeleteFavoritebook}
        />;
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
      />
    </div>
  );
};

export default Profile;