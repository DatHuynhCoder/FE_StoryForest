import React, { useEffect, useState } from 'react'
import { FaComment } from "react-icons/fa";
import { useLocation, useParams, useNavigate } from 'react-router';
import './NovelReader.css'; // Import the CSS file
import { api } from '../../services/api';
import Spinner from '../../components/Spinner';

function NovelReader() {
    const { novelid, noveltitle, chapterid, chaptertitle } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const chapters = location.state.chapters || []
    const [novelContent, setNovelContent] = useState({
        novelid: "67eabac46f25807d87d7acc1",
        chapter_title: "Awakening",
        chapter_link: "https://www.royalroad.com/fiction/107529/wh-40k-transcendence/chapter/2098252/awakening",
        chapter_content: [
            "", "---", "", "The first thing I notice is the second. A low, mechanical hum, constant..."
        ],
        _id: "67eb5b9f3bb426e0d0fd8200"
    })
    const comments = [
        { avatar: 'https://static.ybox.vn/2022/ 7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
    ]
    const [loading, setLoading] = useState(true)
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleNextChapter = () => {
        const currentIndex = chapters.findIndex((chapter) => chapter._id === chapterid)
        if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
            const nextChapter = chapters[currentIndex + 1]
            setLoading(true)
            // /novel/:novelid/:noveltitle/:chapterid/:chaptertitle
            navigate(`/novel/${novelid}/${noveltitle}/${nextChapter._id}/${nextChapter.chapter_title}`, { state: { chapters } })
        }
    }

    const handlePreviousChapter = () => {
        const currentIndex = chapters.findIndex((chapter) => chapter._id === chapterid)
        if (currentIndex > 0) {
            const previousChapter = chapters[currentIndex - 1]
            setLoading(true)
            // /novel/:novelid/:noveltitle/:chapterid/:chaptertitle
            navigate(`/novel/${novelid}/${noveltitle}/${previousChapter._id}/${previousChapter.chapter_title}`, { state: { chapters } })
        }
    }

    const handleBackToDetails = () => {
        navigate(`/novel/${novelid}`)
    }

    useEffect(() => {
        api.get(`/api/novel/${novelid}/${chapterid}`).then(res => {
            console.log('check chapter info: ', res.data)
            console.log('check chapters array:', chapters)
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
                <div className='flex flex-col justify-center headifo sticky-top'>
                    <p className='md:text-lg mt-2'>{chaptertitle}</p>
                </div>
                <div className='flex flex-col justify-center sticky-top'>
                    <button onClick={() => handleNextChapter()} className='p-[10px] bg-green-700 text-white font-bold md:w-[500px] w-[200px] rounded mt-3 cursor-pointer'>Next chapter</button>
                    <button onClick={() => handlePreviousChapter()} className='p-[10px] font-bold md:w-[500px] w-[200px] rounded border mt-3 cursor-pointer'>Previous chapter</button>
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
                {/* Back to Top button */}
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-5 right-5 p-3 bg-green-700 text-white font-bold rounded-full shadow-lg'
                >
                    ↑Top
                </button>
                {/* This div is for comment */}
                <div className='flex flex-col justify-center mt-10 md:w-[100%] w-[80%]'>
                    <p className='md:text-lg mt-2 text-green-700 font-bold flex'>Bình luận &nbsp; <FaComment size={20} /></p>
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
                                    <div className='mt-2 w-[100%] border p-2 rounded-md'>
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

export default NovelReader