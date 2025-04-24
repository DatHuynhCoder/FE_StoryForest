import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import loadingGif from '../../assets/loading.gif'
import { api } from '../../services/api.js'
// icons
import { FaHome } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
// drawer
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

function MangaReader() {
  const { mangaid, chapterid } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { _id, chapters, mangatitle, chapternumber, chaptertitle } = location.state || {}
  // const chapters = location.state.chapters || []
  const [pics, setPics] = useState([])
  const [loading, setLoading] = useState(true)
  const comments = [
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
  ]
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
    navigate(`/bookDetail/${_id}/${mangaid}`);
  }

  const [openChapterDrawer, setOpenChapterDrawer] = useState(false);
  const [openCommentDrawer, setOpenCommentDrawer] = useState(false);

  const DragCloseDrawer = ({ open, setOpen, children }) => {
    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
      animate(scope.current, {
        opacity: [1, 0],
      });

      const yStart = typeof y.get() === "number" ? y.get() : 0;

      await animate("#drawer", {
        y: [yStart, height],
      });

      setOpen(false);
    };

    return (
      <>
        {open && (
          <motion.div
            ref={scope}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-neutral-950/70"
          >
            <motion.div
              id="drawer"
              ref={drawerRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                ease: "easeInOut",
              }}
              className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
              style={{ y }}
              drag="y"
              dragControls={controls}
              onDragEnd={() => {
                if (y.get() >= 100) {
                  handleClose();
                }
              }}
              dragListener={false}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              dragElastic={{
                top: 0,
                bottom: 0.5,
              }}
            >
              <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
                <button
                  onPointerDown={(e) => {
                    controls.start(e);
                  }}
                  className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
                ></button>
              </div>
              <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </>
    );
  };

  useEffect(() => {
    console.log("check chapterid: ", chapterid)
    api.get(`/api/manga/${chapterid}/images`)
      .then((res) => {
        console.log("check res: ", res.data.data)
        setPics(res.data.data[0].images)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
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
        <p className='md:text-lg mt-2'>Chương {chapternumber}: {chaptertitle}</p>
        <div className='flex flex-col justify-center'>
          <button onClick={handleNextChapter} className='p-[10px] bg-green-700 text-white font-bold md:w-[500px] w-[200px] rounded mt-3 cursor-pointer'>Chương sau</button>
          <button onClick={handlePreviousChapter} className='p-[10px] font-bold md:w-[500px] w-[200px] rounded border mt-3 cursor-pointer'>Chương trước</button>
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
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer' onClick={() => setOpenCommentDrawer(true)}>
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
        <DragCloseDrawer open={openCommentDrawer} setOpen={setOpenCommentDrawer}>
          <div className='flex flex-col justify-center mt-10 md:w-[100%] w-[100%]'>
            <p className='md:text-lg mt-2 text-green-700 font-bold'>Bình luận</p>
            <textarea
              className='border p-2 mt-3 bg-gray-200 rounded-md w-[100%] h-[100px]'
              placeholder='Viết bình luận...'
            ></textarea>
            <button className='p-[10px] bg-green-700 text-white font-bold md:w-[100%] rounded mt-3'>Gửi bình luận</button>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  <div className='mt-3'>
                    <div className='flex items-center'>
                      <img src={comment.avatar} alt={comment.user} className='w-10 h-10 rounded-full' />
                      <p className='ml-1 font-semibold text-white'>{comment.user}</p>
                    </div>
                    <div className='w-[100%] border p-2 rounded-md mt-2'>
                      <p className='text-white'>{comment.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DragCloseDrawer>
        <DragCloseDrawer open={openChapterDrawer} setOpen={setOpenChapterDrawer}>
          <div>
            {chapters.map((chapter) => (
              <div key={chapter.chapterid} className='flex flex-col justify-center items-center mt-3'>
                <p className={`md:text-lg text-xs font-bold text-white cursor-pointer ${chapter.chapter == chapternumber && chapter.title == chaptertitle ? 'p-1 rounded bg-green-500' : ''}`} onClick={() => {
                  setOpenChapterDrawer(false)
                  scrollToTop()
                  let chapternumber = chapter.chapter
                  let chaptertitle = chapter.title
                  navigate(`/mangaReader/${mangaid}/${chapter.chapterid}`, { state: { _id, chapters, mangatitle, chapternumber, chaptertitle } })
                }}>
                  Chương {chapter.chapter}: {chapter.title}
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