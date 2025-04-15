import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const FavoriteBooks = ({ books, handleContinueReading, handleDeleteFavoritebook }) => {
  return (
    <div className="w-full min-h-1/2 flex flex-col bg-white p-4 sm:p-5 rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 flex flex-row items-center gap-2 sm:gap-3 mb-4 justify-between">
        <div className="flex flex-row items-center gap-2">
          <div>Favorite Books</div>
          <img src="/images/fav_book.png" alt="favorite books" className="w-8 h-8 sm:w-12 sm:h-12" />
        </div>

        <button type="button" className="cursor-pointer text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 font-bold rounded-full text-sm p-2 sm:p-2.5 text-center inline-flex items-center">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
          <span className="sr-only">xem them</span>
        </button>
      </h2>

      <h3 className="text-lg sm:text-xl font-normal mb-3">Which boook am I interested in:</h3>

      {/* Favorite Book list - Responsive design with 2 columns for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book, index) => (
          <div key={index} className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden sm:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="w-full h-48 object-cover sm:w-36 sm:h-full" src={book.bookImg.url} alt={book.title} />
            <div className="flex flex-col justify-between p-3 sm:p-4 leading-normal">
              <h4 className="mb-1 sm:mb-2 text-xl sm:text-2xl font-bold tracking-tight dark:text-white line-clamp-2">{book.title}</h4>
              <p className="mb-1 sm:mb-3 font-normal text-green-700 text-sm sm:text-base line-clamp-2">
                {Array.isArray(book.author) ? book.author.join(', ') : book.author}
              </p>
              <p className="mb-2 sm:mb-3 font-normal text-black text-sm sm:text-base line-clamp-3">{book.synopsis}</p>

              <div className="flex flex-row justify-center gap-3 sm:gap-10 mt-2 sm:mt-4">
                <button type="button"
                  className="flex flex-row items-center gap-1 sm:gap-2 text-xs sm:text-base cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  <div onClick={() => handleContinueReading(book)}>Xem tiếp</div>
                  <FaArrowRight />
                </button>

                <button type="button" className="flex flex-row items-center gap-1 sm:gap-2 text-red-700 font-bold hover:text-white rounded-full border-2 cursor-pointer border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                  <div onClick={() => handleDeleteFavoritebook(book._id)}>Xóa</div>
                  <MdDelete className="h-3 sm:h-5 w-3 sm:w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default FavoriteBooks