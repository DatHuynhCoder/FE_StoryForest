//image
import DefaultBG from "../../assets/default_bg_profile.jpg";
import DefaultAvt from "../../assets/default_avatar.jpg";
import { FaCrown, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

//import api
import { apiAuth } from "../../services/api";

import { useEffect, useState } from "react";

//import Spinner
import Spinner from "../../components/Spinner";
//import modal
import UpdateUserModal from "./UpdateUserModal";

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
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  //Spinner to load while fetching data
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full min-h-screen bg-[#d9d9d9] flex flex-col items-center gap-6">
      <div className="w-full sm:w-4/5 min-h-1/2 flex flex-col bg-white pb-5 rounded-b-2xl">
        {/* Background Profile */}
        <div className="relative h-40">
          <img className="w-full h-full object-cover object-center" src={user?.bgImg?.url || DefaultBG} alt="background-profile" />

          {/* Avatar */}
          <img
            className="absolute sm:left-1/2 left-1/4 bottom-[-80px] transform -translate-x-1/2 rounded-full h-48 w-48 border-4 border-white"
            src={user?.avatar?.url || DefaultAvt}
            alt="User Avatar"
          />
        </div>

        {/* Username */}
        <div className="flex flex-row relative">
          <h1 className="mx-12 mt-20 sm:text-center text-3xl font-bold flex-1">
            {user?.username}
          </h1>

          {/* upgrade button */}
          <button className="p-[3px] cursor-pointer absolute sm:right-5 right-1 bottom-0 rounded-full bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="flex items-center gap-2 sm:px-4 px-2 py-2 font-bold bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <FaCrown className="text-yellow-400 group-hover:animate-pulse group-hover:text-yellow-300 w-5" />
              Upgrade
            </div>
          </button>
        </div>

        {/* infomation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 flex flex-row items-center gap-4">
            <img src="/images/email.png" alt="email logo" className="w-8 h-8" />
            <div className="flex-1 text-xl">
              {user?.email}
            </div>
          </div>

          <div className="p-4 flex flex-row items-center gap-4">
            <img src="/images/phone.png" alt="email logo" className="w-8 h-8" />
            <div className={`flex-1 text-xl ${user?.phone ? "" : "text-gray-500 italic"}`}>
              {user?.phone ? user.phone : "Thêm số điện thoại"}
            </div>
          </div>

          <div className="p-4 flex flex-row items-center gap-4">
            <img src="/images/medal.png" alt="email logo" className="w-8 h-8" />
            <div className="flex-1 text-xl">New member</div>
          </div>
        </div>

        {/* Edit and Exit section */}
        <div className="flex flex-row justify-center gap-10 mt-4">
          <button
            type="button"
            className="text-base cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => setIsModalOpen(true)}
          >
            ✏️ Chỉnh sửa
          </button>

          <button type="button" className="text-green-700 font-bold hover:text-white rounded-full border-3 cursor-pointer border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
            🚪Đăng xuất
          </button>
        </div>
      </div>

      {/* About me */}
      <div className="w-full sm:w-4/5 min-h-1/2 flex flex-col bg-white p-5 rounded-2xl">
        <h2 className="text-3xl font-bold text-blue-700 flex flex-row items-center gap-3 mb-4">
          <div>About Me</div>
          <img src="/images/info.png" alt="info about me" className="w-12 h-12" />
        </h2>

        <ul>
          {aboutUser.map((fact, index) => (
            <li key={index} className="font-normal text-xl" >- {fact}</li>
          ))}
        </ul>
      </div>

      {/* My library */}
      <div className="w-full sm:w-4/5 min-h-1/2 flex flex-col bg-white p-5 rounded-2xl">
        <h2 className="text-3xl font-bold text-purple-700 flex flex-row items-center gap-3 mb-4 justify-between">
          <div className="flex flex-row items-center gap-2">
            <div>Favorite Books</div>
            <img src="/images/fav_book.png" alt="info about me" className="w-12 h-12" />
          </div>

          <button type="button" className="cursor-pointer text-white bg-purple-700 hover:bg-purple-800 focus:ring-4  font-bold rounded-full text-sm p-2.5 text-center inline-flex items-center">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
            <span className="sr-only">xem them</span>
          </button>
        </h2>

        <h3 className="text-xl font-normal mb-3">Which boook am I interested in:</h3>

        {/* Favorite Book list */}

        <div className="flex flex-row flex-wrap gap-3">
          {books.map((book, index) => (
            <a key={index} href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={book.picture} alt="error book" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h4 className="mb-2 text-3xl font-bold tracking-tight text-(--secondary-color) dark:text-white">{book.name}</h4>
                <p className="mb-3 font-normal text-green-700 ">{book.author}</p>
                <p className="mb-3 font-normal text-black ">{book.description}</p>

                <div className="flex flex-row justify-center gap-10 mt-4">
                  <button type="button" className="flex flex-row items-center gap-2 text-base cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <div>Xem tiếp</div>
                    <FaArrowRight />
                  </button>

                  <button type="button" className="flex flex-row items-center gap-2 text-red-700 font-bold hover:text-white rounded-full border-3 cursor-pointer border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                    <div>Xóa</div>
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </a>
          ))}
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
  )
}

export default Profile;