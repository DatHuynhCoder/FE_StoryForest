import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { NavLink, Link, useNavigate } from 'react-router';
import DefaultAvt from "../../assets/default_avatar.jpg";

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { logout } from '../../redux/userSlice';


function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//get user from redux
	const user = useSelector((state) => state.user.user);

	const [sample, setSample] = useState([
		{ id: 1, name: "Thể loại" },
		{ id: 2, name: "Truyện tranh" },
		{ id: 3, name: "Truyện chữ" },
		{ id: 4, name: "Khác" },
	])

	const [search, setSearch] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = isOpen ? "" : "hidden"

	const handleLogout = async () => {
		try {
			const response = await api.post("/api/reader/account/logout");
			if (response.data.success) {
				dispatch(logout());
				navigate("/login")
			}
		} catch (error) {
			toast.error("An error occur during logout:", error);
		}
	}
	const [listManga, setListManga] = useState([
		{
			artist: ['REDICE Studio (레드아이스 스튜디오)', 'Jang Sung-Rak (장성락)'],
			author: ['h-goon (현군)', 'Chugong (추공)', 'Gi So-Ryeong (기소령)'],
			cover_url: "https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg",
			followers: 0,
			mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
			rate: 5,
			status: "completed",
			synopsis: "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as “Hunters”. However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to risk his life in the lowliest of dungeons, the “World’s Weakest”. Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\n\n---\n**Links:**\n\n- Official English Translation [<Pocket Comics>](https://www.pocketcomics.com/comic/320) | [<WebNovel>](https://www.webnovel.com/comic/only-i-level-up-(solo-leveling)_15227640605485101) | [<Tapas>](https://tapas.io/series/solo-leveling-comic/info)\n- Alternate Official Raw - [Kakao Webtoon](https://webtoon.kakao.com/content/나-혼자만-레벨업/2320)",
			tags: ['Award Winning', 'Monsters', 'Action', 'Long Strip', 'Adventure', 'Magic', 'Drama', 'Fantasy', 'Web Comic', 'Supernatural', 'Adaptation', 'Full Color'],
			title: "Solo Leveling",
			type: "manga",
			views: 238,
		}
	])
	useEffect(() => {
		api.get('/mangadex/manga')
			.then((res) => {
				setListManga(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
	}, []);
	const handleSearch = () => {
		if (search) {
			navigate(`/result/${search}`)
		}
	}
	return (
		<>
			{/* containter-header */}
			<div className='grid grid-cols-8 grid-rows-2 h-30 bg-[#FBFFE4] md:border-b-5 md:border-[#095533]'>
				{/* containter-header-logo */}
				<div className='col-start-1 col-end-5 row-start-1 md:col-end-3 md:row-span-2 flex justify-start'>
					<img className="object-contain" src={logo} alt='logo' />
				</div>
				{/* container-header-main */}
				<div className='grid grid-cols-7 col-start-1 bg-[#095533] md:bg-[#FBFFE4] col-end-9 row-start-2 md:col-start-3 md:col-end-7 md:row-start-1 md:row-span-2 md:grid-rows-2 md:grid-cols-1  '>
					{/* container-header-navigation */}
					<div className='col-span-3 '>
						<div className='grid grid-cols-6 md:rounded-b-lg h-full bg-[#095533]'>
							<button className='md:hidden text-lg text-white' onClick={() => setIsOpen(!isOpen)}>=
								<menu className={`absolute flex-col flex border-1 text-black bg-[#FBFFE4] w-1/3 items-start pl-2 ${toggleMenu}`}>
									<NavLink href="#">Thể loại</NavLink>
									<NavLink href="#">Truyện tranh</NavLink>
									<NavLink to="/novel">Truyện chữ</NavLink>
									<NavLink href="#">Khác</NavLink>

								</menu>
							</button>
							<p className=' col-span-5 flex justify-start items-center pl-1 md:hidden text-white font-semibold'>Trang chủ</p>
							<ul className=' justify-around hidden md:grid md:col-span-7 md:grid-cols-5 '>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/">Trang chủ</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink>Thể loại</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink>Truyện tranh</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/novel">Truyện chữ</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink>Khác</NavLink></li>
							</ul>
						</div>

					</div>
					{/* container-header-serchbox */}
					<div className='col-span-4 flex justify-center items-center p-1 pr-2 md:bg-[#FBFFE4]'>
						<input
							className=' border-2 border-[#095533] h-3/4 w-full p-1 bg-white rounded-lg' placeholder='Bạn muốn tìm truyện gì' value={search}
							onChange={(e) => setSearch(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
						/>
					</div>
				</div>
				{/* Authentication Section */}
				<div className="col-start-5 col-end-9 row-start-1 md:row-span-2 md:col-start-7 grid grid-cols-1 items-center md:pl-5 md:pr-5 pl-1 pr-1 w-full">
					{user ? (
						<div className="flex items-center gap-3 w-full">
							<Link to="/profile">
								<img src={user.avatar?.url || DefaultAvt} alt="avatar" className="w-12 h-12 rounded-full" />
							</Link>
							<span className="font-semibold truncate max-w-[100px] overflow-hidden whitespace-nowrap">
								{user.username}
							</span>
							<button className="text-sm h-1/2 md:h-2/5 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600" onClick={handleLogout}>
								Đăng xuất
							</button>
						</div>
					) : (
						<div className="flex gap-2 justify-center">
							<button className="text-sm h-1/2 md:h-2/5 bg-[#095533] text-white rounded-md font-semibold hover:bg-[#1F7D53] px-5 py-2">
								<Link to="/signup">Đăng ký</Link>
							</button>
							<button className="text-sm h-1/2 md:h-2/5 bg-[#095533] text-white rounded-md font-semibold hover:bg-[#1F7D53] px-5 py-2">
								<Link to="/login">Đăng nhập</Link>
							</button>
						</div>
					)}
				</div>
			</div>
			{
				search && (

					<div className="w-[100%] md:w-[90%] mt-10 relative px-4 md:px-0 m-auto">
						<div className="relative">
							<div className="flex gap-15 overflow-x-auto scroll-container">
								{listManga.length !== 0 && listManga.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) === true || x.synopsis.toLowerCase().includes(search.toLowerCase())).map((manga, index) => (
									<div key={index} className="flex flex-col min-w-[150px]">
										<div className='flex-1 w-48'>
											<img src={manga.cover_url} alt="" loading='lazy' className="w-full h-[200px] object-cover rounded-md shadow-md" />
										</div>
										<div className="flex-8">
											<p className="font-bold">{manga.title}</p>
										</div>
										<div onClick={() => handleViewDetails(manga.mangaid)} className='rounded bg-green-700 p-2 md:p-3 text-white text-center cursor-pointer font-bold bottom-0'>
											View
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)
			}
		</>
	);
}

export default Header;
