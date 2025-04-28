import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router'
import axios from 'axios'
import loadingGif from '../../assets/loading.gif'
import defaultAvt from '../../assets/default_avatar.jpg'
import { api, apiAuth } from '../../services/api.js'
import { useSelector } from 'react-redux'
// icons
import { FaHome } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
// drawer
import DragCloseDrawer from '../../components/DragCloseDrawer.jsx'
//
import { Rating, RatingStar } from "flowbite-react";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";


function MangaReader() {
  const { mangaid, chapterid } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { _id, chapters, mangatitle, chapternumber, chaptertitle } = location.state || {}
  // const chapters = location.state.chapters || []
  const user = useSelector((state) => state.user.user) || {
    createdAt: "unknown",
    email: "unknown",
    password: "unknown",
    role: "unknown",
    updatedAt: "unknown",
    username: "unknown",
    __v: 0,
    _id: "unknown"
  }
  // createdAt: "2025-04-25T03:35:51.024Z"
  // email: "a@a.com"
  // password: "$2b$10$265OXC4kEdoolKRBBMH2Z.LhTUOZWnLQb6GMoqRkI9rnlhEp/UF7K"
  // role: "reader"
  // updatedAt: "2025-04-25T03:35:51.024Z"
  // username: "a"
  // __v : 0,
  // _id : "680b0317446eb05ee1287838"
  const token = useSelector((state) => state.user.token) || ''

  const [pics, setPics] = useState([])
  const [loading, setLoading] = useState(true)
  const [chaptercomments, setChaptercomments] = useState([
    {
      bookid: "67f298a0c0aa3501386b7aff",
      chapterid: "b4b305b8-6dfb-4292-b254-d1b577c725d2",
      chapternumber: "2",
      chaptertitle: "Pros and a Pro",
      content: "hmm",
      createdAt: "2025-04-28T11:02:15.878Z",
      rating: 5,
      updatedAt: "2025-04-28T11:02:15.878Z",
      userid: {
        avatar: {
          public_id: "StoryForest/Account/bz3d7yjgnvoc0gdlzxpr",
          url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1745854495/StoryForest/Account/bz3d7yjgnvoc0gdlzxpr.jpg"
        },
        username: "otaku-kun",
        _id: "680b0317446eb05ee1287838",
      },
      username: "a",
      __v: 0,
      _id: "680f6037e4b5d019dc77a47b"
    },
  ])
  console.log("check chaptercomments: ", chaptercomments)
  const [comment, setComment] = useState('')

  const fetchCommentByChapterId = async () => {
    try {
      const response = await api.get(`/api/reader/review/chapter/${chapterid}`)
      // console.log("check comments: ", response.data.data)
      setChaptercomments(response.data.data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleSendComment = () => {
    if (comment === '') {
      alert('Please enter a comment')
      return
    }
    if (!user || token === '') {
      alert('Please login to comment')
      return
    }
    apiAuth.post(`/api/reader/review/create`, {
      content: comment.slice(0, 40),
      rating: 5, // temp
      chapternumber: chapternumber,
      chaptertitle: chaptertitle,
      chapterid: chapterid,
      username: user.username,
      bookid: _id
    }).then(res => {
      if (res.data.success) {
        alert('Comment successfully')
        setComment('')
        fetchCommentByChapterId()
      }
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleNextChapter = () => {
    console.log("check chapters: ", chapters)
    console.log("check chapterId: ", chapterid)
    const currentIndex = chapters.findIndex((chapter) => chapter.chapterid === chapterid)
    console.log("check currentIndex: ", currentIndex)
    if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
      const nextChapter = chapters[currentIndex + 1]
      console.log("check nextChapter: ", nextChapter)
      setLoading(true)
      let chapternumber = nextChapter.chapter
      let chaptertitle = nextChapter.title
      //navigate(`/mangaReader/${infoManga.mangaid}/${mangaTitle}/${chapterNumber}/${chapterTitle}/${chapterid}`, { state: { chapters } })
      navigate(`/mangaReader/${mangaid}/${nextChapter.chapterid}`, { state: { _id, chapters, mangatitle, chapternumber, chaptertitle } })
    }
  }

  const handlePreviousChapter = () => {
    console.log("check chapters: ", chapters)
    console.log("check chapterId: ", chapterid)
    const currentIndex = chapters.findIndex((chapter) => chapter.chapterid === chapterid)
    console.log("check currentIndex: ", currentIndex)
    if (currentIndex > 0) {
      const previousChapter = chapters[currentIndex - 1]
      console.log("check previousChapter: ", previousChapter)
      setLoading(true)
      let chapternumber = previousChapter.chapter
      let chaptertitle = previousChapter.title
      navigate(`/mangaReader/${mangaid}/${previousChapter.chapterid}`, { state: { _id, chapters, mangatitle, chapternumber, chaptertitle } })
    }
  }

  const handleBackToDetails = () => {
    navigate(`/manga/${_id}`);
  }

  const [openChapterDrawer, setOpenChapterDrawer] = useState(false);
  const [openCommentDrawer, setOpenCommentDrawer] = useState(false);

  // const DragCloseDrawer = ({ open, setOpen, children }) => {
  //   const [scope, animate] = useAnimate();
  //   const [drawerRef, { height }] = useMeasure();

  //   const y = useMotionValue(0);
  //   const controls = useDragControls();

  //   const handleClose = async () => {
  //     animate(scope.current, {
  //       opacity: [1, 0],
  //     });

  //     const yStart = typeof y.get() === "number" ? y.get() : 0;

  //     await animate("#drawer", {
  //       y: [yStart, height],
  //     });

  //     setOpen(false);
  //   };

  //   return (
  //     <>
  //       {open && (
  //         <motion.div
  //           ref={scope}
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           onClick={handleClose}
  //           className="fixed inset-0 z-50 bg-neutral-950/70"
  //         >
  //           <motion.div
  //             id="drawer"
  //             ref={drawerRef}
  //             onClick={(e) => e.stopPropagation()}
  //             initial={{ y: "100%" }}
  //             animate={{ y: "0%" }}
  //             transition={{
  //               ease: "easeInOut",
  //             }}
  //             className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
  //             style={{ y }}
  //             drag="y"
  //             dragControls={controls}
  //             onDragEnd={() => {
  //               if (y.get() >= 100) {
  //                 handleClose();
  //               }
  //             }}
  //             dragListener={false}
  //             dragConstraints={{
  //               top: 0,
  //               bottom: 0,
  //             }}
  //             dragElastic={{
  //               top: 0,
  //               bottom: 0.5,
  //             }}
  //           >
  //             <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
  //               <button
  //                 onPointerDown={(e) => {
  //                   controls.start(e);
  //                 }}
  //                 className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
  //               ></button>
  //             </div>
  //             <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
  //               {children}
  //             </div>
  //           </motion.div>
  //         </motion.div>
  //       )}
  //     </>
  //   );
  // };

  useEffect(() => {
    // console.log("check chapterid: ", chapterid)
    fetchCommentByChapterId()
    api.get(`/api/manga/${chapterid}/images`)
      .then((res) => {
        // console.log("check res: ", res.data.data)
        setPics(res.data.data[0].images)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    scrollToTop()
    // api.get(`/mangadex/chapter/${chapterid}/images`)
    //     .then((res) => {
    //         setPics(res.data.images)
    //     }).catch((err) => {
    //         console.log(err)
    //     }).finally(() => {
    //         setLoading(false)
    //     })
  }, [chapterid])

  return (
    <>

      <div className='flex flex-col justify-center items-center md:ml-[200px] md:mr-[200px] mb-20'>
        <div className='flex flex-col'>
          <p className='text-3xl md:text-5xl font-bold text-black text-center cursor-pointer' onClick={handleBackToDetails}>{mangatitle == undefined ? "" : mangatitle}</p>
        </div>
        {/* This div will contain 2 button */}
        <p className='md:text-lg mt-2'>Chapter {chapternumber}: {chaptertitle}</p>
        <div className='flex flex-col justify-center'>
          <button onClick={handleNextChapter} className='p-[10px] bg-green-600 text-white font-bold md:w-[500px] w-[200px] rounded mt-3 cursor-pointer'>Next chapter</button>
          <button onClick={handlePreviousChapter} className='p-[10px] font-bold md:w-[500px] w-[200px] rounded border mt-3 cursor-pointer'>Previous chapter</button>
        </div>
        {/* This div will contain the manga images */}
        <div>
          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <img src={loadingGif} alt="Loading..." className='w-16 h-16' />
            </div>
          ) : (
            pics.map((pic, index) => (
              <div className='mt-3' key={index}>
                <img src={pic}
                  alt='manga'
                  loading='lazy'
                  className='max-w-xs md:max-w-lg max-h-xs object-cover'
                />
              </div>
            ))
          )}
        </div>
        {/* Bottom nav */}
        <div className='flex justify-center fixed bottom-0 bg-white w-[100%] py-2 gap-3'>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer' onClick={() => {
            fetchCommentByChapterId()
            setOpenCommentDrawer(true)
          }}>
            <FaCommentAlt />
          </div>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer' onClick={() => handlePreviousChapter()}>
            <MdNavigateBefore />
          </div>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer' onClick={() => setOpenChapterDrawer(true)}>
            <p className='mx-2'>Chap {chapternumber}</p>
          </div>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer' onClick={() => handleNextChapter()}>
            <MdNavigateNext />
          </div>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer'
            onClick={scrollToTop}>
            <FaArrowUp />
          </div>
        </div>
        {/* This div is for comment */}
        <Drawer open={openCommentDrawer} onClose={() => setOpenCommentDrawer(false)}>
          <DrawerHeader title="Comment" titleIcon={() => { }} closeIcon={() => { <p>Hello</p> }} />
          <DrawerItems>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <p className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray cursor-pointer"
                onClick={() => setOpenCommentDrawer(false)}>
                Close
              </p>
              {user._id !== "unknown" ?
                <p className="inline-flex items-center rounded-lg bg-green-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 cursor-pointer"
                  onClick={() => { handleSendComment() }}
                >
                  Send&nbsp;
                  <svg
                    className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </p> : <p></p>}
            </div>
            <div>
              {user._id !== "unknown" ?
                <textarea
                  className='border p-2 mt-3 bg-gray-200 rounded-md w-[100%] h-[100px]'
                  placeholder='Write something ... (max 40 characters)'
                  onChange={(e) => setComment(e.target.value)}
                ></textarea> : <p className='w-[100%]'>Please <Link to="/login" className='text-green-500'>login </Link>to comment</p>}
              {/* <div>
                <Rating>
                  <RatingStar />
                  <RatingStar />
                  <RatingStar />
                  <RatingStar />
                  <RatingStar filled={false} />
                </Rating>
              </div> */}
            </div>
            <div>
              {chaptercomments.map((comment, index) => (
                <div className='mt-3' key={comment._id}>
                  <div className='w-[100%] border p-2 rounded-md mt-2'>
                    <div className='flex'>
                      <img src={comment.userid?.avatar?.url || defaultAvt} alt="avatar" className='w-10 h-10 rounded-full' />
                      <p className='ml-1 font-semibold text-black'>{comment.userid.username}</p>
                    </div>
                    <p className='text-gray-500'>{comment.createdAt.slice(0, 10)}</p>
                    <p className='text-black w-[100%]'>{comment.content}</p>
                  </div>
                </div>

              ))}
            </div>
          </DrawerItems>
        </Drawer>
        <DragCloseDrawer open={openChapterDrawer} setOpen={setOpenChapterDrawer}>
          <div>
            {chapters.sort((a, b) => parseInt(a.chapter) - parseInt(b.chapter)).filter(chapter => chapter.title !== null).map((chapter) => (
              <div key={chapter.chapterid} className='flex flex-col justify-center items-center mt-3'>
                <p className={`md:text-lg text-xs font-bold text-white cursor-pointer ${chapter.chapter == chapternumber && chapter.title == chaptertitle ? 'p-1 rounded bg-green-500' : ''}`} onClick={() => {
                  setOpenChapterDrawer(false)
                  scrollToTop()
                  let chapternumber = chapter.chapter
                  let chaptertitle = chapter.title
                  setLoading(true)
                  navigate(`/mangaReader/${mangaid}/${chapter.chapterid}`, { state: { _id, chapters, mangatitle, chapternumber, chaptertitle } })
                }}>
                  Chapter {chapter.chapter}: {chapter.title}
                </p>
              </div>
            ))}
          </div>
        </DragCloseDrawer>
      </div>
    </>
  )
}

export default MangaReader