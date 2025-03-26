import React, { useRef, useState } from "react";
import banner from "/src/assets/banner.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import ContactForm from "/src/components/Contact/Contact";

import "/src/App.css";

var categories = [
    {
        title: "Mới nhất",
        icon: <img src="public/images/clock.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/public/images/poster.png",
        }),
    },
    {
        title: "Thịnh hành",
        icon: <img src="public/images/trending.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/public/images/poster_2.jpg",
        }),
    },
    {
        title: "Mới cập nhật",
        icon: <img src="public/images/refresh_button_icon.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/public/images/poster.png",
        }),
    },
    {
        title: "Truyện đã hoàn thành",
        icon: <img src="public/images/completed_icon.png" alt="icon" style={{ width: "35px", height: "35px" }} />,
        novels: new Array(18).fill({
            title: "Title...",
            img: "/public/images/poster_2.jpg",
        }),
    },
];


function App() {
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

            {/* Categories */}
            {categories.map((category, index) => (
                <div key={index} className="w-[100%] md:w-[90%] mt-10 relative">
                    <h2 className="text-xl font-bold mb-3 flex items-center gap-2">{category.title} {category.icon}</h2>

                    {/* List story */}
                    <div className="relative" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                        <button
                            onClick={() => handlePrev(index)}
                            className={`absolute left-0 top-1/2 transform -translate-y-1/2 
                         bg-[#FBFFE4] text-black p-3 rounded-full shadow-lg 
                         hover:bg-[#095533] transition duration-300 z-10 
                         ${hoveredIndex === index ? "opacity-100" : "opacity-0"} transition-opacity`}
                        >
                            <FaChevronLeft />
                        </button>

                        <div ref={(el) => (scrollRefs.current[index] = el)} className="flex gap-4 overflow-x-auto no-scrollbar justify-start">
                            {category.novels.map((novel, idx) => (
                                <div key={idx} className="min-w-[150px]">
                                    <img src={novel.img} alt={novel.title} className="w-full h-[200px] object-cover rounded-md shadow-md" />
                                    <p className="text-center mt-2 text-sm">{novel.title}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleNext(index)}
                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 
                         bg-[#FBFFE4] text-black p-3 rounded-full shadow-lg 
                         hover:bg-[#095533] transition duration-300 z-10 
                         ${hoveredIndex === index ? "opacity-100" : "opacity-0"} transition-opacity`}
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

            {/* Contact Form Popup */}
            {/* Contact Form Popup */}
            {showContact && (
                <div className="fixed flex w-[750px] h-[565px] items-center justify-center top-15">
                    {/* close form button */}
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl"
                        onClick={() => setShowContact(false)}
                    >
                        &times;
                    </button>

                    {/* Contact form */}
                    <ContactForm />

                </div>
            )}

        </div>
    );
}

export default App;
