import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { NavLink, Link, useNavigate } from 'react-router';
import DefaultAvt from "../../assets/default_avatar.jpg";

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { logout } from '../../redux/userSlice';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';



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

	const [isOpen, setIsOpen] = useState(false);
	const [isOpenProfile, setIsOpenProfile] = useState(false);

	const toggleMenu = isOpen ? "" : "hidden";
	const toggleProfile = isOpenProfile ? "" : "hidden";

	const [toggleAdvancedSearch, setToggleAdvancedSearch] = useState(false)

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
			bookImg: {
				url: 'https://res.cloudinary.com/dvtcbryg5/image/upload/…4423218/StoryForest/Book/mzbhrc52tmszzqnsdusq.jpg',
				public_id: 'StoryForest/Book/mzbhrc52tmszzqnsdusq'
			},
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
		}
	])
	const [novelList, setNovelList] = useState([{
		artist: [],
		author: 'R.C. Joshua',
		bookImg: {
			url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1744423828/StoryFor…",
			public_id: "StoryForest/Book/fg3883opownhiuid4hyn"
		},
		cover_url: 'https://www.royalroadcdn.com/public/covers-large/infinite-farmer-cultivating-the-infinite-dungeon-112376.jpg?time=1731726233',
		followers: 0,
		mangaid: '',
		rate: 4,
		status: 'Original',
		synopsis: 'Betrayed. Alone. Forced to survive the deadliest dungeon in the universe. As aFarmer.Tulland dreamed of adventure.To be someone who sees every-place, goes every-where, and does every-thing.All he wanted was to go beyond the confines of his tiny island. So, when the Church denied him a class, he turned to the only other being that could grant him his wish; The System.And the System delivered. Tulland gotaClass, but not one he ever wished for. Awakening as a Farmer, he finds himself in the one place where he can grow away from the clutches of the Church — The Infinite; a dungeon whose end even heroes of old have never seen. Armed with what dregs of power the System deigned to give him, Tulland will have to figure out how to survive, and cultivate, the universe’s deadliest dungeon.Expect:+ Progression fantasy with actual farming!+ A very stubborn MC+ Combat! Action! Plants!Schedule:+ Daily (7 chapters per week) (more while we’re starting out)+ Book 1 completely written!',
		tags: ['LitRPG', 'Portal Fantasy / Isekai', 'Dungeon', 'Post Apocalyptic', 'Strategy', 'Action', 'Adventure', 'Fantasy', 'GameLit', 'High Fantasy', 'Magic', 'Male Lead', 'Progression'],
		title: 'Infinite Farmer: A Plants vs Dungeon LitRPG',
		type: 'novel',
		updatedAt: "2025-04-12T02:00:00.436Z",
		views: 238,
		_id: '67eabb616f25807d87d7ad10'
	}])
	useEffect(() => {
		api.get('/api/manga')
			.then((res) => {
				setListManga(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			}).finally(() => {
				api.get('/api/novel')
					.then(res2 => {
						setNovelList(res2.data.data);
					})
			})
	}, []);
	const handleSearch = () => {
		if (search) {
			navigate(`/result/${search}`)
		}
	}
	const handleViewMangaDetails = (_id, mangaid) => {
		setSearch("")
		navigate(`/bookDetail/${_id}/${mangaid}`)
	}
	const handleViewNovelDetails = (novelid) => {
		setSearch("")
		navigate(`/novel/${novelid}`)
	}
	return (
		<>
			{/* containter-header */}
			<div className='grid grid-cols-8 grid-rows-2 h-30 bg-[#FBFFE4] md:border-b-5 md:border-[#095533]'>
				{/* containter-header-logo */}
				<div className='col-start-1 col-end-5 row-start-1 md:col-end-3 md:row-span-2 flex justify-start'>
					<Link to={"/"} className='inline-block h-full w-full'>
						<img className="h-full" src={logo} alt='logo' />
					</Link>
				</div>
				{/* container-header-main */}
				<div className='grid grid-cols-7 col-start-1 bg-[#095533] md:bg-[#FBFFE4] col-end-9 row-start-2 md:col-start-3 md:col-end-7 md:row-start-1 md:row-span-2 md:grid-rows-2 md:grid-cols-1  '>
					{/* container-header-navigation */}
					<div className='col-span-3 '>
						<div className='grid grid-cols-6 md:rounded-b-lg h-full bg-[#095533]'>
							<button className='md:hidden text-lg text-white cursor-pointer' onClick={() => setIsOpen(!isOpen)}>=
								<menu className={`absolute flex-col flex border-1 text-black bg-[#FBFFE4] w-1/3 items-start pl-2 ${toggleMenu} z-100`}>
									<NavLink className='hover:underline hover:underline-offset-6' to="/">Thể loại</NavLink>
									<NavLink className='hover:underline hover:underline-offset-6' to="/manga">Truyện tranh</NavLink>
									<NavLink className='hover:underline hover:underline-offset-6' to="/novel">Truyện chữ</NavLink>
									<NavLink className='hover:underline hover:underline-offset-6' to="/">Khác</NavLink>
								</menu>
							</button>
							<p className=' col-span-5 flex justify-start items-center pl-1 md:hidden text-white font-semibold'>Trang chủ</p>
							<ul className=' justify-around hidden md:grid md:col-span-7 md:grid-cols-5 '>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/">Trang chủ</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/">Thể loại</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/manga">Truyện tranh</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/novel">Truyện chữ</NavLink></li>
								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/">Khác</NavLink></li>
							</ul>
						</div>

					</div>
					{/* container-header-serchbox */}
					<div className='col-span-4 flex justify-center items-center p-1 pr-2 md:bg-[#FBFFE4]'>
						<input
							className=' border-2 border-[#095533] h-3/4 w-full p-1 bg-white rounded-lg' placeholder='Bạn muốn tìm truyện gì' value={search}
							onChange={(e) => setSearch(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleSearch()}

							onFocus={() => setToggleAdvancedSearch(true)}
							
							
						/>
					</div>
				</div>
				{/* Authentication Section */}
				<div className="col-start-5 col-end-9 row-start-1 md:row-span-2 md:col-start-7 grid grid-cols-1 items-center md:pl-5 md:pr-5 pl-1 pr-1 w-full">
					{user ? (
						<div className="relative w-full">
							<div
								className="flex items-center gap-3 w-full hover:text-[#095533] cursor-pointer"
								onClick={() => setIsOpenProfile(!isOpenProfile)}
							>
								<img src={user.avatar?.url || DefaultAvt} alt="avatar" className="w-12 h-12 rounded-full" />
								<span className="font-semibold truncate max-w-[100px] overflow-hidden whitespace-nowrap">
									{user.username}
								</span>
							</div>

							{/* Dropdown below */}
							{isOpenProfile && (
								<div
									className={`absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
								>
									<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
										<div className="font-medium">User</div>
										<div className="truncate">{user.email}</div>
									</div>
									<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
										<li>
											<NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Hồ sơ của tôi
											</NavLink>
										</li>
										<li>
											<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Cài đặt
											</a>
										</li>
										<li>
											<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
												Earnings
											</a>
										</li>
									</ul>
									<div className="py-2">
										<div
											className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
											onClick={handleLogout}
										>
											Đăng xuất
										</div>
									</div>
								</div>
							)}
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
						<div className='flex w-[100%]'>
							<div className='flex-1'>
								<p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>MANGA</p>
							</div>
							<div className='flex-1'>
								<p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>NOVEL</p>
							</div>
						</div>
						<div className="relative flex">
							{/* Manga searched result */}
							<div className='flex-3 pb-18 border overflow-y-auto h-100'>
								{search && listManga?.length !== 0 && listManga.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) === true || x.synopsis.toLowerCase().includes(search.toLowerCase())).map((manga, index) => (
									<div className='flex md:flex-row flex-col p-5 border-b' key={manga._id}>
										<div className='flex-1'>
											<img src={manga?.bookImg?.url} alt="" className='w-30 m-auto' loading='lazy' />
										</div>
										<div className='flex-1'>
											<p onClick={() => handleViewMangaDetails(manga._id, manga.mangaid)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{manga.title}</p>

										</div>
									</div>
								))}
							</div>
							{/* Novel searched result */}
							<div className='flex-3 pb-18 border overflow-y-auto h-100'>
								{search && novelList?.length !== 0 && novelList.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) === true || x.synopsis.toLowerCase().includes(search.toLowerCase())).map((novel, index) => (
									<div className='flex md:flex-row flex-col p-5 border-b' key={novel._id}>
										<div className='flex-1'>
											<img src={novel?.bookImg?.url} alt="" className='w-30 m-auto' loading='lazy' />
										</div>
										<div className='flex-4'>
											<p onClick={() => handleViewNovelDetails(novel._id)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{novel.title}</p>

										</div>
									</div>
								))}
							</div>
						</div>
						
					</div>
				)
			}

			{toggleAdvancedSearch ? <AdvancedSearch setOpen ={setToggleAdvancedSearch}/> : (<></>)}
		</>
	);
}

export default Header;
