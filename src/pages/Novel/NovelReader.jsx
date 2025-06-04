import React, { useEffect, useState, useRef } from 'react'
import { FaComment } from "react-icons/fa";
import { useLocation, useParams, useNavigate } from 'react-router';
import './NovelReader.css'; // Import the CSS file
import { api, apiAuth } from '../../services/api';
import Spinner from '../../components/Spinner';
import defaultAvt from '../../assets/default_avatar.jpg'
import { toast } from 'react-toastify';
// icons
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
// drawer
import DragCloseDrawer from '../../components/DragCloseDrawer';
//
import Rating from '@mui/material/Rating';
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import MaterialUIButton from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//user Redux to update user
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../redux/userSlice.js'
//cookies
import { useCookies } from 'react-cookie';
// color picker
import { HexColorPicker } from "react-colorful";
import scrollToTop from '../../utils/ScrollToTop'

// Hook for detecting when scrolled to specific position using Intersection Observer
const useScrollPosition = (onReach = null) => {
  const [hasReached, setHasReached] = useState(false);
  const sentinelRef = useRef(null);
  const hasCalledCallback = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setHasReached(isIntersecting);

        // Call the callback function only once when first reached
        if (isIntersecting && onReach && !hasCalledCallback.current) {
          onReach();
          hasCalledCallback.current = true;
        }
      },
      {
        rootMargin: '0px',
        threshold: 0
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
    };
  }, [onReach]);

  return { hasReached, sentinelRef };
};

const NovelReader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [cookie, setCookie, removeCookie] = useCookies(["theme", "textColor"]);

  const { _id, chapterid } = useParams()
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
  const [commentReadmoreIndex, setCommentReadmoreIndex] = useState(new Array(chaptercomments.length).fill(false))
  const handleReadMore = (index) => {
    const updatedReadmoreIndex = [...commentReadmoreIndex]
    updatedReadmoreIndex[index] = !updatedReadmoreIndex[index]
    setCommentReadmoreIndex(updatedReadmoreIndex)
  }
  // Rating
  const [yourRate, setYourRate] = useState(5);
  //
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
      content: comment,
      rating: yourRate, // temp
      chapternumber: chapternumber,
      chaptertitle: chaptertitle,
      chapterid: chapterid,
      username: user.username,
      bookid: _id
    }).then(res => {
      if (res.data.success) {
        alert('Comment successfully')
        setComment('')
        //update user in redux
        dispatch(updateUser(res.data.user));
        fetchCommentByChapterId()
      }
    })
  }

  const [openChapterDrawer, setOpenChapterDrawer] = useState(false)

  const [loading, setLoading] = useState(true)

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
  //
  // handle increase view
  const handleIncreaseView = () => {
    console.log(_id);
    api.patch(`/api/novel/increaseview/${_id}`)
      .then(res => {
        if (res.data.success === true) {
          console.log("view increased")
        } else {
          console.log("error in increase view")
        }
      })
      .catch(err => console.log(err))
  };
  const { hasReached: reachedSection2, sentinelRef: sentinel2 } = useScrollPosition(handleIncreaseView);
  // handle select theme
  const [openSelectTheme, setOpenSelectTheme] = useState(false);

  const handleClickOpenSelectTheme = () => {
    if (user._id === 'unknown') alert('Login to use this feature !')
    else
      setOpenSelectTheme(true);
  };

  const handleCloseSelectTheme = (event, reason) => {
    if (reason !== 'backdropClick') {
      setCookie("theme", colorPicked)
      setCookie("textColor", textColorPicked)
      setOpenSelectTheme(false);
    }
  };
  const handleCancelSelectTheme = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpenSelectTheme(false);
    }
  };
  const handleResetTheme = () => {
    removeCookie("textColor")
    removeCookie("theme")
    window.location.reload()
  }
  //
  const [colorPicked, setColorPicked] = useState(cookie?.theme || '#ffffff')
  const [textColorPicked, setTextColorPicked] = useState(cookie?.textColor || '#000000')
  //

  const handleBackToDetails = () => {
    navigate(`/novel/${_id}`)
  }
  // get chapter content from api
  useEffect(() => {
    scrollToTop()
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
      <div className='flex flex-col justify-center items-center md:pl-[200px] md:pr-[200px] bg-[#f0ffdb]' style={{ backgroundColor: colorPicked }}>
        <div className='flex flex-col'>
          <p style={{ color: textColorPicked }} onClick={() => handleBackToDetails()} className={`text-xl md:text-3xl font-semibold text-center hover:underline cursor-pointer`}>{noveltitle}</p>
        </div>
        {/* This div will contain 2 button */}
        <div className='flex flex-col justify-center headifo'>
          <p className='md:text-lg mt-2'>{chaptertitle}</p>
        </div>
        <div className='flex flex-col justify-center'>
          <button className="relative px-6 py-3 font-semibold text-white bg-blue-600 overflow-hidden group rounded-md">
            {/* Normal text */}
            <span className="relative z-10 group-hover:hidden">Read chapter</span>

            {/* Hover text */}
            <span className="relative z-10 hidden group-hover:inline">Under Construction</span>

            {/* Stripe overlay */}
            <span className="absolute inset-0 bg-[repeating-linear-gradient(45deg,black_0,black_10%,transparent_10%,transparent_20%)] bg-yellow-800 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"></span>
          </button>

          {/* <button onClick={handleReadChapter} type="button" className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Đọc chapter 🔊</button> */}
        </div>
        {/* This div will contain the novel content */}
        <div className='p-[10px] md:p-[10px]'>
          {novelContent.chapter_content.map((content, index) => (
            <div className='mt-3' key={index}>
              {typeof content === 'string' ? (
                <p className='md:text-xl text-justify' style={{ color: textColorPicked }}>{content}</p>
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
        <div ref={sentinel2}>

        </div>
        {/* Bottom nav */}
        <div className='flex justify-center fixed bottom-0 bg-white w-[100%] py-2 gap-3' style={{ backgroundColor: colorPicked, color: textColorPicked }}>
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
          {/* only VIP can choose theme */}
          {user && user.role === 'VIP reader' ? (
            <div
              className="flex items-center justify-center px-2 rounded cursor-pointer hover:bg-[#f1f1f1]"
              onClick={scrollToTop}
            >
              <Button onClick={handleClickOpenSelectTheme} className="!bg-green-500 cursor-pointer">
                Theme
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center px-2 rounded">
              <Button className="bg-gray-400 cursor-not-allowed" disabled>
                🔒 Theme
              </Button>
            </div>
          )}
          {/* Theme choosing section */}
          <Dialog disableEscapeKeyDown open={openSelectTheme} onClose={handleCloseSelectTheme}>
            <DialogTitle>Select theme</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <p className='font-bold text-2xl' style={{ color: textColorPicked }}>Text</p>
                  <HexColorPicker color={textColorPicked} onChange={setTextColorPicked} />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <p className='font-bold text-2xl' style={{ color: colorPicked }}>Background</p>
                  <HexColorPicker color={colorPicked} onChange={setColorPicked} />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleResetTheme} className='!bg-gray-500'>Reset</Button>
              <Button onClick={handleCancelSelectTheme} className='!bg-red-500'>Cancel</Button>
              <Button onClick={handleCloseSelectTheme} className='!bg-green-500'>Ok</Button>
            </DialogActions>
          </Dialog>
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
              <Rating
                name="half-rating"
                precision={0.5}
                value={yourRate}
                onChange={(event, newValue) => {
                  setYourRate(newValue);
                }}
              />
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
              {chaptercomments.length > 0 ? chaptercomments.map((comment, index) => (
                <div className='mt-3' key={index}>
                  <div className='w-[100%] border p-2 rounded-md mt-2'>
                    <div className='flex'>
                      <img src={comment.userid?.avatar?.url || defaultAvt} alt="avatar" className='w-10 h-10 rounded-full' />
                      <p className='ml-1 font-semibold text-black'>{comment.userid.username}</p>
                    </div>
                    <p className='text-gray-500'>{comment.createdAt.slice(0, 10)}</p>
                    <Rating
                      name="read-only"
                      precision={0.5}
                      value={comment.rating}
                      readOnly
                    />
                    <p className='text-black w-[100%]'
                      style={commentReadmoreIndex[index] ? {} : {
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        display: '-webkit-box',
                      }}
                    >
                      {comment.content}
                    </p>
                    <p><span className='underline hover:text-blue-500 cursor-pointer' onClick={() => handleReadMore(index)}>{commentReadmoreIndex[index] ? 'read less' : 'read more'}</span></p>
                  </div>
                </div>

              ))
                :
                <div className='mt-3'>
                  <div className='w-[100%] border p-2 rounded-md mt-2'>
                    <div className='flex'>
                      <p className='ml-1 font-semibold text-black'></p>
                    </div>
                    <p className='text-gray-500'></p>
                    <p className='text-black w-[100%]'>No comment in this chapter &#128534;. Will you be the first one ?</p>
                  </div>
                </div>
              }
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