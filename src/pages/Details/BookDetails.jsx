import React from 'react'
// icons
import { IoBookSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

function BookDetails() {
    const tags = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Mystery', 'Psychological', 'Romance', 'Sci-fi', 'Slice of Life', 'Supernatural']
    const chapters = [
        { title: 'Chapter 1', name: 'Beginning', date: '2022-07-04' },
        { title: 'Chapter 2', name: 'Middle', date: '2022-07-04' },
        { title: 'Chapter 3', name: 'End', date: '2022-07-04' },
        { title: 'Chapter 4', name: 'Beginning', date: '2022-07-04' },
        { title: 'Chapter 5', name: 'Middle', date: '2022-07-04' },
        { title: 'Chapter 6', name: 'End', date: '2022-07-04' },
    ]
    const comments = [
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
    ]
    return (
        <>
            <div className='border w-full h-64 absolute z-10 bg-cover bg-center filter blur-md'
                style={{ backgroundImage: "url('https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg')" }}>
            </div>

            <div className='flex flex-col md:flex-row relative z-20'>
                <div className='pt-8 md:pt-20 px-4 md:pl-20 flex justify-center md:justify-start'>
                    <img
                        src="https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg"
                        alt="SPY x FAMILY Cover"
                        loading='lazy'
                        className='w-48 h-64 md:w-60 md:h-72 object-cover shadow-lg'
                    />
                </div>

                <div className='flex flex-col justify-between w-full'>
                    <div className='pt-4 md:pt-20 px-4 md:pl-10 text-center md:text-left'>
                        <p className='text-3xl md:text-5xl font-bold text-black md:text-white'>SPY x FAMILY</p>
                        <p className='text-lg md:text-xl font-bold text-black md:text-white'>Endou Tatsuya</p>
                    </div>

                    <div className='flex-col px-4 md:ml-10 mt-6 md:mt-0'>
                        <div className='flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3 mb-4'>
                            <div className='rounded bg-green-700 p-2 md:p-3 text-white text-center cursor-pointer font-bold'>Thêm vào thư viện</div>
                            <div className='rounded border bg-white p-2 md:p-3 text-center cursor-pointer font-bold flex'><IoBookSharp /> &nbsp; Bắt đầu đọc</div>
                        </div>

                        <div className='flex flex-wrap justify-center md:justify-start mb-6 md:mb-4'>
                            {tags.map((tag) => (
                                <div className='border rounded-md m-1 p-1 bg-white' key={tag}>
                                    <span className='text-xs font-black'>{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pl-10 pr-10 md:pl-20 md:pr-20 md:mt-5 text-justify'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi tempora officia praesentium omnis ullam quas laboriosam blanditiis consequatur architecto sed nisi doloremque, cumque, reiciendis atque et, in maxime enim soluta.
            </div>
            <div className='flex flex-col md:flex-row justify-center pl-10 pr-10 md:pl-20 md:pr-20'>
                <div className='md:pt-20 md:flex-2 md:mr-10 mt-3 md:mt-0'>
                    <p className='font-bold text-green-700'> <FaList /> Danh sách chương</p>
                    <ul className='h-64 overflow-y-scroll'>
                        {chapters.map((chapter) => (
                            <li key={chapter.title}>
                                <div className='p-2 border rounded-md m-1 bg-white'>
                                    <p className='line-clamp-1'>{chapter.title}: {chapter.name}</p>
                                    <p className='text-gray-400'>{chapter.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='hidden md:block md:flex-1'></div>
                <div className='md:pt-20 md:flex-2 mt-3 md:mt-0'>
                    <p className='font-bold text-green-700'><FaComment /> Bình luận</p>
                    <ul className='h-64 overflow-y-scroll'>
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