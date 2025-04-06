import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import loadingGif from '../../assets/loading.gif'

function MangaReader() {
    const { mangaId, chapterId, mangaTitle, chapterNumber, chapterTitle } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const chapters = location.state.chapters || []
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
        const currentIndex = chapters.findIndex((chapter) => chapter.id === chapterId)
        if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
            const nextChapter = chapters[currentIndex + 1]
            setLoading(true)
            navigate(`/mangaReader/${mangaId}/${mangaTitle}/${nextChapter.chapter}/${nextChapter.title}/${nextChapter.id}`, { state: { chapters } })
        }
    }

    const handlePreviousChapter = () => {
        const currentIndex = chapters.findIndex((chapter) => chapter.id === chapterId)
        if (currentIndex > 0) {
            const previousChapter = chapters[currentIndex - 1]
            setLoading(true)
            navigate(`/mangaReader/${mangaId}/${mangaTitle}/${previousChapter.chapter}/${previousChapter.title}/${previousChapter.id}`, { state: { chapters } })
        }
    }

    const handleBackToDetails = () => {
        navigate(`/bookDetail/${mangaId}`);
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/mangadex/chapter/${chapterId}/images`)
            .then((res) => {
                setPics(res.data.images)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
    }, [chapterId])

    return (
        <>
            <div className='flex flex-col justify-center items-center md:ml-[200px] md:mr-[200px]'>
                <div className='flex flex-col'>
                    <p className='text-3xl md:text-5xl font-bold text-black text-center cursor-pointer' onClick={handleBackToDetails}>{mangaTitle == undefined ? "" : mangaTitle}</p>
                </div>
                {/* This div will contain 2 button */}
                <p className='md:text-lg mt-2'>Chương {chapterNumber}: {chapterTitle}</p>
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
                {/* Back to Top button */}
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-5 right-5 p-3 bg-green-700 text-white font-bold rounded-full shadow-lg'
                >
                    ↑Top
                </button>
                {/* This div is for comment */}
                <div className='flex flex-col justify-center mt-10 md:w-[100%] w-[80%]'>
                    <p className='md:text-lg mt-2 text-green-700 font-bold'>Bình luận</p>
                    <textarea
                        className='border p-2 mt-3'
                        placeholder='Viết bình luận...'
                    ></textarea>
                    <button className='p-[10px] bg-green-700 text-white font-bold md:w-[100%] rounded mt-3'>Gửi bình luận</button>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <div className='mt-3'>
                                    <div className='flex items-center'>
                                        <img src={comment.avatar} alt={comment.user} className='w-10 h-10 rounded-full' />
                                        <p className='ml-1 font-semibold'>{comment.user}</p>
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

export default MangaReader