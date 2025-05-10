import React, { useRef, useState, useEffect } from "react";
import banner from "/src/assets/banner.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import ContactForm from "/src/components/Contact/Contact";
import "/src/pages/Home/Home.css";
import { useNavigate } from 'react-router';
import { api, apiAuth } from "../../services/api";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import DailyCheckIn from "../../components/Home/DailyCheckIn";
import DefaultAvt from "../../assets/default_avatar.jpg";

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//get user from redux store
	const user = useSelector((state) => state.user.user);
	const [isCheckin, setIsCheckin] = useState(true);
	const [top5Account, setTop5Account] = useState([]);
	//set categories
	const [categories, setCategories] = useState([
		{ title: "Latest Manga Updates", icon: "/images/clock.png", books: [] },
		{ title: "Latest Novel Updates", icon: "/images/refresh_button_icon.png", books: [] },
		{ title: "Trending", icon: "/images/trending.png", books: [] },
		{ title: "Completed", icon: "/images/completed_icon.png", books: [] },
	]);

	useEffect(() => {
		const fetchHomepage = async () => {
			try {
				const response = await api.get('/api/user/homepage');
				if (response.data.success) {

					const { latestManga, latestNovel, trendBooks, completeBooks, top5account } = response.data;

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

					setTop5Account(top5account);
					console.log(response.data.top5account);

					setCategories(newCategories);
				}
			} catch (error) {
				console.error("Cannot find homepage data", error);
			}
		}

		fetchHomepage();
	}, []);

	const handleViewDetails = (_id, type) => {
		if (type === "manga") {
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

	//handle see Profile
	const handleSeeProfile = (id) => {
		if (user && user._id === id) {
			navigate('/profile');
		} else {
			navigate(`/otherprofile/${id}`);
		}
	}

	//handle if user click check in button
	const handleCheckin = async () => {
		// Check if user is logged in
		if (!user) {
			toast.error("Login to be able to check-in")
			return
		}

		try {
			//daily checkin response
			const response = await apiAuth.post('/api/reader/dailycheckin');

			if (response.data.success) {
				setIsCheckin(true);
				dispatch(updateUser(response.data.user));
			} else {
				toast.error("Error in check-in daily");
			}
		} catch (error) {
			console.log(error)
			toast.error("Error checkin")
		}
	}

	//get checkin status
	useEffect(() => {
		const getCheckinStatus = async () => {
			if (!user) return;

			try {
				//get response status
				const response = await apiAuth.get('/api/reader/dailycheckin');
				if (response.data.success) {
					setIsCheckin(response.data.status);
				} else {
					toast.error("Cannot check checkin status")
				}
			} catch (error) {
				console.log(error)
				toast.error("Server error")
			}
		}

		getCheckinStatus();
	}, [user])

	return (
		<div className="bg-[#00000] flex flex-col items-center relative">
			{/* Banner */}
			<img src={banner} alt="Banner" className="w-full" />

			{/* main section */}
			<div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row md:items-start md:justify-center mt-10 px-4 md:px-8">
				{/* Categories */}
				<div className="w-full md:w-3/4 flex flex-col">
					{categories.map((category, index) => (
						<div key={index} className="w-[100%] md:w-[90%] mt-5 relative px-4 md:px-0">
							<h2 className="text-xl font-bold mb-3 flex items-center gap-2">
								{category.title}
								<img src={category.icon} alt="icon" style={{ width: "35px", height: "35px" }} />
							</h2>
							<div className="relative" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
								<button
									onClick={() => handlePrev(index)}
									className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#FBFFE4] text-black p-3 rounded-full shadow-lg hover:bg-[#095533] transition duration-300 z-30 ${hoveredIndex === index ? "opacity-100" : "opacity-0"} transition-opacity`}
								>
									<FaChevronLeft />
								</button>
								<div ref={(el) => (scrollRefs.current[index] = el)} className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-container">
									{category.books.map((item, idx) => (
										<div
											key={item._id}
											className="min-w-[150px] cursor-pointer relative group transition-all duration-300 hover:scale-110 z-10 hover:z-20"
											onClick={() => handleViewDetails(item._id, item.type)}
										>
											<img
												src={item.bookImg.url}
												alt={item.title}
												className="w-full h-[200px] object-cover rounded-md shadow-md"
											/>
											<p className="text-center mt-2 text-sm line-clamp-3 font-semibold group-hover:opacity-0 transition-opacity duration-300">
												{item.title}
											</p>

											{/* Hover information overlay */}
											<div className="absolute inset-0 bg-gray-800 bg-opacity-70 rounded-md opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-center p-3 text-white">
												<h3 className="font-bold text-sm mb-1">{item.title}</h3>
												<p className="text-xs mb-1">Views: {item.views || "N/A"}</p>
												<p className="text-xs mb-1">Rate: {item.rate || "N/A"} / 5</p>
												<p className="text-xs line-clamp-3">{item.synopsis || "No description available"}</p>
											</div>
										</div>
									))}
								</div>
								<button
									onClick={() => handleNext(index)}
									className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#FBFFE4] text-black p-3 rounded-full shadow-lg hover:bg-[#095533] transition duration-300 z-30 ${hoveredIndex === index ? "opacity-100" : "opacity-0"} transition-opacity`}
								>
									<FaChevronRight />
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="w-full md:w-1/4 flex flex-col gap-3">
					{/* Daily check in section */}
					{user &&
						<DailyCheckIn
							streak={user.streak}
							isCheckin={isCheckin}
							handleCheckin={handleCheckin}
							role={user.role}
						/>
					}

					{/* Ranking section */}
					<div>
						<h2 className="text-2xl font-bold mb-3 text-center">
							Top Ranking
						</h2>

						{/* ranking list  */}
						<div className="flex flex-col gap-2">
							{top5Account.map((account, index) => (
								<div
									key={account._id}
									className={`flex flex-col cursor-pointer mb-4 ${index < 3 ? 'transform transition-all hover:scale-105' : ''}`}
									onClick={() => handleSeeProfile(account._id)}
								>
									<div className={`p-4 rounded-lg shadow-md ${index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-300 border-2 border-yellow-500' :
										index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-300 border-2 border-gray-400' :
											index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-300 border-2 border-orange-600' :
												'bg-white border border-gray-200'
										}`}>
										<div className="flex items-center gap-4">
											{/* Rank badge */}
											{index < 3 && (
												<div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-lg ${index === 0 ? 'bg-yellow-500' :
													index === 1 ? 'bg-gray-500' :
														'bg-orange-600'
													}`}>
													{index + 1}
												</div>
											)}

											{/* Avatar with border */}
											<div className={`relative flex-shrink-0 ${index < 3 ? 'w-16 h-16' : 'w-11 h-11'
												}`}>
												<img
													className={`rounded-full object-cover w-full h-full ${index === 0 ? 'border-4 border-yellow-500 shadow-lg' :
														index === 1 ? 'border-4 border-gray-400 shadow-md' :
															index === 2 ? 'border-4 border-orange-600 shadow-md' :
																'border border-gray-200'
														}`}
													src={account.avatar ? account.avatar.url : DefaultAvt}
													alt={`${account.username}'s avatar`}
												/>
											</div>

											{/* User information */}
											<div className="flex flex-col">
												<div className="flex items-center gap-2">
													<span className={`font-bold ${index < 3 ? 'text-xl' : 'text-lg'}`}>
														{account.username}
													</span>
													<span className={`px-2 py-1 rounded-full text-xs font-medium ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
														index === 1 ? 'bg-gray-100 text-gray-800' :
															index === 2 ? 'bg-orange-100 text-orange-800' :
																'bg-blue-100 text-blue-800'
														}`}>
														{account.rank}
													</span>
												</div>

												<div className="flex items-center gap-3 mt-1">
													<div className="flex items-center gap-1">
														<span className="text-sm font-medium text-gray-700">Lvl {account.level}</span>
													</div>

													{/* Experience bar: make logic later */}
													{/* <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
														<div
															className={`h-full ${index === 0 ? 'bg-yellow-500' :
																	index === 1 ? 'bg-gray-500' :
																		index === 2 ? 'bg-orange-600' :
																			'bg-blue-500'
																}`}
															style={{ width: `${Math.min(100, (account.exp / 1000) * 100)}%` }}
														/>
													</div> */}
													<span className="text-xs text-gray-500">{account.exp} XP</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

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