import React, { useState } from 'react'

function MangaReader() {
    const pics = [
        'https://www.spyxmangafamily.com/wp-content/uploads/2022/10/Volume_15.webp',
        'https://www.spyxmangafamily.com/wp-content/uploads/2022/10/Volume_15.webp',
        'https://www.spyxmangafamily.com/wp-content/uploads/2022/10/Volume_15.webp',
        'https://www.spyxmangafamily.com/wp-content/uploads/2022/10/Volume_15.webp',
    ]
    const comments = [
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
    ]
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    //state 
    const [comment, setComment] = useState('')

    return (
        <>
            <div className='flex flex-col justify-center items-center md:ml-[200px] md:mr-[200px]'>
                <div className='flex flex-col'>
                    <p className='text-3xl md:text-5xl font-bold text-black'>Spy x Family</p>
                </div>
                {/* This div will contain 2 button */}
                <div className='flex flex-col justify-center'>
                    <p className='md:text-lg mt-2'>Chương xxx: ...</p>
                    <button className='p-[10px] bg-green-700 text-white font-bold md:w-[500px] w-[200px] rounded mt-3'>Chương sau</button>
                    <button className='p-[10px] font-bold md:w-[500px] w-[200px] rounded border mt-3'>Chương trước</button>
                </div>
                {/* This div will contain the manga images */}
                <div>
                    {pics.map((pic, index) => (
                        <div className='mt-3' key={index}>
                            <img src={pic}
                                alt='manga'
                                loading='lazy'
                                className='max-w-xs max-h-xs object-cover'
                            />
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
                    <p className='md:text-lg mt-2 text-green-700 font-bold'>Bình luận</p>
                    <textarea
                        className='border p-2 mt-3'
                        placeholder='Viết bình luận...'
                        onChange={(e) => setComment(e.target.value)}
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