import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { api, apiAuth } from '../../services/api'
import Spinner from '../../components/Spinner'
import { toast } from 'react-toastify'
//use redux to update user
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userSlice'
import defaultAvt from '../../assets/default_avatar.jpg'
import processingGif from '../../assets/processing.gif'

function BookDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  //get user from redux store
  const user = useSelector((state) => state.user.user)
  const { _id } = useParams()

  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [isFavorite, setIsFavorite] = useState(false);
  const [infoManga, setInfoManga] = useState({
    artist: ['REDICE Studio (레드아이스 스튜디오)', 'Jang Sung-Rak (장성락)'],
    author: ['Loading ...'],
    bookImg: {
      url: processingGif,
      public_id: 'StoryForest/Book/mzbhrc52tmszzqnsdusq'
    },
    cover_url: processingGif,
    followers: 0,
    mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
    rate: 5,
    status: "Loading ...",
    synopsis: "Loading ...",
    tags: ['Loading ...'],
    title: "Loading ...",
    type: "Loading ...",
    updatedAt: "2025-04-12T02:00:00.436Z",
    views: 238,
    _id: "67f298a0c0aa3501386b7afb"
  })
  const [chapters, setChapters] = useState([
    {
      _id: "67f9e19f83c490c21b7a8958",
      chapterid: "1a8bc908-7847-498f-a71f-69762713e829",
      title: "Prologue",
      chapter: "0",
      volume: "1",
      pages: 9,
      publishDate: "2019-06-14T10:37:42+00:00",
      mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0"
    }
  ])
  const tags = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Mystery', 'Psychological', 'Romance', 'Sci-fi', 'Slice of Life', 'Supernatural']

  const [bookcomments, setBookComments] = useState([{
    _id: "67f9e19f83c490c21b7a8958",
    content: "This is a comment",
    rating: 5,
    chapternumber: "1",
    chaptertitle: "Prologue",
    chapterid: "1a8bc908-7847-498f-a71f-69762713e829",
    userid: "67f298a0c0aa3501386b7afb",
    username: "User1",
    bookid: "67f298a0c0aa3501386b7afb",
    createAt: "2025-04-12T02:00:00.436Z",
    updateAt: "2025-04-12T02:00:00.436Z",
    __v: 0
  }])
  const comments = [
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
    { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
  ]
  // handle click on a chapter => navigate to MangaReader
  const handleClickedChapter = (chapterid, mangatitle, chapternumber, chaptertitle) => {
    // to MangaReader.jsx
    navigate(`/mangaReader/${infoManga.mangaid}/${chapterid}`, { state: { _id, chapters, mangatitle, chapternumber, chaptertitle } })
  }
  const handleStartReading = () => {
    let mangatitle = infoManga.title
    let chapternumber = chapters[0].chapter
    let chaptertitle = chapters[0].title
    // to MangaReader.jsx
    navigate(`/mangaReader/${infoManga.mangaid}/${chapters[0].chapterid}`, { state: { _id, chapters, mangatitle, chapternumber, chaptertitle } })
  }

  //handle see Profile
  const handleSeeProfile = (id) => {
    if (user && user._id === id) {
      navigate('/profile');
    } else {
      navigate(`/otherprofile/${id}`);
    }
  }

  //delete or add to favorite
  const handleToggleFavorite = async () => {
    setButtonLoading(true)
    // Check if user is logged in
    if (!user) {
      toast.error("Login to be able to add favorite")
      return
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await apiAuth.delete('/api/reader/favorite/deleteFavorite', {
          data: { bookId: _id }
        });
        if (response.data.success) {
          setIsFavorite(false);
          toast.success('Delete favorite book successfully');
          setInfoManga(prev => ({
            ...prev,
            followers: prev.followers - 1
          }));
        } else {
          toast.error('Error in deleting favorite book');
        }
      } else {
        // Add to favorites
        const response = await apiAuth.post('/api/reader/favorite/addFavorite', { bookId: _id });
        if (response.data.success) {
          setIsFavorite(true);
          toast.success("Add to favorite successfully")
          setInfoManga(prev => ({
            ...prev,
            followers: prev.followers + 1
          }));

          //update user in redux
          dispatch(updateUser(response.data.user));
        } else {
          toast.error("Error in adding to favorite")
        }
      }
      setButtonLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(isFavorite ? "Error removing from favorites" : "Error in adding to favorite")
    }
  }

  // get book details and chapters
  useEffect(() => {
    api.get(`api/manga/${_id}`)
      .then((res) => {
        console.log("check /api/manga/:id", res.data.data);
        setInfoManga(res.data.data.manga);
        setChapters(res.data.data.chapters.filter((chapter) => chapter.title !== null).filter((chapter) => chapter.pages !== 0).sort((a, b) => parseInt(a.chapter) - parseInt(b.chapter)));
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false)
      }).finally(() => {
        setLoading(false)
      })
  }, [_id])
  // get book comments
  useEffect(() => {
    api.get(`api/reader/review/book/${_id}`)
      .then((res) => {
        console.log("check /api/reader/review/book/:id", res.data.data);
        setBookComments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  //get favorite status(in or notin)
  useEffect(() => {
    const getFavoriteStatus = async (req, res) => {
      if (!user) return;

      try {
        const response = await apiAuth(`/api/reader/favorite/checkFavorite?bookId=${_id}`);
        if (response.data.success) {
          setIsFavorite(response.data.status);
        } else {
          toast.error("Cannot check favorite status")
        }
      } catch (error) {
        console.log(error)
        toast.error("Server error")
      }
    }
    getFavoriteStatus();
  }, [user, _id])

  if (loading) {
    return (<Spinner />)
  }

  return (
    <>
      <div className='border w-full h-64 absolute z-10 bg-cover bg-center filter blur-md'
        style={{ backgroundImage: 'url(' + infoManga.bookImg.url + ')' }}>
      </div>

      <div className='flex flex-col md:flex-row relative z-20'>
        <div className='pt-8 md:pt-20 px-4 md:pl-20 flex justify-center md:justify-start'>
          <img
            src={infoManga.bookImg.url}
            alt={infoManga.title}
            loading='lazy'
            className='w-48 h-64 md:w-60 md:h-72 object-cover shadow-lg'
            style={{ boxShadow: '3px 3px' }}
          />
        </div>

        <div className='flex flex-col justify-between w-full'>
          <div className='pt-4 md:pt-20 px-4 md:pl-10 text-center md:text-left'>
            <p className='text-3xl md:text-5xl font-bold text-black md:text-black md:hidden'>{infoManga.title}</p>
            <p className='text-lg md:text-xl font-bold text-black md:text-black md:hidden'>{
              infoManga.author.map((author) => author + " ")
            }
            </p>
          </div>

          <div className='flex-col px-4 md:ml-10 mt-6 md:mt-0'>
            <div className='flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3 mb-4'>
              {/* Favorite toggle button */}
              <div
                onClick={handleToggleFavorite}
                className={`border rounded p-2 md:p-3 text-center cursor-pointer font-bold ${isFavorite ? 'bg-red-600 hover:bg-red-500' : 'bg-green-700 hover:bg-green-500'}`}
                style={buttonLoading ? {
                  backgroundImage: `url(${processingGif})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '3px 3px'
                } : { boxShadow: '3px 3px' }}
              >
                <span className='text-white'>{isFavorite ? 'Remove from favorite' : 'Add to favorite'}</span>
              </div>

              <div onClick={handleStartReading} className='rounded border bg-white p-2 md:p-3 text-center cursor-pointer font-bold hover:bg-[#f1f1f1]' style={{ boxShadow: '3px 3px' }}>
                Start reading
              </div>
            </div>
            <div>
              <p className='font-semibold'> &nbsp;{infoManga.followers} followed</p>
            </div>

            <div className='flex flex-wrap justify-center md:justify-start mb-6 md:mb-4'>
              {infoManga.tags.map((tag) => (
                <div className='border rounded-md m-1 p-1 bg-white cursor-pointer hover:bg-[#f1f1f1]' style={{ boxShadow: '3px 3px' }} key={tag} onClick={() => { console.log("do something with ", tag) }}>
                  <span className='text-xs font-black'>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='pl-10 pr-10 md:pl-20 md:pr-20 md:mt-5 text-justify'>
        <div className='md:block hidden'>
          <p className='text-3xl md:text-5xl font-bold text-black md:text-black'>{infoManga.title}</p>
          <p className='text-lg md:text-xl font-bold text-black md:text-black'>{
            infoManga.author.map((author) => author + " ")
          }
          </p>
        </div>
        {infoManga.synopsis.split('---')[0]}
      </div>
      <div className='flex flex-col md:flex-row justify-center pl-10 pr-10 md:pl-20 md:pr-20'>
        {/* This div is for the chapter list */}
        <div className='md:pt-20 md:flex-2 md:mr-10 mt-3 md:mt-0'>
          <p className='font-bold text-green-700'>Chapters</p>
          <ul className='h-64 overflow-y-scroll'>
            {chapters.sort((a, b) => parseInt(a.chapter) - parseInt(b.chapter)).map((chapter) => (
              <li key={chapter._id} onClick={() => handleClickedChapter(chapter.chapterid, infoManga.title, chapter.chapter, chapter.title)}>
                <div className='p-2 border rounded-md m-1 bg-white hover:bg-[#f1f1f1] cursor-pointer'>
                  <p className='line-clamp-1'>Chap&nbsp;{chapter.chapter}: {chapter.title}</p>
                  <p className='text-gray-400'>{chapter.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden md:block md:flex-1'></div>
        {/* This div is for the comments */}
        <div className='md:pt-20 md:flex-2 mt-3 md:mt-0'>
          <p className='font-bold text-green-700'>Comments</p>
          <ul>
            {bookcomments.length > 0 ? bookcomments.map((comment, index) => (
              <li key={comment._id} onClick={() => handleSeeProfile(comment.userid._id)}>
                <div className='mt-3 cursor-pointer'>
                  <div className='w-[100%] border p-2 rounded-md mt-2'>
                    <div className='flex'>
                      <img src={comment.userid?.avatar?.url || defaultAvt} alt="avatar" className='w-10 h-10 rounded-full' />
                      <p className='ml-1 font-semibold text-black'>{comment.userid.username}</p>
                    </div>
                    <p className='text-gray-500'>Chapter {comment.chapternumber}: {comment.chaptertitle}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </li>
            )) : <div className='mt-3'>
              <div className='w-[100%] border p-2 rounded-md mt-2'>
                <div className='flex'>
                  <p className='ml-1 font-semibold text-black'></p>
                </div>
                <p className='text-gray-500'></p>
                <p>No comment &#128534;. Will you be the first one ?</p>
              </div>
            </div>}
          </ul>
        </div>
      </div>
    </>
  )
}

export default BookDetails