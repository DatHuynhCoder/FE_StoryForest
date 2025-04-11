import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { api } from '../../services/api'
import Spinner from '../../components/Spinner'

function NovelDetails() {
    const navigate = useNavigate()
    const { novelid } = useParams() // from NovelList.jsx
    const [loading, setLoading] = useState(true)
    const [infoNovel, setInfoNovel] = useState({
        _id: '67eabb616f25807d87d7ad10',
        title: 'Infinite Farmer: A Plants vs Dungeon LitRPG',
        author: 'R.C. Joshua',
        synopsis: 'Betrayed. Alone. Forced to survive the deadliest dungeon in the universe. As aFarmer.Tulland dreamed of adventure.To be someone who sees every-place, goes every-where, and does every-thing.All he wanted was to go beyond the confines of his tiny island. So, when the Church denied him a class, he turned to the only other being that could grant him his wish; The System.And the System delivered. Tulland gotaClass, but not one he ever wished for. Awakening as a Farmer, he finds himself in the one place where he can grow away from the clutches of the Church — The Infinite; a dungeon whose end even heroes of old have never seen. Armed with what dregs of power the System deigned to give him, Tulland will have to figure out how to survive, and cultivate, the universe’s deadliest dungeon.Expect:+ Progression fantasy with actual farming!+ A very stubborn MC+ Combat! Action! Plants!Schedule:+ Daily (7 chapters per week) (more while we’re starting out)+ Book 1 completely written!',
        tags: ['LitRPG', 'Portal Fantasy / Isekai', 'Dungeon', 'Post Apocalyptic', 'Strategy', 'Action', 'Adventure', 'Fantasy', 'GameLit', 'High Fantasy', 'Magic', 'Male Lead', 'Progression'],
        status: 'Original',
        views: 238,
        followers: 0,
        rate: 4,
        cover_url: 'https://www.royalroadcdn.com/public/covers-large/infinite-farmer-cultivating-the-infinite-dungeon-112376.jpg?time=1731726233',
        type: 'novel',
        artist: [],
        mangaid: ''
    })
    const [chapters, setChapters] = useState([
        {
            order: 1,
            novelid: "67eabac46f25807d87d7acc1",
            chapter_title: "Awakening",
            chapter_link: "https://www.royalroad.com/fiction/107529/wh-40k-transcendence/chapter/2098252/awakening",
            chapter_content: [
                "", "---", "", "The first thing I notice is the second. A low, mechanical hum, constant..."
            ],
            _id: "67eb5b9f3bb426e0d0fd8200"
        }
    ])
    const comments = [
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
    ]
    // handle click on a chapter => navigate to MangaReader
    const handleClickedChapter = (novelid, noveltitle, chapterid, chaptertitle) => {
        //     /novel/:novelid/:noveltitle/:chapterid/:chaptertitle
        navigate(`/novel/${novelid}/${noveltitle}/${chapterid}/${chaptertitle}`, { state: { chapters } })
    }
    const handleStartReading = () => {
        navigate(`/novel/${infoNovel._id}/${infoNovel.title}/${chapters[0]._id}/${chapters[0].chapter_title}`, { state: { chapters } })
    }
    useEffect(() => {
        api.get(`/api/novel/${novelid}`).then(res => {
            console.log(res.data)
            setInfoNovel(res.data.data)
            api.get(`/api/novel/${novelid}/chapters`).then(res => {
                console.log(res.data)
                setChapters(res.data.data.sort((a, b) => a.order - b.order))
            })
        }).catch(err => console.log(err)).finally(() => {
            setLoading(false)
        })
    }, [novelid])

    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <div className='border w-full h-64 absolute z-10 bg-cover bg-center filter blur-md'
                style={{ backgroundImage: 'url(' + infoNovel.cover_url + ')' }}>
            </div>

            <div className='flex flex-col md:flex-row relative z-20'>
                <div className='pt-8 md:pt-20 px-4 md:pl-20 flex justify-center md:justify-start'>
                    <img
                        src={infoNovel.cover_url}
                        alt="SPY x FAMILY Cover"
                        loading='lazy'
                        className='w-48 h-64 md:w-60 md:h-72 object-cover shadow-lg'
                    />
                </div>

                <div className='flex flex-col justify-between w-full'>
                    <div className='pt-4 md:pt-20 px-4 md:pl-10 text-center md:text-left'>
                        <p className='text-3xl md:text-5xl font-bold text-black md:text-black'>{infoNovel.title}</p>
                        <p className='text-lg md:text-xl font-bold text-black md:text-black'>
                            {infoNovel.author}
                        </p>
                    </div>

                    <div className='flex-col px-4 md:ml-10 mt-6 md:mt-0'>
                        <div className='flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3 mb-4'>
                            <div className='rounded bg-green-700 p-2 md:p-3 text-white text-center cursor-pointer font-bold'>Thêm vào thư viện</div>
                            <div onClick={handleStartReading} className='rounded border bg-white p-2 md:p-3 text-center cursor-pointer font-bold'>Bắt đầu đọc</div>
                        </div>

                        <div className='flex flex-wrap justify-center md:justify-start mb-6 md:mb-4'>
                            {infoNovel.tags.map((tag) => (
                                <div className='border rounded-md m-1 p-1 bg-white' key={tag}>
                                    <span className='text-xs font-black'>{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pl-10 pr-10 md:pl-20 md:pr-20 md:mt-5 text-justify'>
                {infoNovel.synopsis}
            </div>
            <div className='flex flex-col md:flex-row justify-center pl-10 pr-10 md:pl-20 md:pr-20'>
                {/* This div is for the chapter list */}
                <div className='md:pt-20 md:flex-2 md:mr-10 mt-3 md:mt-0'>
                    <p className='font-bold text-green-700'><u>Danh sách chương</u></p>
                    <ul className='h-64 overflow-y-scroll'>
                        {chapters.map((chapter, index) => (
                            <li key={chapter.chapter_title} onClick={() => handleClickedChapter(infoNovel._id, infoNovel.title, chapter._id, chapter.chapter_title)}>
                                <div className='p-2 border rounded-md m-1 bg-white cursor-pointer'>
                                    <p className='line-clamp-1'>{index}. {chapter.chapter_title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='hidden md:block md:flex-1'></div>
                {/* This div is for the comments */}
                <div className='md:pt-20 md:flex-2 mt-3 md:mt-0'>
                    <p className='font-bold text-green-700'><u>Bình luận</u></p>
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

export default NovelDetails