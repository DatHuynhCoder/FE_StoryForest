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
import { useLocation } from "react-router-dom";

// // cookie
import { useCookies } from 'react-cookie';

const Header = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [cookie, setCookie, removeCookie] = useCookies(["theme", "intensity"])
  const [focusSearchBox, setFocusSearchBox] = useState(false)
   const [focusResults, setFocusResults] = useState(false)

     const [focusSearchBoxMb, setFocusSearchBoxMb] = useState(false)
   const [focusResultsMb, setFocusResultsMb] = useState(false)

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
         const res = await api.get(`/api/search/${search}`);
         const combinedResults = res.data.data
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
  }, [typeResult,search]);


 useEffect(() => {
  // Cập nhật page khi location thay đổi
  if (location.pathname === '/') {
    setPage('Home');
  } else if (location.pathname.startsWith('/manga')) {
    setPage('Manga');
  } else if (location.pathname.startsWith('/novel')) {
    setPage('Novel');
  } else if (location.pathname.startsWith('/advanced-search')) {
    setPage('Advanced Search');
  } else {
    setPage('Home'); // Hoặc giá trị mặc định khác
  }
}, [location.pathname]);

  const handleActive = (pageName) => {
    setPage(pageName);
    setToggleMenu(prev => !prev);
  };
	const handleSearch = () => {
		if (search!='') {
			navigate(`/advanced-search?type=all&genre=All&author=None&search=${search}`)
		}

    setSearch('')
	}
	const handleViewResultDetails = (type, id) => {
		setSearch("")
		setFocusSearchBox(true)
		// navigate(`/bookDetail/${_id}/${mangaid}`)
		navigate(`/${type}/${id}`)
	}

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img className={styles.logoImage} src={logo} alt="logo" onClick={()=>{navigate('/')}}/>
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
                  onFocus={()=>setFocusSearchBox(true)}
                  onBlur={()=>setFocusSearchBox(false)}
                />
                <IoSearch size={20} />
                {search && (focusSearchBox||focusResults) && (
                  <>
                    {" "}
                    <div className={styles.searchResults}  onMouseEnter={()=>setFocusResults(true)}
                  onMouseLeave={()=>setFocusResults(false)}>
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
                        listResult.map((result, index) => (
                          <div
                            className="flex md:flex-row flex-col p-5 border-b"
                            key={index}
                          >
                            <div className="flex-1">
                              <img
                                src={result.bookImg?.url}
                                alt=""
                                className="w-30 m-auto"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-4">
                              <p
                                onClick={() =>
                                  handleViewResultDetails(result.type, result._id)
                                }
                                className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer"
                              >
                                {result.title}
                              </p>
                              <div className="flex">
                                <div className="flex flex-col flex-2">
                                  {result.tags?.slice(1, 5).map((tag, index) => (
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
                                      {result.followers}{" "}
                                    </span>
                                    <b>FOLLOWERS</b>
                                  </p>
                                  <p className="text-right">
                                    <span className="font-[1000]">
                                      {result.views}{" "}
                                    </span>
                                    <b>VIEWS</b>
                                  </p>
                                  <p className="text-right">
                                    <b>RATE:</b>
                                    <span className="font-[1000]">
                                      {" "}
                                      {result.rate}
                                    </span>
                                  </p>
                                  <p className="text-right">
                                    <b></b>
                                    <span className="font-[1000]">
                                      {" "}
                                      {result.type?.toUpperCase()}
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
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
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
                     Log out
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
                onFocus={()=>setFocusSearchBoxMb(true)}
                 onBlur={()=>setFocusSearchBoxMb(false)}
              />
              <IoSearch size={20} />
              {search && (focusResultsMb || focusSearchBoxMb) && (
                <>
                  {" "}
                  <div className={styles.searchResults}
                   onMouseEnter={()=>setFocusResultsMb(true)}
                  onMouseLeave={()=>setFocusResultsMb(false)}
                 >
                    <div className={styles.radioGroup} >
                      <p className={styles.radioLabel}>Type:</p>
                       <div className={styles.radioOption}>
                          <input
                            type="radio"
                            value={"all"}
                            name="typeResultMobile"
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
                      listResult.map((result, index) => (
                        <div
                          className="flex md:flex-row flex-col p-5 border-b"
                          key={index}
                        >
                          <div className="flex-1">
                            <img
                              src={result.bookImg?.url}
                              alt=""
                              className="w-30 m-auto"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-4">
                            <p
                               onClick={() =>
                                  handleViewResultDetails(result.type, result._id)
                                }
                              className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer"
                            >
                              {result.title}
                            </p>
                            <div className="flex">
                              <div className="flex flex-col flex-2">
                                {result.tags?.slice(1, 5).map((tag, index) => (
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
                                    {result.followers}{" "}
                                  </span>
                                  <b>FOLLOWERS</b>
                                </p>
                                <p className="text-right">
                                  <span className="font-[1000]">
                                    {result.views}{" "}
                                  </span>
                                  <b>VIEWS</b>
                                </p>
                                <p className="text-right">
                                  <b>RATE:</b>
                                  <span className="font-[1000]">
                                    {" "}
                                    {result.rate}
                                  </span>
                                </p>
                                <p className="text-right">
                                  <b></b>
                                  <span className="font-[1000]">
                                    {" "}
                                    {result.type?.toUpperCase()}
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
                    onClick={() => {setPage("Home");setToggleMenu((prev) => !prev)}}
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
                      setPage("Manga"), setType("manga"), setToggleMenu((prev) => !prev);
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
                      setToggleMenu((prev) => !prev);
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
                   onClick={() => handleActive('Advanced Search')}
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

    </>
  );
};

export default Header;
