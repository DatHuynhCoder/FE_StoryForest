import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router'

function NovelList() {
    const navigate = useNavigate()
    const [novelList, setNovelList] = useState([{
        author: "Kratos5627",
        button_link: "https://www.royalroad.com/fiction/107529/wh-40k-transcendence/chapter/2098252/awakening",
        cover_url: "https://www.royalroadcdn.com/public/covers-large/107529-wh-40k-transcendence.jpg?time=1741671555",
        followers: 0,
        link: "https://www.royalroad.com/fiction/107529/wh-40k-transcendence",
        rate: 4,
        status: "Fan Fiction",
        synopsis: "He wakes up in a universe he knows all too well—a nightmare given form, where war never ends and survival is a fleeting privilege. He’s read the lore, studied the factions, memorized the fates of empires. But knowing doesn’t mean controlling.Thrown into the lowest depths of this brutal reality, he refuses to be just another forgotten soul ground to dust. He watches, learns, adapts. Strength is the only currency here, and he intends to amass more than anyone—more than the warriors, the psykers, the so-called gods.Not for power. Not for survival. For something beyond all of it.Something greater than this universe itself.",
        tags: ['GameLit', 'Portal Fantasy / Isekai', 'Anti-Hero Lead', 'War and Military', 'Grimdark', 'Action', 'Adventure', 'Fantasy', 'Sci-fi', 'Artificial Intelligence', 'Attractive Lead', 'Cyberpunk', 'Dystopia', 'Hard Sci-fi', 'Low Fantasy', 'Magic', 'Male Lead', 'Reincarnation', 'Supernatural'],
        title: "WH 40k: Transcendence",
        views: 238,
        _id: "67eabac46f25807d87d7acc1"
    }])
    const [loading, setLoading] = useState(true)

    const handleClickOnNovel = (novelid) => {
        navigate(`/novel/${novelid}`)
    }

    useEffect(() => {
        api.get('/api/novel/').then((res) => {
            console.log("check data: ", res.data.data)
            setNovelList(res.data.data)
        }).catch((err) => console.log(err)).finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <Spinner />
    )

    return (
        <>
            <div className='bg-[url("https://static.vecteezy.com/system/resources/previews/042/623/256/non_2x/high-trees-in-forest-illustration-jungle-landscape-vector.jpg")] bg-no-repeat bg-cover fixed left-0 w-full'>
                <div className='flex flex-col md:flex-row md:ml-50 md:mr-50 border bg-white h-screen pb-30'>
                    <div className='flex-3 border overflow-y-auto h-full'>
                        {novelList.map(novel => {
                            return <div className='flex md:flex-row flex-col p-5 border-b'>
                                {/* this div for cover img */}
                                <div className='flex-1'>
                                    <img src={novel.cover_url} alt="" className='w-30 m-auto' />
                                </div>
                                <div className='flex-4'>
                                    <p onClick={() => handleClickOnNovel(novel._id)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{novel.title}</p>
                                    <div className='flex'>
                                        {/* this div for tags */}
                                        <div className='flex flex-col flex-2'>
                                            {novel.tags.slice(1, 5).map(tag => {
                                                return <div className='m-1 bg-white'>
                                                    <span className='border rounded-md text-xs md:text-[10px] font-black p-1'>
                                                        {tag}
                                                    </span>
                                                </div>
                                            })}
                                        </div>
                                        {/* this div for others info */}
                                        <div className='flex-2'>
                                            <p>{novel.followers} <b>FOLLOWERS</b></p>
                                            <p>{novel.views} <b>VIEWS</b></p>
                                            <p><b>RATE:</b> {novel.rate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                    <div className='flex-1 border md:block hidden'>
                        world
                    </div>
                </div>
            </div >
        </>
    )
}

export default NovelList