import React, { useEffect, useState, useRef } from 'react'
import { FaComment } from "react-icons/fa";
import { useLocation, useParams, useNavigate } from 'react-router';
import './NovelReader.css'; // Import the CSS file
import { api, apiAuth } from '../../services/api';
import Spinner from '../../components/Spinner';
import defaultAvt from '../../assets/default_avatar.jpg'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// icons
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
// drawer
import DragCloseDrawer from '../../components/DragCloseDrawer';
//
import { Rating, RatingStar } from "flowbite-react";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";

function NovelReader() {
  const { _id, chapterid } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { chapters, noveltitle, chapternumber, chaptertitle } = location.state || {}

  const user = useSelector(state => state.user.user)
  // createdAt: "2025-04-25T03:35:51.024Z"
  // email: "a@a.com"
  // password: "$2b$10$265OXC4kEdoolKRBBMH2Z.LhTUOZWnLQb6GMoqRkI9rnlhEp/UF7K"
  // role: "reader"
  // updatedAt: "2025-04-25T03:35:51.024Z"
  // username: "a"
  // __v : 0,
  // _id : "680b0317446eb05ee1287838"
  const token = useSelector(state => state.user.token)
  const [novelContent, setNovelContent] = useState({
    novelid: "67eabac46f25807d87d7acc1",
    chapter_title: "Awakening",
    chapter_link: "https://www.royalroad.com/fiction/107529/wh-40k-transcendence/chapter/2098252/awakening",
    chapter_content: [
      "", "---", "", "The first thing I notice is the second. A low, mechanical hum, constant..."
    ],
    _id: "67eb5b9f3bb426e0d0fd8200"
  })
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
  const comments = [
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
  ]

  const [comment, setComment] = useState('')
  const [openCommentDrawer, setOpenCommentDrawer] = useState(false)
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

  const [openChapterDrawer, setOpenChapterDrawer] = useState(false)

  const [loading, setLoading] = useState(true)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleNextChapter = () => {
    const currentIndex = chapters.findIndex((chapter) => chapter._id === chapterid)
    if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
      const nextChapter = chapters[currentIndex + 1]
      setLoading(true)
      let chaptertitle = nextChapter.chapter_title
      let chapternumber = nextChapter.order
      // /novel/:_id/:chapterid
      navigate(`/novelReader/${_id}/${nextChapter._id}`, { state: { chapters, noveltitle, chapternumber, chaptertitle } })
      scrollToTop()
      setOpenCommentDrawer(false)
    }
  }

  const handlePreviousChapter = () => {
    const currentIndex = chapters.findIndex((chapter) => chapter._id === chapterid)
    if (currentIndex > 0) {
      const previousChapter = chapters[currentIndex - 1]
      setLoading(true)
      // /novel/:_id/:chapterid
      let chaptertitle = previousChapter.chapter_title
      let chapternumber = previousChapter.order
      navigate(`/novelReader/${_id}/${previousChapter._id}`, { state: { chapters, noveltitle, chapternumber, chaptertitle } })
      scrollToTop()
      setOpenCommentDrawer(false)
    }
  }

  // Store the reading state in a ref that persists between renders
  const readingStateRef = useRef({
    isReading: false,
    stopReading: null
  });

  // Handle Read entire Chapter
  const handleReadChapter = () => {
    const contentList = [...novelContent.chapter_content];
    let currentIndex = 0;
    let currentAudio = null;
    let isStopped = false;
    let isLoading = false;


    // Function to preload the next paragraph while current one is playing
    const preloadNextAudio = async (text) => {
      try {
        const response = await apiAuth.post(
          '/api/vipreader/texttospeak',
          { text },
          { responseType: 'blob' }
        );

        if (isStopped) return null;

        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        // Force preloading the audio file
        audio.load();

        return { audio, audioUrl };
      } catch (error) {
        return null;
      }
    };

    // Function to play audio and handle when it ends
    const playAudio = (audio, audioUrl) => {
      if (isStopped) {
        URL.revokeObjectURL(audioUrl);
        return;
      }

      currentAudio = audio;

      // Set up event listeners
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;

        // Move to next paragraph
        if (!isStopped) {
          playNextParagraph();
        }
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;

        // Continue with next paragraph
        if (!isStopped) {
          playNextParagraph();
        }
      };

      // Play the audio
      audio.play().catch(() => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
        playNextParagraph();
      });
    };

    // Function to create and play the audio for a paragraph
    const playParagraph = async (text, nextIndex) => {
      if (isStopped) return;

      isLoading = true;

      try {
        const response = await apiAuth.post(
          '/api/vipreader/texttospeak',
          { text },
          { responseType: 'blob' }
        );

        if (isStopped) return;

        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        isLoading = false;

        // If there's a valid next paragraph, preload it while current is playing
        if (nextIndex < contentList.length) {
          const nextParagraph = contentList[nextIndex];
          if (nextParagraph && nextParagraph.trim() !== '') {
            preloadNextAudio(nextParagraph); // Start preloading next paragraph
          }
        }

        playAudio(audio, audioUrl);

      } catch (error) {
        isLoading = false;

        // Continue with next paragraph
        if (!isStopped) {
          playNextParagraph();
        }
      }
    };

    // Function to play the next paragraph
    const playNextParagraph = () => {
      if (isStopped || currentIndex >= contentList.length) {
        if (currentIndex >= contentList.length) {
          toast.success("Đã đọc xong chương");
        }
        stopReading();
        return;
      }

      const paragraph = contentList[currentIndex];
      const nextIndex = currentIndex + 1;
      currentIndex = nextIndex;

      // Skip empty paragraphs
      if (!paragraph || paragraph.trim() === '') {
        playNextParagraph();
        return;
      }

      playParagraph(paragraph, nextIndex);
    };

    // Function to stop reading
    const stopReading = () => {
      isStopped = true;
      readingStateRef.current.isReading = false;

      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
    };

    // Check if already reading and stop previous session
    if (readingStateRef.current.isReading && readingStateRef.current.stopReading) {
      readingStateRef.current.stopReading();
    }

    // Start reading the chapter
    toast.info("Bắt đầu đọc chương");
    readingStateRef.current.isReading = true;
    readingStateRef.current.stopReading = stopReading;

    // Start reading from the first paragraph
    playNextParagraph();

    // Return the stop function
    return { stopReading };
  };

  // Add this effect in your component to stop reading when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup function - stop any ongoing reading when component unmounts
      if (readingStateRef.current.isReading && readingStateRef.current.stopReading) {
        readingStateRef.current.stopReading();
      }
    };
  }, []);

  const handleBackToDetails = () => {
    navigate(`/novel/${_id}`)
  }
  // get chapter content from api
  useEffect(() => {
    fetchCommentByChapterId()
    api.get(`/api/novel/${_id}/${chapterid}`).then(res => {
      setNovelContent(res.data.data[0])
    }).catch(err => console.log(err)).finally(() => setLoading(false))
  }, [chapterid])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center md:pl-[200px] md:pr-[200px] bg-[#f0dcbd]'>
        <div className='flex flex-col'>
          <p onClick={() => handleBackToDetails()} className='text-xl md:text-3xl font-semibold text-black text-center hover:underline cursor-pointer'>{noveltitle}</p>
        </div>
        {/* This div will contain 2 button */}
        <div className='flex flex-col justify-center headifo'>
          <p className='md:text-lg mt-2'>{chaptertitle}</p>
        </div>
        <div className='flex flex-col justify-center sticky-top'>
          <button onClick={handleReadChapter} type="button" className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Đọc chapter 🔊</button>
          {/* <button onClick={() => handleNextChapter()} className='p-[10px] bg-green-700 text-white font-bold md:w-[500px] w-[200px] rounded mt-3 cursor-pointer'>Next chapter</button>
          <button onClick={() => handlePreviousChapter()} className='p-[10px] font-bold md:w-[500px] w-[200px] rounded border mt-3 cursor-pointer'>Previous chapter</button> */}
        </div>
        {/* This div will contain the manga images */}
        <div className='p-[10px] md:p-[10px]'>
          {novelContent.chapter_content.map((content, index) => (
            <div className='mt-3' key={index}>
              {typeof content === 'string' ? (
                <p className='md:text-xl text-justify'>{content}</p>
              ) : (
                <div className='flex justify-center'>
                  <img src={content.url}
                    alt='manga'
                    loading='lazy'
                    className='max-w-xs max-h-xs object-cover'
                  />
                </div>
              )}
            </div>
          ))}
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
              </p>
            </div>
            <div>
              <textarea
                className='border p-2 mt-3 bg-gray-200 rounded-md w-[100%] h-[100px]'
                placeholder='Write something ... (max 40 characters)'
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
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
                <div className='mt-3' key={index}>
                  <div className='w-[100%] border p-2 rounded-md mt-2'>
                    <div className='flex'>
                      <img src={comment.userid?.avatar?.url || defaultAvt} alt="avatar" className='w-10 h-10 rounded-full' />
                      <p className='ml-1 font-semibold text-black'>{comment.userid.username}</p>
                    </div>
                    <p className='text-black w-[100%]'>{comment.content}</p>
                  </div>
                </div>

              ))}
            </div>
          </DrawerItems>
        </Drawer>
        {/* This div is for chapter drawer */}
        <DragCloseDrawer open={openChapterDrawer} setOpen={setOpenChapterDrawer}>
          <div>
            {chapters.map((chapter) => (
              <div key={chapter._id} className='flex flex-col justify-center items-center mt-3'>
                <p className={`md:text-lg text-xs font-bold text-white cursor-pointer ${chapter.order == chapternumber && chapter.chapter_title == chaptertitle ? 'p-1 rounded bg-green-500' : ''}`} onClick={() => {
                  setOpenChapterDrawer(false)
                  scrollToTop()
                  let chapternumber = chapter.order
                  let chaptertitle = chapter.chapter_title
                  navigate(`/novelReader/${_id}/${chapter._id}`, { state: { chapters, noveltitle, chapternumber, chaptertitle } })
                }}>
                  Chapter {chapter.order}: {chapter.chapter_title}
                </p>
              </div>
            ))}
          </div>
        </DragCloseDrawer>
      </div>
    </>
  )
}

export default NovelReader