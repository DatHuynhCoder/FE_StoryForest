import { useNavigate, useParams } from "react-router";
//icon and default pic
import DefaultBG from "../../assets/default_bg_profile.jpg";
import DefaultAvt from "../../assets/default_avatar.jpg";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

//import Spinner
import Spinner from "../../components/Spinner";
import { useEffect, useState } from "react";

//import api
import { api } from "../../services/api";

//scroll to top
import scrollToTop from "../../utils/ScrollToTop";

const OtherProfile = () => {
  const navigate = useNavigate();
  const { _id } = useParams() //From rank or comment
  const [user, setUser] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  //Get Account data
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await api.get(`/api/user/displaydata/account/${_id}`);
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Cannot find Account:", error);
      }
    }

    const fetchFavorite = async () => {
      try {
        const response = await api.get(`/api/user/displaydata/favorite/${_id}`);
        if (response.data.success) {
          setFavoriteBooks(response.data.data);
        }
      } catch (error) {
        console.error("Khong tìm thấy favorite:", error);
      }
    };

    scrollToTop();
    fetchAccount();
    fetchFavorite();
  }, [_id])

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

  //Spinner to load while fetching data
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-gray-50 py-6">
      <div className="w-full max-w-5xl bg-white pb-5 rounded-2xl shadow-md">
        {/* Profile Header */}
        {/* Background Profile */}
        <div className="relative h-48 sm:h-64 rounded-t-2xl overflow-visible">
          <img className="w-full h-full object-cover object-center" src={user?.bgImg?.url || DefaultBG} alt="background-profile" />

          {/* Avatar */}
          <img
            className="absolute left-1/2 -bottom-16 sm:-bottom-20 transform -translate-x-1/2 rounded-full h-32 w-32 sm:h-40 sm:w-40 border-4 border-white shadow-lg"
            src={user?.avatar?.url || DefaultAvt}
            alt="User Avatar"
          />
        </div>

        <div className="flex flex-col sm:flex-row relative mt-20 sm:mt-24">
          {/* Username */}
          <h1 className="text-center text-2xl sm:text-3xl font-bold flex-1">
            {user?.username}
          </h1>
        </div>

        {/* information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-4 md:px-8">
          <div className="p-2 sm:p-3 flex flex-row items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg">
            <img src="/images/email.png" alt="email logo" className="w-6 h-6 sm:w-7 sm:h-7" />
            <div className="flex-1 text-sm sm:text-base overflow-hidden text-ellipsis">
              <span className="font-bold">Email: </span>
              {user?.email}
            </div>
          </div>

          <div className="p-2 sm:p-3 flex flex-row items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg">
            <img src="/images/phone.png" alt="phone logo" className="w-6 h-6 sm:w-7 sm:h-7" />
            <div className={`flex-1 text-sm sm:text-base ${user?.phone ? "" : "text-gray-500 italic"}`}>
              <span className="font-bold">Phone: </span>
              {user?.phone ? user.phone : "Add a phone number"}
            </div>
          </div>

          <div className="p-2 sm:p-3 flex flex-row items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg">
            <img src="/images/medal.png" alt="medal logo" className="w-6 h-6 sm:w-7 sm:h-7" />
            <div className="flex-1 text-sm sm:text-base">
              <span className="font-bold">Achievement: </span>
              {user?.achivement}
            </div>
          </div>

          <div className="p-2 sm:p-3 flex flex-row items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg">
            <img src="/images/rank.png" alt="medal logo" className="w-6 h-6 sm:w-7 sm:h-7" />
            <div className="flex-1 text-sm sm:text-base">
              <span className="font-bold">Rank: </span>
              {user?.rank}
            </div>
          </div>

          <div className="p-2 sm:p-3 flex flex-row items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg">
            <img src="/images/level.png" alt="medal logo" className="w-6 h-6 sm:w-7 sm:h-7" />
            <div className="flex-1 text-sm sm:text-base">
              <span className="font-bold">Level: </span>
              {user?.level} ({user?.exp})
            </div>
          </div>

          <div className="p-2 sm:p-3 flex flex-row items-center gap-2 sm:gap-4">
            <img src="/images/role.png" alt="role logo" className="w-6 h-6 sm:w-8 sm:h-8" />
            <div className="flex-1 text-sm sm:text-xl">
              <span className="font-bold">Role: </span>
              {user?.role === 'VIP reader' ? (
                <span className="inline-flex items-center gap-1 font-bold text-yellow-500 bg-yellow-100 px-2 py-0.5 rounded shadow-sm animate-pulse">
                  👑 VIP reader
                </span>
              ) : (
                <span className="text-gray-700">{user?.role}</span>
              )}
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="px-4 md:px-8 mt-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 flex flex-row items-center gap-2">
              <div>About Me</div>
              <img src="/images/info.png" alt="info about me" className="w-7 h-7 sm:w-8 sm:h-8" />
            </h2>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <ul className="text-sm sm:text-base">
              {user.about.map((fact, index) => (
                <li key={index} className="font-normal text-base mb-1">
                  - {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Favorite Books */}
        <div className="px-4 md:px-8 mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-700 flex flex-row items-center gap-2 mb-3 justify-between">
            <div className="flex flex-row items-center gap-2">
              <div>Favorite Books</div>
              <img src="/images/fav_book.png" alt="favorite books" className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <button type="button" className="cursor-pointer text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 font-bold rounded-full text-sm p-2 text-center inline-flex items-center">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
              <span className="sr-only">see more</span>
            </button>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {favoriteBooks.map((book, index) => (
              <div key={index} className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden sm:flex-row hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="w-full h-40 object-cover sm:w-32 sm:h-full" src={book.bookImg.url} alt={book.title} />
                <div className="flex flex-col justify-between p-3 leading-normal">
                  <h4 className="mb-1 text-lg font-bold tracking-tight dark:text-white line-clamp-2">{book.title}</h4>
                  <p className="mb-1 font-normal text-green-700 text-sm line-clamp-1">
                    {Array.isArray(book.author) ? book.author.join(', ') : book.author}
                  </p>
                  <p className="mb-2 font-normal text-black text-sm line-clamp-2">{book.synopsis}</p>

                  <div className="flex flex-row justify-start mt-2">
                    <button type="button"
                      onClick={() => handleContinueReading(book)}
                      className="flex flex-row items-center gap-1 text-xs cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full px-3 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      <div>Read</div>
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherProfile