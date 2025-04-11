import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router'
import ReactPaginate from 'react-paginate'
import { RxRocket } from "react-icons/rx";
import { MdSmartDisplay } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { PiShootingStarFill } from "react-icons/pi";

function NovelList() {
  const navigate = useNavigate()
  const [novelList, setNovelList] = useState([
    {
      _id: '67eabb616f25807d87d7ad10',
      title: 'Infinite Farmer: A Plants vs Dungeon LitRPG',
      author: 'R.C. Joshua',
      synopsis: 'Betrayed. Alone. Forced to survive the deadliest dungeon in the universe. As aFarmer.Tulland dreamed of adventure.To be someone who sees every-place, goes every-where, and does every-thing.All he wanted was to go beyond the confines of his tiny island. So, when the Church denied him a class, he turned to the only other being that could grant him his wish; The System.And the System delivered. Tulland gotaClass, but not one he ever wished for. Awakening as a Farmer, he finds himself in the one place where he can grow away from the clutches of the Church — The Infinite; a dungeon whose end even heroes of old have never seen. Armed with what dregs of power the System deigned to give him, Tulland will have to figure out how to survive, and cultivate, the universe’s deadliest dungeon.Expect:+ Progression fantasy with actual farming!+ A very stubborn MC+ Combat! Action! Plants!Schedule:+ Daily (7 chapters per week) (more while we’re starting out)+ Book 1 completely written!',
      tags: ['LitRPG', 'Portal Fantasy / Isekai', 'Dungeon', 'Post Apocalyptic', 'Strategy', 'Action', 'Adventure', 'Fantasy', 'GameLit', 'High Fantasy', 'Magic', 'Male Lead', 'Progression'],
      status: 'Original',
      views: 238,
      followers: 0,
      rate: 4,
      cover_url: 'https://www.royalroadcdn.com/public/covers-large/infinite-farmer-cultivating-the-infinite-dungeon-112376.jpg?time=1731726233',
      type: 'novel',
      artist: [],
      mangaid: ''
    }
  ])
  const [currentItems, setCurrentItems] = useState([])
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const itemsPerPage = 5
  const [loading, setLoading] = useState(true)

  const handleClickOnNovel = (novelid) => {
    navigate(`/novel/${novelid}`)
  }

  useEffect(() => {
    api.get('/api/novel/').then((res) => {
      setNovelList(res.data.data)
    }).catch((err) => console.log(err)).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(novelList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(novelList.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, novelList])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % novelList.length
    setItemOffset(newOffset)
    setCurrentPage(event.selected); // Add this if you need state

    // Set URL query param
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', event.selected);
    navigate(`?${searchParams.toString()}`, { replace: true });
  }

  if (loading) return <Spinner />

  return (
    <>
      <div className='bg-[url("https://static.vecteezy.com/system/resources/previews/042/623/256/non_2x/high-trees-in-forest-illustration-jungle-landscape-vector.jpg")] bg-no-repeat bg-cover fixed left-0 w-full'>
        <div className='flex flex-col md:flex-row md:ml-50 md:mr-50 border bg-white h-screen pb-30'>
          <div className='flex-3 pb-18 border overflow-y-auto h-full'>
            {currentItems.map(novel => (
              <div className='flex md:flex-row flex-col p-5 border-b' key={novel._id}>
                <div className='flex-1'>
                  <img src={novel.cover_url} alt="" className='w-30 m-auto' />
                </div>
                <div className='flex-4'>
                  <p onClick={() => handleClickOnNovel(novel._id)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{novel.title}</p>
                  <div className='flex'>
                    <div className='flex flex-col flex-2'>
                      {novel.tags.slice(1, 5).map((tag, index) => (
                        <div className='m-1 bg-white' key={index}>
                          <span className='border rounded-md text-xs md:text-[10px] font-black p-1'>
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className='flex-2'>
                      <p>{novel.followers} <b>FOLLOWERS</b></p>
                      <p>{novel.views} <b>VIEWS</b></p>
                      <p><b>RATE:</b> {novel.rate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

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
            <div className='cursor-pointer border m-1 p-2'>
              <p className=' flex font-bold'><span><RxRocket /></span>&nbsp;BEST RATED</p>
            </div>
            <div className='cursor-pointer border m-1 p-2'>
              <p className=' flex font-bold'><span><MdSmartDisplay /></span>&nbsp;ONGOING FICTION</p>
            </div>
            <div className='cursor-pointer border m-1 p-2'>
              <p className=' flex font-bold'><span><FaFlagCheckered /></span>&nbsp; COMPLETE</p>
            </div>
            <div className='cursor-pointer border m-1 p-2'>
              <p className=' flex font-bold'><span><PiShootingStarFill /></span>&nbsp;RISING STARS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NovelList
