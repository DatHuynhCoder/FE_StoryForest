import React from 'react';
import "../HeaderNav/HeaderNav.css";
import logo from "../../assets/logo.png";

function HeaderNav() {
    return (
        <div>
            {/* Header chính */}
            <div className='container-header'>
                {/* Logo */}
                <div className='container-header-logo'>
                    <img className="header-logo" src={logo} alt='logo' />
                </div>

                {/* Phần giữa của header */}
                <div className='container-header-mid'>
                    {/* Thanh điều hướng */}
                    <div className='container-header-mid-navigation'>
                        <ul className='header-navigation'>
                            {/* Menu trên mobile */}
                            <li className='mobile'>
                                <div className='menu'>
                                    <p><span className='icon-menu'>☰</span>Trang chủ</p>
                                </div>
                                <div className='search-box-mobile'>
                                    <p>Bạn muốn tìm truyện gì</p>
                                </div>
                            </li>
                            
                            {/* Menu trên desktop */}
                            <li><a>Trang chủ</a></li>
                            <li><a>Truyện chữ</a></li>
                            <li><a>Truyện Audio</a></li>
                            <li><a>Thể loại</a></li>
                            <li><a>Khác</a></li>
                        </ul>
                    </div>
                    
                    {/* Ô tìm kiếm */}
                    <div className='container-header-mid-search-box'>
                        <div className='search-box'>
                            <p>Bạn muốn tìm truyện gì</p>
                        </div>
                    </div>
                </div>

                {/* Khu vực đăng nhập/đăng ký */}
                <div className='container-authentication'>
                    <div className='auth-button'>
                        <p>Đăng ký</p>
                    </div>
                    <div className='auth-button'>
                        <p>Đăng nhập</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderNav;
