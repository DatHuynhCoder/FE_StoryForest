import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { api, apiAuth } from '../../services/api'
import Spinner from '../../components/Spinner'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

function BookDetails() {
  const navigate = useNavigate()
  //get user from redux store
  const user = useSelector((state) => state.user.user)
  const { _id, mangaid } = useParams()
  const [loading, setLoading] = useState(true)
  const [infoManga, setInfoManga] = useState({
    artist: ['REDICE Studio (레드아이스 스튜디오)', 'Jang Sung-Rak (장성락)'],
    author: ['h-goon (현군)', 'Chugong (추공)', 'Gi So-Ryeong (기소령)'],
    bookImg: {
      url: 'https://res.cloudinary.com/dvtcbryg5/image/upload/v1744423218/StoryForest/Book/mzbhrc52tmszzqnsdusq.jpg',
      public_id: 'StoryForest/Book/mzbhrc52tmszzqnsdusq'
    },
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

  //handle add to favorite
  const handleAddFavorite = async () => {
    // check if user is logged in
    if(!user){
      toast.error("Vui lòng đăng nhập để thêm vào thư viện")
      return
    }

    try {
      const response = await apiAuth.post('/api/reader/favorite/addFavorite', {bookId: _id});
      if (response.data.success) {
        toast.success("Thêm vào thư viện thành công")
      } else {
        toast.error("Thêm vào thư viện thất bại")
      }
    } catch (error) {
      console.log(error)
      toast.error("Thêm vào thư viện thất bại")
    }
  }

  useEffect(() => {
    api.get(`api/manga/${_id}`)
      .then((res) => {
        console.log("check /api/manga/id/mangaid", res.data.data);
        setInfoManga(res.data.data.manga);
        setChapters(res.data.data.chapters);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false)
      }).finally(() => {
        setLoading(false)
      })
  }, [_id])

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
              <div onClick={handleAddFavorite} className='rounded bg-green-700 p-2 md:p-3 text-white text-center cursor-pointer font-bold'>Thêm vào thư viện</div>
              <div onClick={handleStartReading} className='rounded border bg-white p-2 md:p-3 text-center cursor-pointer font-bold'>Bắt đầu đọc</div>
            </div>

            <div className='flex flex-wrap justify-center md:justify-start mb-6 md:mb-4'>
              {infoManga.tags.map((tag) => (
                <div className='border rounded-md m-1 p-1 bg-white' key={tag}>
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
          <p className='font-bold text-green-700'>Danh sách chương</p>
          <ul className='h-64 overflow-y-scroll'>
            {chapters.filter((chapter) => chapter.pages !== 0 && chapter.title !== '').map((chapter) => (
              <li key={chapter.title} onClick={() => handleClickedChapter(chapter.chapterid, infoManga.title, chapter.chapter, chapter.title)}>
                <div className='p-2 border rounded-md m-1 bg-white'>
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
          <p className='font-bold text-green-700'>Bình luận</p>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <div className='mt-3'>
                  <div className='flex items-center'>
                    <img src={comment.avatar} alt={comment.user} className='w-10 h-10 rounded-full' />
                    <p className='ml-1'>{comment.user}</p>
                  </div>
                  <div className='w-[100%] border p-2 rounded-md mt-2'>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default BookDetails