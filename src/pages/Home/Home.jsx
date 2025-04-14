import React, { useRef, useState, useEffect } from "react";
import banner from "/src/assets/banner.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import ContactForm from "/src/components/Contact/Contact";
import "/src/pages/Home/Home.css";
import { useNavigate } from 'react-router';
import { api } from "../../services/api";

var categories = [
    {
        title: "Mới nhất",
        icon: <img src="/images/clock.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/images/poster.png",
        }),
    },
    {
        title: "Thịnh hành",
        icon: <img src="/images/trending.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/images/poster_2.jpg",
        }),
    },
    {
        title: "Mới cập nhật",
        icon: <img src="/images/refresh_button_icon.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/images/poster.png",
        }),
    },
    {
        title: "Truyện đã hoàn thành",
        icon: <img src="/images/completed_icon.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/images/poster_2.jpg",
        }),
    },
];

function Home() {
    const navigate = useNavigate();
    const [listManga, setListManga] = useState([{
        artist: ['REDICE Studio (레드아이스 스튜디오)', 'Jang Sung-Rak (장성락)'],
        author: ['h-goon (현군)', 'Chugong (추공)', 'Gi So-Ryeong (기소령)'],
        bookImg: { url: 'https://res.cloudinary.com/dvtcbryg5/image/upload/…4423218/StoryForest/Book/mzbhrc52tmszzqnsdusq.jpg', public_id: 'StoryForest/Book/mzbhrc52tmszzqnsdusq' },
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
    }]);
    // useEffect(() => {
    //     api.get('/api/manga/')
    //         .then((res) => {
    //             console.log("check /api/manga", res.data.data);
    //             setListManga(res.data.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, []);
    const handleViewDetails = (_id) => {
        console.log("check _id", _id);
        navigate(`/bookDetail/${_id}`);
    }
    const scrollRefs = useRef([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showContact, setShowContact] = useState(false);

    const handleNext = (index) => {
        const container = scrollRefs.current[index];
        if (container) {
            const novelWidth = container.children[0]?.clientWidth || 150;
            container.scrollBy({
                left: novelWidth * 4,
                behavior: "smooth",
            });
        }
    };

    const handlePrev = (index) => {
        const container = scrollRefs.current[index];
        if (container) {
            const novelWidth = container.children[0]?.clientWidth || 150;
            container.scrollBy({
                left: -novelWidth * 4,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-[#00000] flex flex-col items-center relative">
            {/* Banner */}
            <img src={banner} alt="Banner" className="w-full" />
            {/* List Manga */}
            {/* <div className="w-[100%] md:w-[90%] mt-10 relative px-4 md:px-0">
                <div className="relative">
                    <div ref={(el) => (scrollRefs.current[0] = el)} className="flex gap-15 overflow-x-auto scroll-container">
                        {listManga.length !== 0 && listManga.map((manga, index) => (
                            <div key={index} className="flex flex-col min-w-[150px]">
                                <div className='flex-1 w-48'>
                                    <img src={manga.cover_url} alt="" loading='lazy' className="w-full h-[200px] object-cover rounded-md shadow-md" />
                                </div>
                                <div className="flex-8">
                                    <p className="font-bold">{manga.title}</p>
                                </div>
                                <div onClick={() => handleViewDetails(manga._id)} className='rounded bg-green-700 p-2 md:p-3 text-white text-center cursor-pointer font-bold bottom-0'>
                                    View
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            {/* Categories */}
            {categories.map((category, index) => (
                <div key={index} className="w-[100%] md:w-[90%] mt-10 relative px-4 md:px-0">
                    <h2 className="text-xl font-bold mb-3 flex items-center gap-2">{category.title} {category.icon}</h2>
                    <div className="relative" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                        <button
                            onClick={() => handlePrev(index)}
                            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FBFFE4] text-black p-3 rounded-full shadow-lg hover:bg-[#095533] transition duration-300 z-10 ${hoveredIndex === index ? "opacity-100" : "opacity-0"} transition-opacity`}
                        >
                            <FaChevronLeft />
                        </button>
                        <div ref={(el) => (scrollRefs.current[index] = el)} className="flex gap-4 overflow-x-auto scroll-container">
                            {category.novels.map((novel, idx) => (
                                <div key={idx} className="min-w-[150px]">
                                    <img src={novel.img} alt={novel.title} className="w-full h-[200px] object-cover rounded-md shadow-md" />
                                    <p className="text-center mt-2 text-sm">{novel.title}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleNext(index)}
                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FBFFE4] text-black p-3 rounded-full shadow-lg hover:bg-[#095533] transition duration-300 z-10 ${hoveredIndex === index ? "opacity-100" : "opacity-0"} transition-opacity`}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            ))}
            {/* Contact Button */}
            <button
                className="fixed bottom-5 right-5 p-3 bg-[#095533] text-white font-bold rounded-full shadow-lg flex items-center"
                onClick={() => setShowContact(true)}
            >
                <IoIosContacts className="mr-2 text-2xl" /> Liên hệ
            </button>
            {/* Contact Form */}
            {showContact && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowContact(false)}></div>
                    <div className="relative flex flex-col w-[90%] md:w-1/2 max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl"
                            onClick={() => setShowContact(false)}
                        >
                            &times;
                        </button>
                        <ContactForm />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;