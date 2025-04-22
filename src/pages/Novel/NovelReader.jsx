import React, { useEffect, useState, useRef } from 'react'
import { FaComment } from "react-icons/fa";
import { useLocation, useParams, useNavigate } from 'react-router';
import './NovelReader.css'; // Import the CSS file
import { api, apiAuth } from '../../services/api';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';

function NovelReader() {
    const { novelid, chapterid } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { chapters, noveltitle, chaptertitle } = location.state || {}
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
            let chaptertitle = nextChapter.chapter_title
            // /novel/:novelid/:noveltitle/:chapterid/:chaptertitle
            navigate(`/novelReader/${novelid}/${nextChapter._id}`, { state: { chapters, noveltitle, chaptertitle } })
        }
    }

    const handlePreviousChapter = () => {
        const currentIndex = chapters.findIndex((chapter) => chapter._id === chapterid)
        if (currentIndex > 0) {
            const previousChapter = chapters[currentIndex - 1]
            setLoading(true)
            // /novel/:novelid/:noveltitle/:chapterid/:chaptertitle
            let chaptertitle = previousChapter.chapter_title
            navigate(`/novelReader/${novelid}/${previousChapter._id}`, { state: { chapters, noveltitle, chaptertitle } })
        }
    }
    
    // Store the reading state in a ref that persists between renders
    const readingStateRef = useRef({
        isReading: false,
        stopReading: null
    });

    // Handle Read entire Chapter
    const handleReadChapter = () => {
        const contentList = [...novelContent.chapter_content];
        let currentIndex = 0;
        let currentAudio = null;
        let isStopped = false;
        let isLoading = false;


        // Function to preload the next paragraph while current one is playing
        const preloadNextAudio = async (text) => {
            try {
                const response = await apiAuth.post(
                    '/api/vipreader/texttospeak',
                    { text },
                    { responseType: 'blob' }
                );

                if (isStopped) return null;

                const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                // Force preloading the audio file
                audio.load();

                return { audio, audioUrl };
            } catch (error) {
                return null;
            }
        };

        // Function to play audio and handle when it ends
        const playAudio = (audio, audioUrl) => {
            if (isStopped) {
                URL.revokeObjectURL(audioUrl);
                return;
            }

            currentAudio = audio;

            // Set up event listeners
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                currentAudio = null;

                // Move to next paragraph
                if (!isStopped) {
                    playNextParagraph();
                }
            };

            audio.onerror = () => {
                URL.revokeObjectURL(audioUrl);
                currentAudio = null;

                // Continue with next paragraph
                if (!isStopped) {
                    playNextParagraph();
                }
            };

            // Play the audio
            audio.play().catch(() => {
                URL.revokeObjectURL(audioUrl);
                currentAudio = null;
                playNextParagraph();
            });
        };

        // Function to create and play the audio for a paragraph
        const playParagraph = async (text, nextIndex) => {
            if (isStopped) return;

            isLoading = true;

            try {
                const response = await apiAuth.post(
                    '/api/vipreader/texttospeak',
                    { text },
                    { responseType: 'blob' }
                );

                if (isStopped) return;

                const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                isLoading = false;

                // If there's a valid next paragraph, preload it while current is playing
                if (nextIndex < contentList.length) {
                    const nextParagraph = contentList[nextIndex];
                    if (nextParagraph && nextParagraph.trim() !== '') {
                        preloadNextAudio(nextParagraph); // Start preloading next paragraph
                    }
                }

                playAudio(audio, audioUrl);

            } catch (error) {
                isLoading = false;

                // Continue with next paragraph
                if (!isStopped) {
                    playNextParagraph();
                }
            }
        };

        // Function to play the next paragraph
        const playNextParagraph = () => {
            if (isStopped || currentIndex >= contentList.length) {
                if (currentIndex >= contentList.length) {
                    toast.success("Đã đọc xong chương");
                }
                stopReading();
                return;
            }

            const paragraph = contentList[currentIndex];
            const nextIndex = currentIndex + 1;
            currentIndex = nextIndex;

            // Skip empty paragraphs
            if (!paragraph || paragraph.trim() === '') {
                playNextParagraph();
                return;
            }

            playParagraph(paragraph, nextIndex);
        };

        // Function to stop reading
        const stopReading = () => {
            isStopped = true;
            readingStateRef.current.isReading = false;

            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
        };

        // Check if already reading and stop previous session
        if (readingStateRef.current.isReading && readingStateRef.current.stopReading) {
            readingStateRef.current.stopReading();
        }

        // Start reading the chapter
        toast.info("Bắt đầu đọc chương");
        readingStateRef.current.isReading = true;
        readingStateRef.current.stopReading = stopReading;

        // Start reading from the first paragraph
        playNextParagraph();

        // Return the stop function
        return { stopReading };
    };

    // Add this effect in your component to stop reading when component unmounts
    useEffect(() => {
        return () => {
            // Cleanup function - stop any ongoing reading when component unmounts
            if (readingStateRef.current.isReading && readingStateRef.current.stopReading) {
                readingStateRef.current.stopReading();
            }
        };
    }, []);

    const handleBackToDetails = () => {
        navigate(`/novel/${novelid}`)
    }

    useEffect(() => {
        api.get(`/api/novel/${novelid}/${chapterid}`).then(res => {
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
                    <button onClick={handleReadChapter} type="button" className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Đọc chapter 🔊</button>
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