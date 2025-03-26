import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'

function BookDetails() {
    const navigate = useNavigate()
    const { mangaId } = useParams()
    const [loading, setLoading] = useState(true)
    const [infoManga, setInfoManga] = useState({
        artists: ['Kawakami Taiki'],
        authors: ['Fuse'],
        coverUrl: "https://uploads.mangadex.org/covers/e78a489b-6632-4d61-b00b-5206f5b8b22b/67de8b2f-c080-4006-91dd-a3b87abdb7fd.jpg",
        description: "The ordinary Mikami Satoru found himself dying after being stabbed by a slasher. It should have been the end of his meager 37 years, but he found himself deaf and blind after hearing a mysterious voice.  \nHe had been reincarnated into a slime!  \n  \nWhile complaining about becoming the weak but famous slime and enjoying the life of a slime at the same time, Mikami Satoru met with the Catastrophe-level monster “Storm Dragon Veldora”, and his fate began to move.\n\n---\n**Links:**\n- Alternative Official English - [K MANGA](https://kmanga.kodansha.com/title/10044/episode/317350) (U.S. Only), [INKR](https://comics.inkr.com/title/233-that-time-i-got-reincarnated-as-a-slime), [Azuki](https://www.azuki.co/series/that-time-i-got-reincarnated-as-a-slime), [Coolmic](https://coolmic.me/titles/587), [Manga Planet](https://mangaplanet.com/comic/618e32db10673)",
        id: "e78a489b-6632-4d61-b00b-5206f5b8b22b",
        publicationYear: 2015,
        status: "ongoing",
        tags: ['Reincarnation', 'Monsters', 'Action', 'Demons', 'Comedy', 'Samurai', 'Isekai', 'Fantasy', 'Adaptation'],
        title: "Tensei Shitara Slime Datta Ken"
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
        axios.get(`http://localhost:5000/manga/${mangaId}/details`)
            .then((res) => {
                console.log(res.data)
                axios.get(`http://localhost:5000/manga/${mangaId}/chapters`)
                    .then((res) => {
                        setChapters(res.data.chapters.filter((chapter) => chapter.pages !== 0 && chapter.title !== ''));
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

    return (
        <>
            {loading &&
                <div className='flex flex-1 justify-center items-center bg-white h-screen'>
                    <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." className='w-16 h-16' />
                </div>}
            <div className='border w-full h-64 absolute z-10 bg-cover bg-center filter blur-md'
                style={{ backgroundImage: 'url(' + infoManga.coverUrl + ')' }}>
            </div>

            <div className='flex flex-col md:flex-row relative z-20'>
                <div className='pt-8 md:pt-20 px-4 md:pl-20 flex justify-center md:justify-start'>
                    <img
                        src={infoManga.coverUrl}
                        alt="SPY x FAMILY Cover"
                        loading='lazy'
                        className='w-48 h-64 md:w-60 md:h-72 object-cover shadow-lg'
                    />
                </div>

                <div className='flex flex-col justify-between w-full'>
                    <div className='pt-4 md:pt-20 px-4 md:pl-10 text-center md:text-left'>
                        <p className='text-3xl md:text-5xl font-bold text-black md:text-white'>{infoManga.title}</p>
                        <p className='text-lg md:text-xl font-bold text-black md:text-white'>{
                            infoManga.authors.map((author) => author + " ")
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
                {infoManga.description.split('---')[0]}
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