import React, { useEffect, useState } from 'react'
import { api, apiAuth } from '../../services/api'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router'
import ReactPaginate from 'react-paginate'
// icons
import { RxRocket } from "react-icons/rx";
import { MdSmartDisplay } from "react-icons/md";
import { FaFlagCheckered, FaCrown } from "react-icons/fa";
import { PiShootingStarFill } from "react-icons/pi";
import { FiRefreshCw } from "react-icons/fi";
import { GiBleedingEye } from "react-icons/gi";
import { RiUserFollowLine } from "react-icons/ri";
// gifs
import processingGif from '../../assets/processing.gif'
import Tags from '../../components/Tags/Tags'
import { useSelector } from 'react-redux'
import scrollToTop from '../../utils/ScrollToTop'

function MangaList() {
  scrollToTop()
  const navigate = useNavigate();
  const [listManga, setListManga] = useState([{
    artist: ['REDICE Studio (레드아이스 스튜디오)', 'Jang Sung-Rak (장성락)'],
    author: ['h-goon (현군)', 'Chugong (추공)', 'Gi So-Ryeong (기소령)'],
    bookImg: {
      url: processingGif,
      public_id: 'StoryForest/Book/mzbhrc52tmszzqnsdusq'
    },
    cover_url: processingGif,
    followers: 0,
    mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
    rate: 5,
    status: "completed",
    synopsis: "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as “Hunters”. However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to risk his life in the lowliest of dungeons, the “World’s Weakest”. Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\n\n---\n**Links:**\n\n- Official English Translation [<Pocket Comics>](https://www.pocketcomics.com/comic/320) | [<WebNovel>](https://www.webnovel.com/comic/only-i-level-up-(solo-leveling)_15227640605485101) | [<Tapas>](https://tapas.io/series/solo-leveling-comic/info)\n- Alternate Official Raw - [Kakao Webtoon](https://webtoon.kakao.com/content/나-혼자만-레벨업/2320)",
    tags: ['Loading ...'],
    title: "Loading ...",
    type: "manga",
    updatedAt: "2025-04-12T02:00:00.436Z",
    views: 238,
    page: 1,
    _id: "67f298a0c0aa3501386b7afb"
  }]);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0); // Current page (0-based index)
  const [totalPages, setTotalPages] = useState(0)
  const [sortType, setSortType] = useState("normal")
  const [statusType, setStatusType] = useState("normal")
  const [toggle, setToggle] = useState(false)

  const itemsPerPage = 10

  const fetchMangas = (page) => {
    // console.log("check page: ", page)
    setLoading(true);
    api.get(`/api/manga/v2?page=${page + 1}&limit=${itemsPerPage}`) // Backend expects 1-based page index
      .then((res) => {
        const { data, pagination } = res.data;
        setListManga(data);
        setCurrentPage(pagination.currentPage - 1); // Convert to 0-based index
        setTotalPages(pagination.totalPages);
      })
      .catch((err) => {
        console.error("Failed to fetch mangas:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchMangasWithSortType = (page, type) => {
    // console.log("check page: ", page)
    setLoading(true);
    api.get(`/api/manga/v2?page=${page + 1}&limit=${itemsPerPage}&sort=${type}&order=desc`) // Backend expects 1-based page index
      .then((res) => {
        const { data, pagination } = res.data;
        setListManga(data);
        setCurrentPage(pagination.currentPage - 1); // Convert to 0-based index
        setTotalPages(pagination.totalPages);
      })
      .catch((err) => {
        console.error("Failed to fetch mangas:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchMangasByStatus = (page, status) => {
    // console.log("check page: ", page)
    setLoading(true);
    api.get(`/api/manga/status?page=${page + 1}&limit=${itemsPerPage}&status=${status}`) // Backend expects 1-based page index
      .then(res => {
        const { data, pagination } = res.data;
        setListManga(data)
        setCurrentPage(pagination.currentPage - 1)
        setTotalPages(pagination.totalPages)
      })
      .catch(err => {
        console.error("Failed to fetch mangas:", err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleClickOnManga = (_id) => {
    navigate(`/manga/${_id}`)
  }

  useEffect(() => {
    fetchMangas(0)
  }, [])

  const handlePageClick = (event) => {
    const newPage = event.selected
    if (sortType === "normal") {
      if (statusType === "normal")
        fetchMangas(newPage)
      else
        fetchMangasByStatus(newPage, statusType)
    }
    else fetchMangasWithSortType(newPage, sortType)

    scrollToTop()
  }

  const handleClickBestRated = () => {
    setSortType("rate")
    setStatusType("normal")
    fetchMangasWithSortType(0, "rate")
  }

  const handleClickTopView = () => {
    setSortType("views")
    setStatusType("normal")
    fetchMangasWithSortType(0, "views")
  }

  const handleClickMostFollowed = () => {
    setSortType("followers")
    setStatusType("normal")
    fetchMangasWithSortType(0, "followers")
  }

  const handleClickOngoing = () => {
    setStatusType("ongoing")
    setSortType("normal")
    //fetch
    fetchMangasByStatus(0, "ongoing")
  }

  const handleClickComplete = () => {
    setStatusType("completed")
    setSortType("normal")
    //fetch
    fetchMangasByStatus(0, "completed")
  }

  const handleClickRefresh = () => {
    setSortType("normal")
    setStatusType("normal")
    fetchMangas(0)
  }

  // Handle upgrade vip
  const handleUpgradeVip = () => {
    apiAuth.post('/api/reader/payment/create-payment-link').then(res => {
      window.location.href = res.data.url;
    })
  }

  if (loading) return <Spinner />

  return (
    <>
      <Tags type={'manga'} setToggle={setToggle} toggle={toggle} />
      {/* <div className='bg-[url("https://static.vecteezy.com/system/resources/previews/042/623/256/non_2x/high-trees-in-forest-illustration-jungle-landscape-vector.jpg")] bg-no-repeat bg-cover fixed left-0 w-full'> */}
      <div className='overflow-y-auto bg-[url("https://static.vecteezy.com/system/resources/previews/042/623/256/non_2x/high-trees-in-forest-illustration-jungle-landscape-vector.jpg")] bg-no-repeat bg-cover left-0 w-full'>
        {/* <div className='flex flex-col md:flex-row md:ml-50 md:mr-50 border bg-white h-screen pb-30'> */}
        <div className='flex flex-col md:flex-row md:ml-50 md:mr-50 border bg-white'>
          {/* <div className='flex-3 pb-18 border overflow-y-auto h-full'> */}
          <div className='flex-3 pb-18 border h-full'>
            {listManga.length !== 0 ? listManga.map(manga => (
              <div className='flex md:flex-row flex-col p-5 border-b' key={manga._id}>
                <div className='flex-1'>
                  <img src={manga.bookImg.url} alt="" className='w-30 m-auto' loading='lazy' />
                </div>
                <div className='flex-4'>
                  <p onClick={() => handleClickOnManga(manga._id)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{manga.title}</p>
                  <div className='flex'>
                    <div className='flex flex-col flex-2'>
                      {manga.tags.slice(1, 5).map((tag, index) => (
                        <div className='m-1 bg-white' key={index}>
                          <span className='border rounded-md text-xs md:text-[10px] font-black p-1' >
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className='flex-2'>
                      <p className='text-right'><span className='font-[1000]'>{manga.followers} </span><b>FOLLOWERS</b></p>
                      <p className='text-right'><span className='font-[1000]'>{manga.views} </span><b>VIEWS</b></p>
                      <p className='text-right'><b>RATE:</b><span className='font-[1000]'> {manga.rate}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))
              :
              <div className='flex md:flex-row flex-col p-5 border-b'>
                <div className='flex-1'>
                  <div className='w-30 m-auto'></div>
                </div>
                <div className='flex-4'>
                  <p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>Nothing to show</p>
                  <div className='flex'>
                    <div className='flex flex-col flex-2'>

                    </div>
                    <div className='flex-2'>

                    </div>
                  </div>
                </div>
              </div>
            }

            {/* Pagination */}
            <div className='my-4 flex justify-center bottom-0 left-0 bg-white py-2'>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Prev"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={totalPages} // Use totalPages from BE
                forcePage={currentPage} // Highlight the current page
                containerClassName="flex md:gap-2 gap-1 cursor-pointer px-2"
                pageClassName="border rounded" // Just the li
                pageLinkClassName="block md:px-3 px-2 py-1 hover:bg-green-200" // The actual <a>
                previousClassName="border rounded"
                previousLinkClassName="block px-3 py-1 hover:bg-green-200"
                nextClassName="border rounded"
                nextLinkClassName="block px-3 py-1 hover:bg-green-200"
                activeClassName="bg-green-500 text-white"
              />

            </div>
          </div>

          {/* Optional Right Sidebar */}
          <div className='flex-1 flex-column border md:block hidden'>

            <div className={`cursor-pointer border m-1 p-2 hover:bg-[#f1f1f1] ${sortType === 'rate' ? 'bg-green-500' : ''}`} onClick={() => handleClickBestRated()}>
              <p className=' flex font-bold'><span><RxRocket /></span>&nbsp;BEST RATED</p>
            </div>
            <div className={`cursor-pointer border m-1 p-2 hover:bg-[#f1f1f1] ${sortType === 'views' ? 'bg-green-500' : ''}`} onClick={() => handleClickTopView()}>
              <p className=' flex font-bold'><span><GiBleedingEye /></span>&nbsp;TOP VIEWS</p>
            </div>
            <div className={`cursor-pointer border m-1 p-2 hover:bg-[#f1f1f1] ${sortType === 'followers' ? 'bg-green-500' : ''}`} onClick={() => handleClickMostFollowed()}>
              <p className=' flex font-bold'><span><RiUserFollowLine /></span>&nbsp;MOST FOLLOWED</p>
            </div>
            <div className={`cursor-pointer border m-1 p-2 hover:bg-[#f1f1f1] ${statusType === 'ongoing' ? 'bg-green-500' : ''}`} onClick={() => handleClickOngoing()}>
              <p className=' flex font-bold'><span><MdSmartDisplay /></span>&nbsp;ONGOING MANGA</p>
            </div>
            <div className={`cursor-pointer border m-1 p-2 hover:bg-[#f1f1f1] ${statusType === 'completed' ? 'bg-green-500' : ''}`} onClick={() => handleClickComplete()}>
              <p className=' flex font-bold'><span><FaFlagCheckered /></span>&nbsp; COMPLETE</p>
            </div>
            <div className='cursor-pointer border m-1 p-2 hover:bg-[#f1f1f1]' onClick={() => handleClickRefresh()}>
              <p className=' flex font-bold'><span><FiRefreshCw /></span>&nbsp;REFRESH</p>
            </div>

            {user && user.role != "VIP reader" && (
              <div className="bg-gray-100 rounded-xl p-3">
                <div className="font-bold text-lg">What you get as a VIP (aka the cool kids club):</div>
                <div>🕵️ Be the first to read our latest chapter drops — hot and fresh, straight to your eyeballs.</div>
                <div>🔍 Use our insanely ultimate powerful blazing-fast slashy search (You type nonsense craps, we dig up gold.)</div>
                <div>🎨 Customize your own theme or pick from a bunch of sexy presets — your vibe, your rules.</div>
                <div>📖 Let us read chapters for you while you lie down like the majestic lazy legend you are (coming soon, we pinky swear).</div>
                <div>🗣️ Voice cloning: Make your voice clone read stuff for you — it’s like audiobook, but with your own glorious voice (yup, also coming soon).</div>

                {/* VIP button */}
                <button className="p-[3px] mt-2 cursor-pointer rounded-full bg-black relative" onClick={() => handleUpgradeVip()}> {/* Added relative here */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="flex items-center gap-2 px-4 py-2 font-bold bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                    <FaCrown className="text-yellow-400 group-hover:animate-pulse group-hover:text-yellow-300 w-5" />
                    Upgrade
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MangaList
