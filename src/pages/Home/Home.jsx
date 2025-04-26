import React, { useRef, useState, useEffect } from "react";
import banner from "/src/assets/banner.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import ContactForm from "/src/components/Contact/Contact";
import "/src/pages/Home/Home.css";
import { useNavigate } from 'react-router';
import { api } from "../../services/api";
import { toast } from "react-toastify";

function Home() {
	const navigate = useNavigate();
	//set categories
	const [categories, setCategories] = useState([
		{ title: "Latest Manga Updates", icon: "/images/clock.png", books: []},
		{ title: "Latest Novel Updates", icon: "/images/refresh_button_icon.png", books: []},
		{ title: "Trending", icon: "/images/trending.png", books: [] },
		{ title: "Completed", icon: "/images/completed_icon.png", books: []},
	]);

	useEffect(() => {
		const fetchHomepage = async () => {
			try {
				const response = await api.get('/api/user/homepage');
				if (response.data.success) {

					const { latestManga, latestNovel, trendBooks, completeBooks } = response.data;

					const newCategories = categories.map((category, index) => {
						let books = [];
						if (index === 0) books = latestManga;
						if (index === 1) books = latestNovel;
						if (index === 2) books = trendBooks;
						if (index === 3) books = completeBooks;

						return {
							...category,
							books: books || [],
						};
					});

					setCategories(newCategories);
				}
			} catch (error) {
				console.error("Cannot find homepage data", error);
			}
		}

		fetchHomepage();
	}, []);

	const handleViewDetails = (_id, type) => {
		if(type === "manga"){
			navigate(`/manga/${_id}`);
		} else {
			navigate(`/novel/${_id}`);
		}
		
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
			{/* Categories */}
			{categories.map((category, index) => (
				<div key={index} className="w-[100%] md:w-[90%] mt-10 relative px-4 md:px-0">
					<h2 className="text-xl font-bold mb-3 flex items-center gap-2">
						{category.title}
						<img src={category.icon} alt="icon" style={{ width: "35px", height: "35px" }} />
					</h2>
					<div className="relative" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
						<button
							onClick={() => handlePrev(index)}
							className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FBFFE4] text-black p-3 rounded-full shadow-lg hover:bg-[#095533] transition duration-300 z-10 ${hoveredIndex === index ? "opacity-100" : "opacity-0"} transition-opacity`}
						>
							<FaChevronLeft />
						</button>
						<div ref={(el) => (scrollRefs.current[index] = el)} className="flex gap-4 overflow-x-auto scroll-container">
							{category.books.map((item, idx) => (
								<div key={item._id} className="min-w-[150px] cursor-pointer" onClick={() => handleViewDetails(item._id, item.type)}>
									<img src={item.bookImg.url} alt={item.title} className="w-full h-[200px] object-cover rounded-md shadow-md" />
									<p className="text-center mt-2 text-sm line-clamp-3 font-semibold">{item.title}</p>
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