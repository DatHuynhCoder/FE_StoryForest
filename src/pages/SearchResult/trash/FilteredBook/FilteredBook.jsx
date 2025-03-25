import React, { useState } from "react";
import "./FilteredBook.css";
import BookImage from "../../assets/book.jpg"
import IconRestul from "../../assets/icon-search-result.png"
import IconBackNext from "../../assets/back-next-icon.png"

const images = new Array(15).fill({
  src: BookImage, // Thay bằng link ảnh thực tế
  title: "Anh IT sinh năm 96...",
});

const FilteredBook = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số ảnh trên mỗi trang
  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
    <div className="container">
      <div className="filter-box">
        <div className="container-filter">
          <div className="filter-item">
            <label>Thể loại</label>
            <select>
              <option>Hài hước</option>
              <option>Kinh dị</option>
              <option>Hành động</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Sắp xếp</label>
            <select>
              <option>Thời gian đăng tăng dần</option>
              <option>Thời gian đăng giảm dần</option>
            </select>
          </div>
        </div>
        <div className="container-filter-description"> 
          <p className="filter-description">
          Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang...
        </p>
        </div>

      </div>
      <div className="container-title">
        <img className="container-title-icon" src={IconRestul} alt="icon" />
        <h2 className="container-title-h2">Kết quả tìm kiếm</h2>
      </div>

      <div className="grid">
        {images.map((item, index) => (
          <div
            key={index}
            className={`card ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleClick(index)}
          >
            <img src={item.src} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <img src={IconBackNext} className="back-next-icon back-icon" />
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <img src={IconBackNext} className="back-next-icon" />
      </div>
      </div>
      <div className="footer">

      </div>
    </div>
  );
};

export default FilteredBook;
