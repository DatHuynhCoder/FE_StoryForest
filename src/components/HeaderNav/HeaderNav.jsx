import React, { useState } from 'react';
import logo from "../../assets/logo.png";

function HeaderNav() {
    const [search, setSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = isOpen ? "" : "hidden"

    const handleSearch = () => {

        console.log(search)
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
                                    <a href="#">Thể loại</a>
                                    <a href="#">Truyện chữ</a>
                                    <a href="#">Truyện Audio</a>
                                    <a href="#">Khác</a>

                                </menu>
                            </button>
                            <p className=' col-span-5 flex justify-start items-center pl-1 md:hidden text-white font-semibold'>Trang chủ</p>
                            <ul className=' justify-around hidden md:grid md:col-span-7 md:grid-cols-5 '>
                                <li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><a>Trang chủ</a></li>
                                <li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><a>Thể loại</a></li>
                                <li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><a>Truyện chữ</a></li>
                                <li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><a>Truyện Audio</a></li>
                                <li className='flex justify-center items-center text-white font-semibold hover:bg-[#1F7D53] md:rounded-b-lg'><a>Khác</a></li>
                            </ul>
                        </div>

                    </div>
                    {/* container-header-serchbox */}
                    <div className='col-span-4 flex justify-center items-center p-1 pr-2 md:bg-[#FBFFE4]'>
                        <input className=' border-2 border-[#095533] h-3/4 w-full p-1 bg-white rounded-lg' placeholder='Bạn muốn tìm truyện gì' value={search}
                            onChange={(e) => setSearch(e.target.value)} />

                    </div>
                </div>
                {/* container-authentication */}
                <div className='col-start-5 col-end-9 row-start-1 md:row-span-2 md:col-start-7 grid grid-cols-2 gap-2 md:gap-5 items-center md:pl-5 md:pr-5 pl-1 pr-1'>
                    <button className='text-sm h-1/2 md:h-2/5 bg-[#095533] text-white rounded-md font-semibold hover:bg-[#1F7D53]'>Đăng ký</button>
                    <button className='text-sm h-1/2 md:h-2/5 bg-[#095533] text-white rounded-md font-semibold hover:bg-[#1F7D53]'>Đăng nhập</button>
                </div>



            </div>
        </>
    );
}

export default HeaderNav;
