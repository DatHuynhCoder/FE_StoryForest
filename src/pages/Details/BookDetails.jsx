import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { api } from '../../services/api'
import Spinner from '../../components/Spinner'

function BookDetails() {
    const navigate = useNavigate()
    const { mangaId } = useParams()
    const [loading, setLoading] = useState(true)
    const [infoManga, setInfoManga] = useState({
        mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
        title: "Solo Leveling",
        author: [
            "h-goon (현군)",
            "Chugong (추공)",
            "Gi So-Ryeong (기소령)"
        ],
        artist: [
            "REDICE Studio (레드아이스 스튜디오)",
            "Jang Sung-Rak (장성락)"
        ],
        synopsis: "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as “Hunters”. However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to risk his life in the lowliest of dungeons, the “World’s Weakest”. Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\n\n---\n**Links:**\n\n- Official English Translation [<Pocket Comics>](https://www.pocketcomics.com/comic/320) | [<WebNovel>](https://www.webnovel.com/comic/only-i-level-up-(solo-leveling)_15227640605485101) | [<Tapas>](https://tapas.io/series/solo-leveling-comic/info)\n- Alternate Official Raw - [Kakao Webtoon](https://webtoon.kakao.com/content/나-혼자만-레벨업/2320)",
        tags: [
            "Award Winning",
            "Monsters",
            "Action",
            "Long Strip",
            "Adventure",
            "Magic",
            "Drama",
            "Fantasy",
            "Web Comic",
            "Supernatural",
            "Adaptation",
            "Full Color"
        ],
        status: "completed",
        type: "manga",
        views: 238,
        followers: 0,
        rate: 5,
        cover_url: "https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg"
    })
    const [chapters, setChapters] = useState([
        { id: '123', title: 'Chapter 1', name: 'Beginning', date: '2022-07-04', chapter: '1', pages: 12 },
        { id: '123', title: 'Chapter 2', name: 'Middle', date: '2022-07-04', chapter: '1', pages: 12 },
        { id: '123', title: 'Chapter 3', name: 'End', date: '2022-07-04', chapter: '1', pages: 12 },
        { id: '123', title: 'Chapter 4', name: 'Beginning', date: '2022-07-04', chapter: '1', pages: 12 },
        { id: '123', title: 'Chapter 5', name: 'Middle', date: '2022-07-04', chapter: '1', pages: 12 },
        { id: '123', title: 'Chapter 6', name: 'End', date: '2022-07-04', chapter: '1', pages: 12 }
    ])
    const tags = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Mystery', 'Psychological', 'Romance', 'Sci-fi', 'Slice of Life', 'Supernatural']
    const comments = [
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
    ]
    // handle click on a chapter => navigate to MangaReader
    const handleClickedChapter = (chapterId, mangaTitle, chapterNumber, chapterTitle) => {
        navigate(`/mangaReader/${mangaId}/${mangaTitle}/${chapterNumber}/${chapterTitle}/${chapterId}`, { state: { chapters } })
    }
    const handleStartReading = () => {
        navigate(`/mangaReader/${mangaId}/${infoManga.title}/${chapters[0].chapter}/${chapters[0].title}/${chapters[0].id}`, { state: { chapters } })
    }
    useEffect(() => {
        api.get(`/manga/${mangaId}/details`)
            .then((res) => {
                console.log(res.data)
                api.get(`/manga/${mangaId}/chapters`)
                    .then((res) => {
                        setChapters(res.data.chapters.filter((chapter) => chapter.pages !== 0));
                    })
                setInfoManga(res.data);
                // setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                // setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
    }, [mangaId])

    if (loading) {
        return (<Spinner />)
    }

    return (
        <>
            <div className='border w-full h-64 absolute z-10 bg-cover bg-center filter blur-md'
                style={{ backgroundImage: 'url(' + infoManga.cover_url + ')' }}>
            </div>

            <div className='flex flex-col md:flex-row relative z-20'>
                <div className='pt-8 md:pt-20 px-4 md:pl-20 flex justify-center md:justify-start'>
                    <img
                        src={infoManga.cover_url}
                        alt="SPY x FAMILY Cover"
                        loading='lazy'
                        className='w-48 h-64 md:w-60 md:h-72 object-cover shadow-lg'
                    />
                </div>

                <div className='flex flex-col justify-between w-full'>
                    <div className='pt-4 md:pt-20 px-4 md:pl-10 text-center md:text-left'>
                        <p className='text-3xl md:text-5xl font-bold text-black md:text-black'>{infoManga.title}</p>
                        <p className='text-lg md:text-xl font-bold text-black md:text-black'>{
                            infoManga.author.map((author) => author + " ")
                        }
                        </p>
                    </div>

                    <div className='flex-col px-4 md:ml-10 mt-6 md:mt-0'>
                        <div className='flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3 mb-4'>
                            <div className='rounded bg-green-700 p-2 md:p-3 text-white text-center cursor-pointer font-bold'>Thêm vào thư viện</div>
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
                {infoManga.synopsis.split('---')[0]}
            </div>
            <div className='flex flex-col md:flex-row justify-center pl-10 pr-10 md:pl-20 md:pr-20'>
                {/* This div is for the chapter list */}
                <div className='md:pt-20 md:flex-2 md:mr-10 mt-3 md:mt-0'>
                    <p className='font-bold text-green-700'>Danh sách chương</p>
                    <ul className='h-64 overflow-y-scroll'>
                        {chapters.filter((chapter) => chapter.pages !== 0 && chapter.title !== '').map((chapter) => (
                            <li key={chapter.title} onClick={() => handleClickedChapter(chapter.id, infoManga.title, chapter.chapter, chapter.title)}>
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
                                    <div className='mt-2 w-[100%] border p-2 rounded-md mt-2'>
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