import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router'
import axios from 'axios'
import loadingGif from '../../assets/loading.gif'
import defaultAvt from '../../assets/default_avatar.jpg'
import { api, apiAuth } from '../../services/api.js'
// icons
import { FaHome } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { FaCommentAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
// drawer
import DragCloseDrawer from '../../components/DragCloseDrawer.jsx'
// select dialog
import { Rating, RatingStar } from "flowbite-react";
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

function MangaReader() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [cookie, setCookie, removeCookie] = useCookies(["theme", "intensity"])

  const { mangaid, chapterid } = useParams()
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
  // loading while calling apis
  const [loading, setLoading] = useState(true)
  // switch control
  const [checked, setChecked] = useState(false);
  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };
  // handle select theme
  const [openSelectTheme, setOpenSelectTheme] = useState(false);
  const [theme, setTheme] = useState(cookie?.theme || "white")
  const listTheme = ['white', 'black', 'red', 'green']
  const [intensity, setIntensity] = useState(cookie?.intensity || "500")
  const litsIntensity = ['100', '500']
  // theme + intensity = finalColor
  const [finalColor, setFinalColor] = useState((theme !== 'black' && theme !== 'white') ? theme + '-' + intensity : theme)
  const handleChangeTheme = (event) => {
    setTheme((event.target.value) || 'white');
  };
  const handleChangeIntensity = (event) => {
    setIntensity((event.target.value) || '500')
  }

  const handleClickOpenSelectTheme = () => {
    if (user._id === 'unknown') alert('Login to use this feature !')
    else
      setOpenSelectTheme(true);
  };

  const handleCloseSelectTheme = (event, reason) => {
    if (reason !== 'backdropClick') {
      console.log("theme: ", theme)
      console.log("intensity: ", intensity)
      setCookie("theme", theme)
      setCookie("intensity", intensity)
      setFinalColor((theme !== 'black' && theme !== 'white') ? theme + '-' + intensity : theme)
      setOpenSelectTheme(false);
    }
  };
  const handleCancelSelectTheme = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpenSelectTheme(false);
    }
  };
  const handleResetTheme = () => {
    removeCookie("theme")
    removeCookie("intensity")
    window.location.reload()
  }
  //
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
        //update user in redux
        dispatch(updateUser(res.data.user));
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
  }, [chapterid])

  return (
    <>
      <div className={`flex flex-col justify-center items-center md:pl-[200px] md:pr-[200px] mb-20 bg-${finalColor}`}>
        <div className='flex flex-col'>
          <p className={`text-3xl md:text-5xl font-bold text-center cursor-pointer ${theme === 'black' ? 'text-white' : 'text-black'}`} onClick={handleBackToDetails}>{mangatitle == undefined ? "" : mangatitle}</p>
        </div>
        {/* This div will contain 2 button */}
        <p className={`md:text-lg mt-2 ${theme === 'black' ? 'text-white' : ''}`}>Chapter {chapternumber}: {chaptertitle}</p>
        <div className='flex flex-col justify-center'>
          <button onClick={handleNextChapter} className='p-[10px] bg-green-600 text-white font-bold md:w-[500px] w-[200px] rounded mt-3 cursor-pointer hover:bg-green-500'>Next chapter</button>
          <button onClick={handlePreviousChapter} className='p-[10px] font-bold md:w-[500px] w-[200px] rounded border mt-3 cursor-pointer bg-[#fff] hover:bg-[#f1f1f1]'>Previous chapter</button>
        </div>
        {/* This div will contain the manga images */}
        <div>
          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <img src={loadingGif} alt="Loading..." className='w-16 h-16' />
            </div>
          ) : (
            pics.map((pic, index) => (
              <div className='mt-3 flex' key={index}>
                <FaPlayCircle />
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
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer hover:bg-[#f1f1f1]' onClick={() => handlePreviousChapter()}>
            <MdNavigateBefore />
          </div>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer hover:bg-[#f1f1f1]' onClick={() => setOpenChapterDrawer(true)}>
            <p className='mx-2'>Chap {chapternumber}</p>
          </div>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer hover:bg-[#f1f1f1]' onClick={() => handleNextChapter()}>
            <MdNavigateNext />
          </div>
          <div className='flex items-center justify-center border-2 border-gray-300 px-2 rounded cursor-pointer hover:bg-[#f1f1f1]'
            onClick={scrollToTop}>
            <FaArrowUp />
          </div>
          <div className='flex items-center justify-center px-2 rounded cursor-pointer hover:bg-[#f1f1f1]'
            onClick={scrollToTop}>
            <Button onClick={handleClickOpenSelectTheme} className='!bg-green-500'>Theme</Button>
            <Dialog disableEscapeKeyDown open={openSelectTheme} onClose={handleCloseSelectTheme}>
              <DialogTitle>Select theme</DialogTitle>
              <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="demo-dialog-native">Color</InputLabel>
                    <Select
                      native
                      value={theme}
                      onChange={handleChangeTheme}
                      input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                    >
                      <option aria-label="None" value="" />
                      {listTheme.map(theme => {
                        return <option value={theme} key={theme}>{theme}</option>
                      })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="demo-dialog-native">Intensity</InputLabel>
                    <Select
                      native
                      value={intensity}
                      onChange={handleChangeIntensity}
                      input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                    >
                      <option aria-label="None" value="" />
                      {litsIntensity.map(intensity => {
                        return <option value={intensity} key={intensity}>{intensity}</option>
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleResetTheme}>Reset</Button>
                <Button onClick={handleCancelSelectTheme}>Cancel</Button>
                <Button onClick={handleCloseSelectTheme}>Ok</Button>
              </DialogActions>
            </Dialog>
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
              {chaptercomments.length > 0 ? chaptercomments.map((comment, index) => (
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

              )) : <div className='mt-3'>
                <div className='w-[100%] border p-2 rounded-md mt-2'>
                  <div className='flex'>
                    <p className='ml-1 font-semibold text-black'></p>
                  </div>
                  <p className='text-gray-500'></p>
                  <p className='text-black w-[100%]'>No comment in this chapter &#128534;. Will you be the first one ?</p>
                </div>
              </div>}
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