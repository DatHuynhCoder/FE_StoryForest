// import React, { useState, useEffect } from 'react';
// import logo from "../../assets/logo.png";
// import { NavLink, Link, useNavigate } from 'react-router';
// import DefaultAvt from "../../assets/default_avatar.jpg";

// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { api } from '../../services/api';
// import { logout } from '../../redux/userSlice';
// import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
// import Tags from '../Tags/Tags';
// import AiIcon from '../../assets/AiIcon.png'

// // cookie
// import { useCookies } from 'react-cookie';

// function Header() {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const [cookie, setCookie, removeCookie] = useCookies(["theme", "intensity"])

// 	//get user from redux
// 	const user = useSelector((state) => state.user.user);



// 	const [search, setSearch] = useState("")

// 	const [isOpen, setIsOpen] = useState(false);
// 	const [isOpenProfile, setIsOpenProfile] = useState(false);

// 	const toggleMenu = isOpen ? "" : "hidden";
// 	const toggleProfile = isOpenProfile ? "" : "hidden";

// 	const [toggle, setToggle] = useState(false)
// 	const [type, setType] = useState('')
// 	const [page, setPage] = useState('Trang chủ')
// 	const [synopsis, setSynopsis] = useState('')
// 	const [togggleSynopsis, setTogggleSynopsis] = useState(false)
// 	const [focusSearch, setFocusSearch] = useState(false)
// 	const [focusResult, setFocusResult] = useState(false)

// 	const handleLogout = async () => {
// 		try {
// 			const response = await api.post("/api/reader/account/logout");
// 			if (response.data.success) {
// 				dispatch(logout());
// 				removeCookie("theme")
// 				removeCookie("intensity")
// 				navigate("/login")
// 			}
// 		} catch (error) {
// 			toast.error("An error occur during logout:", error);
// 		}
// 	}
// 	// const [listManga, setListManga] = useState([
// 	// 	{
// 	// 		artist: ['REDICE Studio (레드아이스 스튜디오)', 'Jang Sung-Rak (장성락)'],
// 	// 		author: ['h-goon (현군)', 'Chugong (추공)', 'Gi So-Ryeong (기소령)'],
// 	// 		bookImg: {
// 	// 			url: 'https://res.cloudinary.com/dvtcbryg5/image/upload/…4423218/StoryForest/Book/mzbhrc52tmszzqnsdusq.jpg',
// 	// 			public_id: 'StoryForest/Book/mzbhrc52tmszzqnsdusq'
// 	// 		},
// 	// 		cover_url: "https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg",
// 	// 		followers: 0,
// 	// 		mangaid: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
// 	// 		rate: 5,
// 	// 		status: "completed",
// 	// 		synopsis: "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as “Hunters”. However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to risk his life in the lowliest of dungeons, the “World’s Weakest”. Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\n\n---\n**Links:**\n\n- Official English Translation [<Pocket Comics>](https://www.pocketcomics.com/comic/320) | [<WebNovel>](https://www.webnovel.com/comic/only-i-level-up-(solo-leveling)_15227640605485101) | [<Tapas>](https://tapas.io/series/solo-leveling-comic/info)\n- Alternate Official Raw - [Kakao Webtoon](https://webtoon.kakao.com/content/나-혼자만-레벨업/2320)",
// 	// 		tags: ['Award Winning', 'Monsters', 'Action', 'Long Strip', 'Adventure', 'Magic', 'Drama', 'Fantasy', 'Web Comic', 'Supernatural', 'Adaptation', 'Full Color'],
// 	// 		title: "Solo Leveling",
// 	// 		type: "manga",
// 	// 		updatedAt: "2025-04-12T02:00:00.436Z",
// 	// 		views: 238,
// 	// 		_id: "67f298a0c0aa3501386b7afb"
// 	// 	}
// 	// ])
// 	const [listManga, setListManga] = useState([])
// 	const [novelList, setNovelList] = useState([{
// 		artist: [],
// 		author: 'R.C. Joshua',
// 		bookImg: {
// 			url: "https://res.cloudinary.com/dvtcbryg5/image/upload/v1744423828/StoryFor…",
// 			public_id: "StoryForest/Book/fg3883opownhiuid4hyn"
// 		},
// 		cover_url: 'https://www.royalroadcdn.com/public/covers-large/infinite-farmer-cultivating-the-infinite-dungeon-112376.jpg?time=1731726233',
// 		followers: 0,
// 		mangaid: '',
// 		rate: 4,
// 		status: 'Original',
// 		synopsis: 'Betrayed. Alone. Forced to survive the deadliest dungeon in the universe. As aFarmer.Tulland dreamed of adventure.To be someone who sees every-place, goes every-where, and does every-thing.All he wanted was to go beyond the confines of his tiny island. So, when the Church denied him a class, he turned to the only other being that could grant him his wish; The System.And the System delivered. Tulland gotaClass, but not one he ever wished for. Awakening as a Farmer, he finds himself in the one place where he can grow away from the clutches of the Church — The Infinite; a dungeon whose end even heroes of old have never seen. Armed with what dregs of power the System deigned to give him, Tulland will have to figure out how to survive, and cultivate, the universe’s deadliest dungeon.Expect:+ Progression fantasy with actual farming!+ A very stubborn MC+ Combat! Action! Plants!Schedule:+ Daily (7 chapters per week) (more while we’re starting out)+ Book 1 completely written!',
// 		tags: ['LitRPG', 'Portal Fantasy / Isekai', 'Dungeon', 'Post Apocalyptic', 'Strategy', 'Action', 'Adventure', 'Fantasy', 'GameLit', 'High Fantasy', 'Magic', 'Male Lead', 'Progression'],
// 		title: 'Infinite Farmer: A Plants vs Dungeon LitRPG',
// 		type: 'novel',
// 		updatedAt: "2025-04-12T02:00:00.436Z",
// 		views: 238,
// 		_id: '67eabb616f25807d87d7ad10'
// 	}])
// 	useEffect(() => {
// 		api.get('/api/manga')
// 			.then((res) => {
// 				setListManga(res.data.data);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			}).finally(() => {
// 				api.get('/api/novel')
// 					.then(res2 => {
// 						// setNovelList(res2.data.data);
// 				setListManga(prev => [...prev, ...res2.data.data]);
// 				// console.log(listManga)
// 					})
// 			})
// 	}, [type]);
// 	const handleSearch = () => {
// 		if (search) {
// 			navigate(`/result/${search}`)
// 		}
// 	}
// 	const handleViewMangaDetails = (mangaid) => {
// 		setSearch("")
// 		setFocusSearch(true)
// 		// navigate(`/bookDetail/${_id}/${mangaid}`)
// 		navigate(`/manga/${mangaid}`)
// 	}
// 	const handleViewNovelDetails = (novelid) => {
// 		setSearch("")
// 		navigate(`/novel/${novelid}`)
// 	}
// 	return (
// 		<>
// 			{/* containter-header */}
// 			<div className='grid grid-cols-8 grid-rows-2 h-auto md:h-auto bg-[#FBFFE4] md:border-b-5 md:border-[#095533]'>
// 				{/* containter-header-logo */}
// 				<div className='col-start-1 col-end-5 row-start-1 md:col-end-3 md:row-span-2 flex justify-start'>
// 					<Link to={"/"} className='inline-block h-full w-full'>
// 						<img className="w-full md:h-30 md:pr-5 object-cover" src={logo} alt='logo' />
// 					</Link>
// 				</div>
// 				{/* container-header-main */}
// 				<div className='grid grid-cols-3 col-start-1 bg-[#095533] md:bg-[#FBFFE4] col-end-9 row-start-2 md:col-start-3 md:col-end-7 md:row-start-1 md:row-span-2 md:grid-rows-2 md:grid-cols-1  '>
// 					{/* container-header-navigation */}
// 					<div className='col-span-3 '>
// 						<div className='grid grid-cols-6 md:rounded-b-lg h-full bg-[#095533]'>
// 							<button className='md:hidden text-lg text-white cursor-pointer' onClick={() => setIsOpen(!isOpen)}>=
// 								<menu className={`absolute flex-col flex border-1 text-black bg-[#FBFFE4] w-1/3 items-start pl-2 ${toggleMenu} z-100`}>
// 									{/* <NavLink className='hover:underline hover:underline-offset-6' to="/advanced-search">Thể loại</NavLink> */}
// 									<NavLink className='hover:underline hover:underline-offset-6' to="/" onClick={()=>{setPage('Trang chủ'), setType('')}} style={page == 'Trang chủ' ? {textDecoration:'underline'}:{}}>Trang chủ</NavLink>
// 									<NavLink className='hover:underline hover:underline-offset-6' to="/manga" onClick={()=>{setPage('Truyện tranh'), setType('manga'), setToggle(false)}} style={page == 'Truyện tranh' ? {textDecoration:'underline'}:{}}>Truyện tranh</NavLink>
// 									<NavLink className='hover:underline hover:underline-offset-6' to="/novel" onClick={()=>{setPage('Truyện chữ'), setType('novel'), setToggle(false)}} style={page == 'Truyện chữ' ? {textDecoration:'underline'}:{}}>Truyện chữ</NavLink>
				
// 								</menu>
// 							</button>
// 							<p className=' col-span-5 flex justify-start items-center pl-1 md:hidden text-white font-semibold'>{page}</p>
// 							<ul className=' justify-around hidden md:grid md:col-span-7 md:grid-cols-3 '>
// 								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/" onClick={()=>setType('')}>Trang chủ</NavLink></li>
// 								{/* <li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/advanced-search">Thể loại</NavLink></li> */}
// 								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/manga" onClick={()=>{setType('manga'), setToggle(false)}}>Truyện tranh</NavLink></li>
// 								<li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/novel" onClick={()=>{setType('novel'), setToggle(false)}}>Truyện chữ</NavLink></li>
// 								{/* <li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><NavLink to="/">Khác</NavLink></li> */}
// 							</ul>
// 						</div>

// 					</div>
// 					{/* container-header-serchbox */}
// 					<div className='col-span-4 flex justify-center items-center md:bg-[#FBFFE4] m-1 ' >
// 						<input
// 							className=' border-2 border-[#095533] w-full p-1 bg-white rounded-lg mr-2' placeholder='Bạn muốn tìm truyện gì' value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 							onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
// 							style={{zIndex: 3}}
// 							onFocus={() => setFocusSearch(true)}
// 							onBlur={()=> setFocusSearch(false)}
							
							
// 						/>
// 						<img src={AiIcon} width={40} onClick={()=>setTogggleSynopsis(!togggleSynopsis)}/>
// 									{
// 				(search && (focusSearch || focusResult)) && (
// <>
// 	<div className="w-[100%] md:w-[90%] absolute px-4 md:px-5 md:py-5 m-auto" style={{ zIndex: 999, backgroundColor: 'white', top: '110px', borderRadius:20, paddingRight: 20 }} onMouseEnter={()=>(setFocusResult(true))} onMouseLeave={()=>setFocusResult(false)}>
// 						{/* <div className='flex w-[100%]'>
// 							<div className='flex-1'>
// 								<p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>MANGA</p>
// 							</div>
// 							<div className='flex-1'>
// 								<p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>NOVEL</p>
// 							</div>
// 						</div> */}
// 						<div className="relative flex">
// 							{/* Manga searched result */}
// 							{/* <div className='flex pb-18 border-3 overflow-y-auto h-100 w-full flex-col'>
// 								{search && listManga?.length !== 0 && listManga.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) === true || x.synopsis.toLowerCase().includes(search.toLowerCase())).map((manga, index) => (
// 									<div className='flex md:flex-row flex-col p-5 border-10 w-full' key={manga._id}>
// 										<div className='flex-1'>
// 											<img src={manga?.bookImg?.url} alt="" className='w-30 m-auto' loading='lazy' />
// 										</div>
// 										<div className='flex-1'>
// 											<p onClick={() => handleViewMangaDetails(manga._id, manga.mangaid)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{manga.title}</p>

// 										</div>
// 									</div>
// 								))}
// 							</div> */}
// 							 <div className='flex-3 pb-18' style={{height:'70vh', overflow:'auto'}}>
//             {listManga.length !== 0 ? listManga.map((manga, index) => (
//               <div className='flex md:flex-row flex-col p-5 border-b' key={index}>
//                 <div className='flex-1'>
//                   <img src={manga.bookImg?.url} alt="" className='w-30 m-auto' loading='lazy' />
//                 </div>
//                 <div className='flex-4'>
//                   <p onClick={() => handleViewMangaDetails(manga._id)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{manga.title}</p>
//                   <div className='flex'>
//                     <div className='flex flex-col flex-2'>
//                       {manga.tags?.slice(1, 5).map((tag, index) => (
//                         <div className='m-1 bg-white' key={index}>
//                           <span className='border rounded-md text-xs md:text-[10px] font-black p-1'>
//                             {tag}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                     <div className='flex-2'>
//                       <p className='text-right'><span className='font-[1000]'>{manga.followers} </span><b>FOLLOWERS</b></p>
//                       <p className='text-right'><span className='font-[1000]'>{manga.views} </span><b>VIEWS</b></p>
//                       <p className='text-right'><b>RATE:</b><span className='font-[1000]'> {manga.rate}</span></p>
// 											<p className='text-right'><b></b><span className='font-[1000]'> {manga.type?.toUpperCase()}</span></p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//               :
//               <div className='flex md:flex-row flex-col p-5 border-b'>
//                 <div className='flex-1'>
//                   <div className='w-30 m-auto'></div>
//                 </div>
//                 <div className='flex-4'>
//                   <p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>Nothing to show</p>
//                   <div className='flex'>
//                     <div className='flex flex-col flex-2'>

//                     </div>
//                     <div className='flex-2'>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             }
//           </div>
// 							{/* Novel searched result */}
// 							{/* <div className='flex-3 pb-18 border overflow-y-auto h-100'>
// 								{search && novelList?.length !== 0 && novelList.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) === true || x.synopsis.toLowerCase().includes(search.toLowerCase())).map((novel, index) => (
// 									<div className='flex md:flex-row flex-col p-5 border-b' key={novel._id}>
// 										<div className='flex-1'>
// 											<img src={novel?.bookImg?.url} alt="" className='w-30 m-auto' loading='lazy' />
// 										</div>
// 										<div className='flex-4'>
// 											<p onClick={() => handleViewNovelDetails(novel._id)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{novel.title}</p>

// 										</div>
// 									</div>
// 								))}
// 							</div> */}
// 						</div>

// 					</div> 
// 					<div style={{width: '100vw', height:'100vh', backgroundColor:'rgba(9,85,51,0.3)', position:'fixed', top: 0, zIndex: 2}}></div>
// 					</>
				
// 				)
// 			}
// 					</div>
// 					<div className='col-span-4 flex-column justify-center items-center md:bg-[#FBFFE4] m-1 hidden' style={togggleSynopsis?{display:'block'} : {}}>	
// 						<label style={{fontWeight:'bold'}} className='text-white md:text-black'>
// 						Synopsis:</label>
// 							<textarea
// 							className=' border-2 border-[#095533] w-full bg-white rounded-lg mr-2 p-1' placeholder='Bạn muốn tìm truyện gì' value={synopsis} style={{resize:'none'}}
// 							onChange={(e) => setSynopsis(e.target.value)}
// 							onKeyDown={(e) => e.key === 'Enter' && navigate(`/advanced-search/${synopsis}`)}

// 							// onFocus={() => setToggle(true)}
							
							
// 						/>
// 						<div style={{display:'flex', justifyContent:'flex-end', }} onClick={() => navigate(`/advanced-search/${synopsis}`)}>
// 						<button style={{justifySelf:'flex-end', width:'30%', backgroundImage: 'linear-gradient(to right, #d9ff00, #38e397)', borderRadius:20}} className="active:brightness-75">Search</button>
// 						</div>
						
					
// 						</div>
						
// 				</div>
// 				{/* Authentication Section */}
// 				<div className="col-start-5 col-end-9 row-start-1 md:row-span-2 md:col-start-7 grid grid-cols-1 items-center md:pl-5 md:pr-5 pl-1 pr-1 w-full">
// 					{user ? (
// 						<div className="relative w-full" onClick={() => setIsOpenProfile(!isOpenProfile)}>
// 							<div className="flex items-center gap-3 w-full hover:text-[#095533] cursor-pointer">
// 								<img src={user.avatar?.url || DefaultAvt} alt="avatar" className="w-12 h-12 rounded-full" />
// 								<div className='flex flex-col'>
// 									<span className="font-semibold truncate max-w-[100px] overflow-hidden whitespace-nowrap">
// 										{user.username}
// 									</span>
// 									<div className='font-light text-sm truncate max-w-[150px] overflow-hidden'>Lv {user.level} - {user.rank}</div>
// 								</div>
// 							</div>

// 							{/* Dropdown below */}
// 							<div
// 								className={`absolute ${toggleProfile} top-full mt-2 z-100 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
// 							>
// 								<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
// 									<div className="font-medium">User</div>
// 									<div className="truncate">{user.email}</div>
// 								</div>
// 								<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
// 									<li>
// 										<NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
// 											Hồ sơ của tôi
// 										</NavLink>
// 									</li>
// 									<li>
// 										<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
// 											Cài đặt
// 										</a>
// 									</li>
// 									<li>
// 										<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
// 											Earnings
// 										</a>
// 									</li>
// 								</ul>
// 								<div className="py-2">
// 									<div
// 										className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
// 										onClick={handleLogout}
// 									>
// 										Đăng xuất
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					) : (
// 						<div className="flex gap-2 justify-center">
// 							<button className="text-sm h-1/2 md:h-2/5 bg-[#095533] text-white rounded-md font-semibold hover:bg-[#1F7D53] px-5 py-2">
// 								<Link to="/signup">Đăng ký</Link>
// 							</button>
// 							<button className="text-sm h-1/2 md:h-2/5 bg-[#095533] text-white rounded-md font-semibold hover:bg-[#1F7D53] px-5 py-2">
// 								<Link to="/login">Đăng nhập</Link>
// 							</button>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 			{/* {
// 				search && (

// 					<div className="w-[100%] md:w-[90%] absolute px-4 md:px-0 m-auto" style={{ zIndex: 999, backgroundColor: '#4caf50', border: '1px solid'}}>
// 						<div className='flex w-[100%]'>
// 							<div className='flex-1'>
// 								<p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>MANGA</p>
// 							</div>
// 							<div className='flex-1'>
// 								<p className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>NOVEL</p>
// 							</div>
// 						</div>
// 						<div className="relative flex"> */}
// 							{/* Manga searched result */}
// 							{/* <div className='flex-3 pb-18 border overflow-y-auto h-100'>
// 								<div></div>
// 								{search && listManga?.length !== 0 && listManga.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) === true || x.synopsis.toLowerCase().includes(search.toLowerCase())).map((manga, index) => (
// 									<div className='flex md:flex-row flex-col p-5 border-b' key={manga._id}>
// 										<div className='flex-1'>
// 											<img src={manga?.bookImg?.url} alt="" className='w-30 m-auto' loading='lazy' />
// 										</div>
// 										<div className='flex-1'>
// 											<p onClick={() => handleViewMangaDetails(manga._id, manga.mangaid)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{manga.title}</p>

// 										</div>
// 									</div>
// 								))}
// 							</div> */}
// 							{/* Novel searched result */}
// 							{/* <div className='flex-3 pb-18 border overflow-y-auto h-100'>
// 								{search && novelList?.length !== 0 && novelList.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) === true || x.synopsis.toLowerCase().includes(search.toLowerCase())).map((novel, index) => (
// 									<div className='flex md:flex-row flex-col p-5 border-b' key={novel._id}>
// 										<div className='flex-1'>
// 											<img src={novel?.bookImg?.url} alt="" className='w-30 m-auto' loading='lazy' />
// 										</div>
// 										<div className='flex-4'>
// 											<p onClick={() => handleViewNovelDetails(novel._id)} className='text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer'>{novel.title}</p>

// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						</div>

// 					</div>
// 				)
// 			} */}


// 			{type == '' ? (<></>) : (<Tags type={type} setToggle={setToggle} toggle = {toggle}/>)}
// 		</>
// 	);
// }

// export default Header;

import styles from './Header.module.css';
import logo from "../../assets/logo.png";
import { IoSearch } from 'react-icons/io5';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import DefaultAvt from "../../assets/default_avatar.jpg";

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { logout } from '../../redux/userSlice';

// // cookie
import { useCookies } from 'react-cookie';
import Tags from '../Tags/Tags';
const Header = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [cookie, setCookie, removeCookie] = useCookies(["theme", "intensity"])

	//get user from redux
	const user = useSelector((state) => state.user.user);



	const [search, setSearch] = useState("")

	const [isOpen, setIsOpen] = useState(false);
	const [isOpenProfile, setIsOpenProfile] = useState(false);
	const toggleProfile = isOpenProfile ? "" : "hidden";

	const [toggleMenu, setToggleMenu] = useState(false)
	const [type, setType] = useState('')
  const [typeResult, setTypeResult] = useState('all')
	const [page, setPage] = useState('Home')
	const [toggle, setToggle] = useState(false)

	const handleLogout = async () => {
		try {
			const response = await api.post("/api/reader/account/logout");
			if (response.data.success) {
				dispatch(logout());
				removeCookie("theme")
				removeCookie("intensity")
				navigate("/login")
			}
		} catch (error) {
			toast.error("An error occur during logout:", error);
		}
	}

	const [listResult, setListResult] = useState([])
  

	useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaRes = await api.get("/api/manga");
        const novelRes = await api.get("/api/novel");

        const combinedResults = [...mangaRes.data.data, ...novelRes.data.data];
        let results = [];

        if (typeResult != "all") {
          results = combinedResults.filter((item) => item.type == typeResult);
        } else {
          results = combinedResults;
        }
        console.log(results);
        setListResult(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [typeResult]);

	const handleSearch = () => {
		if (search) {
			navigate(`/result/${search}`)
		}
	}
	const handleViewMangaDetails = (mangaid) => {
		setSearch("")
		setFocusSearch(true)
		// navigate(`/bookDetail/${_id}/${mangaid}`)
		navigate(`/manga/${mangaid}`)
	}
	const handleViewNovelDetails = (novelid) => {
		setSearch("")
		navigate(`/novel/${novelid}`)
	}
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img className={styles.logoImage} src={logo} alt="logo" />
        </div>

        <>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputContainer}>
              <div className={styles.searchBox}>
                <input
                  inputMode="text"
                  className={styles.searchInput}
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <IoSearch size={20} />
                {search && (
                  <>
                    {" "}
                    <div className={styles.searchResults}>
                      <div className={styles.radioGroup}>
                        <p className={styles.radioLabel}>Type:</p>
                        <div className={styles.radioOption}>
                          <input
                            type="radio"
                            value={"all"}
                            name="typeResult"
                            checked={typeResult == "all"}
                            onChange={(e) => {
                              setTypeResult(e.target.value);
                            }}
                          />
                          <p>All</p>
                        </div>
                        <div className={styles.radioOption}>
                          <input
                            type="radio"
                            value={"manga"}
                            name="typeResult"
                            checked={typeResult == "manga"}
                            onChange={(e) => {
                              setTypeResult(e.target.value);
                            }}
                          />
                          <p>Manga</p>
                        </div>
                        <div className={styles.radioOption}>
                          <input
                            type="radio"
                            value={"novel"}
                            name="typeResult"
                            onChange={(e) => {
                              setTypeResult(e.target.value);
                            }}
                            checked={typeResult == "novel"}
                          />
                          <p>Novel</p>
                        </div>
                      </div>
                      {listResult.length !== 0 ? (
                        listResult.map((manga, index) => (
                          <div
                            className="flex md:flex-row flex-col p-5 border-b"
                            key={index}
                          >
                            <div className="flex-1">
                              <img
                                src={manga.bookImg?.url}
                                alt=""
                                className="w-30 m-auto"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-4">
                              <p
                                onClick={() =>
                                  handleViewMangaDetails(manga._id)
                                }
                                className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer"
                              >
                                {manga.title}
                              </p>
                              <div className="flex">
                                <div className="flex flex-col flex-2">
                                  {manga.tags?.slice(1, 5).map((tag, index) => (
                                    <div className="m-1 bg-white" key={index}>
                                      <span className="border rounded-md text-xs md:text-[10px] font-black p-1">
                                        {tag}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex-2">
                                  <p className="text-right">
                                    <span className="font-[1000]">
                                      {manga.followers}{" "}
                                    </span>
                                    <b>FOLLOWERS</b>
                                  </p>
                                  <p className="text-right">
                                    <span className="font-[1000]">
                                      {manga.views}{" "}
                                    </span>
                                    <b>VIEWS</b>
                                  </p>
                                  <p className="text-right">
                                    <b>RATE:</b>
                                    <span className="font-[1000]">
                                      {" "}
                                      {manga.rate}
                                    </span>
                                  </p>
                                  <p className="text-right">
                                    <b></b>
                                    <span className="font-[1000]">
                                      {" "}
                                      {manga.type?.toUpperCase()}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex md:flex-row flex-col p-5 border-b">
                          <div className="flex-1">
                            <div className="w-30 m-auto"></div>
                          </div>
                          <div className="flex-4">
                            <p className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer">
                              Nothing to show
                            </p>
                            <div className="flex">
                              <div className="flex flex-col flex-2"></div>
                              <div className="flex-2"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>

        <></>

        <div className={styles.authContainer}>
          {user ? (
            <>
              <div
                className="relative w-full h-full"
                onClick={() => setIsOpenProfile(!isOpenProfile)}
             
              >
                <div className="flex items-center gap-3 w-full text-[#c5e1a5] hover:text-white cursor-pointer h-full" >
                  <img
                    src={user.avatar?.url || DefaultAvt}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold truncate max-w-[100px] overflow-hidden whitespace-nowrap">
                      {user.username}
                    </span>
                    <div className="font-light text-sm truncate max-w-[150px] overflow-hidden">
                      Lv {user.level} - {user.rank}
                    </div>
                  </div>
                </div>

                {/* Dropdown below */}
                <div
                  className={`absolute ${toggleProfile} top-full mt-2 z-100 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">User</div>
                    <div className="truncate">{user.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Hồ sơ của tôi
                      </NavLink>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Cài đặt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
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
              </div>
              
            </>
          ) : (
            <>
              <div className={styles.authButtons}>
                <NavLink to="/signup" className={styles.authButton}>
                  <p className={styles.authButtonText}>Login</p>
                </NavLink>
                <NavLink to="/login" className={styles.authButton}>
                  <p className={styles.authButtonText}>Sign up</p>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.navContainer}>
        <div className={styles.navMd}>
          <NavLink
            className={styles.navItem}
            to="/"
            style={({ isActive }) =>
              isActive ? { backgroundColor: "#66bb6a" } : {}
            }
            onClick={() => {
              setType(""), setToggle(false);
            }}
          >
            <p className={styles.navText}>Home</p>
          </NavLink>
          <NavLink
            className={styles.navItem}
            to="/manga"
            style={({ isActive }) =>
              isActive ? { backgroundColor: "#66bb6a" } : {}
            }
            onClick={() => {
              setType("manga"), setToggle(false);
            }}
          >
            <p className={styles.navText}>Manga</p>
          </NavLink>
          <NavLink
            className={styles.navItem}
            to="/novel"
            style={({ isActive }) =>
              isActive ? { backgroundColor: "#66bb6a" } : {}
            }
            onClick={() => {
              setType("novel"), setToggle(false);
            }}
          >
            <p className={styles.navText}>Novel</p>
          </NavLink>
          <NavLink
            className={styles.navItem}
            to="/advanced-search"
            style={({ isActive }) =>
              isActive ? { backgroundColor: "#66bb6a" } : {}
            }
            onClick={() => {
              setType(""), setToggle(false);
            }}
          >
            <p className={styles.navText}>Advanced Search</p>
          </NavLink>
        </div>

        <>
          <div className={styles.mobileSearchContainer}>
            <div className={styles.searchBox}>
              <input
                inputMode="text"
                className={styles.searchInput}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <IoSearch size={20} />
              {search && (
                <>
                  {" "}
                  <div className={styles.searchResults}>
                    <div className={styles.radioGroup}>
                      <p className={styles.radioLabel}>Type:</p>
                      <div className={styles.radioOption}>
                        <input
                          type="radio"
                          value={"manga"}
                          name="typeResultMobile"
                          checked={typeResult == "manga"}
                          onChange={(e) => {
                            setTypeResult(e.target.value);
                          }}
                        />
                        <p>Manga</p>
                      </div>
                      <div className={styles.radioOption}>
                        <input
                          type="radio"
                          value={"novel"}
                          name="typeResultMobile"
                          onChange={(e) => {
                            setTypeResult(e.target.value);
                          }}
                          checked={typeResult == "novel"}
                        />
                        <p>Novel</p>
                      </div>
                    </div>
                    {listResult.length !== 0 ? (
                      listResult.map((manga, index) => (
                        <div
                          className="flex md:flex-row flex-col p-5 border-b"
                          key={index}
                        >
                          <div className="flex-1">
                            <img
                              src={manga.bookImg?.url}
                              alt=""
                              className="w-30 m-auto"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-4">
                            <p
                              onClick={() => handleViewMangaDetails(manga._id)}
                              className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer"
                            >
                              {manga.title}
                            </p>
                            <div className="flex">
                              <div className="flex flex-col flex-2">
                                {manga.tags?.slice(1, 5).map((tag, index) => (
                                  <div className="m-1 bg-white" key={index}>
                                    <span className="border rounded-md text-xs md:text-[10px] font-black p-1">
                                      {tag}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex-2">
                                <p className="text-right">
                                  <span className="font-[1000]">
                                    {manga.followers}{" "}
                                  </span>
                                  <b>FOLLOWERS</b>
                                </p>
                                <p className="text-right">
                                  <span className="font-[1000]">
                                    {manga.views}{" "}
                                  </span>
                                  <b>VIEWS</b>
                                </p>
                                <p className="text-right">
                                  <b>RATE:</b>
                                  <span className="font-[1000]">
                                    {" "}
                                    {manga.rate}
                                  </span>
                                </p>
                                <p className="text-right">
                                  <b></b>
                                  <span className="font-[1000]">
                                    {" "}
                                    {manga.type?.toUpperCase()}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex md:flex-row flex-col p-5 border-b">
                        <div className="flex-1">
                          <div className="w-30 m-auto"></div>
                        </div>
                        <div className="flex-4">
                          <p className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer">
                            Nothing to show
                          </p>
                          <div className="flex">
                            <div className="flex flex-col flex-2"></div>
                            <div className="flex-2"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className={styles.mobileMenuContainer}>
              <div>
                <p className={styles.navText}>{page}</p>
              </div>
              <HiOutlineMenuAlt3
                size={30}
                onClick={() => setToggleMenu((prev) => !prev)}
              />
              {toggleMenu ? (
                <div className={styles.mobileMenuDropdown}>
                  <NavLink
                    className={styles.navItem}
                    to="/"
                    style={({ isActive }) =>
                      isActive ? { backgroundColor: "#66bb6a" } : {}
                    }
                    onClick={() => setPage("Home")}
                  >
                    <p className={styles.navText}>Home</p>
                  </NavLink>
                  <NavLink
                    className={styles.navItem}
                    to="/manga"
                    style={({ isActive }) =>
                      isActive ? { backgroundColor: "#66bb6a" } : {}
                    }
                    onClick={() => {
                      setPage("Manga"), setType("manga"), setToggle(false);
                    }}
                  >
                    <p className={styles.navText}>Manga</p>
                  </NavLink>
                  <NavLink
                    className={styles.navItem}
                    to="/novel"
                    style={({ isActive }) =>
                      isActive ? { backgroundColor: "#66bb6a" } : {}
                    }
                    onClick={() => {
                      setPage("Novel");
                      setType("novel");
                      setToggle(false);
                    }}
                  >
                    <p className={styles.navText}>Novel</p>
                  </NavLink>
                  <NavLink
                    className={styles.navItem}
                    to="/advanced-search"
                    style={({ isActive }) =>
                      isActive ? { backgroundColor: "#66bb6a" } : {}
                    }
                    onClick={() => setPage("Advanced Search")}
                  >
                    <p className={styles.navText}>Advanced Search</p>
                  </NavLink>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      </div>
      {type == "" ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
