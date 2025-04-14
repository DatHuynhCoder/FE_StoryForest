import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router'
import ReactPaginate from 'react-paginate'
import { RxRocket } from "react-icons/rx";
import { MdSmartDisplay } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { PiShootingStarFill } from "react-icons/pi";
import { FiRefreshCw } from "react-icons/fi";

function MangaList() {
  const navigate = useNavigate();
  const [listManga, setListManga] = useState([{
    artist: ['REDICE Studio (레드아이스 스튜디오)', 'Jang Sung-Rak (장성락)'],
    author: ['h-goon (현군)', 'Chugong (추공)', 'Gi So-Ryeong (기소령)'],
    bookImg: { url: 'https://res.cloudinary.com/dvtcbryg5/image/upload/…4423218/StoryForest/Book/mzbhrc52tmszzqnsdusq.jpg', public_id: 'StoryForest/Book/mzbhrc52tmszzqnsdusq' },
    cover_url: "https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg",
    followers: 0,
    mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
    rate: 5,
    status: "completed",
    synopsis: "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as “Hunters”. However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to risk his life in the lowliest of dungeons, the “World’s Weakest”. Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\n\n---\n**Links:**\n\n- Official English Translation [<Pocket Comics>](https://www.pocketcomics.com/comic/320) | [<WebNovel>](https://www.webnovel.com/comic/only-i-level-up-(solo-leveling)_15227640605485101) | [<Tapas>](https://tapas.io/series/solo-leveling-comic/info)\n- Alternate Official Raw - [Kakao Webtoon](https://webtoon.kakao.com/content/나-혼자만-레벨업/2320)",
    tags: ['Award Winning', 'Monsters', 'Action', 'Long Strip', 'Adventure', 'Magic', 'Drama', 'Fantasy', 'Web Comic', 'Supernatural', 'Adaptation', 'Full Color'],
    title: "Solo Leveling",
    type: "manga",
    updatedAt: "2025-04-12T02:00:00.436Z",
    views: 238,
    _id: "67f298a0c0aa3501386b7afb"
  }]);
  const [savedListManga, setSavedListManga] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const itemsPerPage = 5
  const [loading, setLoading] = useState(true)

  const handleClickOnManga = (_id, mangaid) => {
    navigate(`/bookDetail/${_id}/${mangaid}`)
  }

  useEffect(() => {
    api.get('/api/manga/')
      .then((res) => {
        setListManga(res.data.data);
        setSavedListManga(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(listManga.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(listManga.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, listManga])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listManga.length
    setItemOffset(newOffset)
    setCurrentPage(event.selected); // Add this if you need state

    // Set URL query param
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', event.selected);
    navigate(`?${searchParams.toString()}`, { replace: true });
  }

  const handleClickBestRated = () => {
    const sortedMangas = [...savedListManga].sort((a, b) => b.rate - a.rate)
    setListManga(sortedMangas)
  }

  const handleClickOngoing = () => {
    let temp = [...savedListManga]
    const ongoingMangas = temp.filter(manga => manga.status === 'ongoing')
    setListManga(ongoingMangas)
  }

  const handleClickComplete = () => {
    let temp = [...savedListManga]
    const completeMangas = temp.filter(manga => manga.status === 'completed')
    setListManga(completeMangas)
  }

  const handleClickRefresh = () => {
    setListManga(savedListManga)
  }

  if (loading) return <Spinner />

  return (
    <>
      <div className='bg-[url("https://static.vecteezy.com/system/resources/previews/042/623/256/non_2x/high-trees-in-forest-illustration-jungle-landscape-vector.jpg")] bg-no-repeat bg-cover fixed left-0 w-full'>
        <div className='flex flex-col md:flex-row md:ml-50 md:mr-50 border bg-white h-screen pb-30'>
          <div className='flex-3 pb-18 border overflow-y-auto h-full'>
            {listManga.length !== 0 ? currentItems.map(manga => (
              <div className='flex md:flex-row flex-col p-5 border-b' key={manga._id}>
                <div className='flex-1'>
                  <img src={manga.bookImg.url} alt="" className='w-30 m-auto' loading='lazy' />
                </div>
                <div className='flex-4'>
                  <p onClick={() => handleClickOnManga(manga._id, manga.mangaid)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{manga.title}</p>
                  <div className='flex'>
                    <div className='flex flex-col flex-2'>
                      {manga.tags.slice(1, 5).map((tag, index) => (
                        <div className='m-1 bg-white' key={index}>
                          <span className='border rounded-md text-xs md:text-[10px] font-black p-1'>
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className='flex-2'>
                      <p>{manga.followers} <b>FOLLOWERS</b></p>
                      <p>{manga.views} <b>VIEWS</b></p>
                      <p><b>RATE:</b> {manga.rate}</p>
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
            <div className='my-4 flex justify-center fixed bottom-0 bg-white py-2'>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Prev"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
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
            <div className='cursor-pointer border m-1 p-2' onClick={() => handleClickBestRated()}>
              <p className=' flex font-bold'><span><RxRocket /></span>&nbsp;BEST RATED</p>
            </div>
            <div className='cursor-pointer border m-1 p-2' onClick={() => handleClickOngoing()}>
              <p className=' flex font-bold'><span><MdSmartDisplay /></span>&nbsp;ONGOING MANGA</p>
            </div>
            <div className='cursor-pointer border m-1 p-2' onClick={() => handleClickComplete()}>
              <p className=' flex font-bold'><span><FaFlagCheckered /></span>&nbsp; COMPLETE</p>
            </div>
            <div className='cursor-pointer border m-1 p-2'>
              <p className=' flex font-bold'><span><PiShootingStarFill /></span>&nbsp;RISING STARS</p>
            </div>
            <div className='cursor-pointer border m-1 p-2' onClick={() => handleClickRefresh()}>
              <p className=' flex font-bold'><span><FiRefreshCw /></span>&nbsp;REFRESH</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MangaList
