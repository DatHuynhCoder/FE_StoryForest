import "../Tag/Tag.css"; // Import file CSS cho component

const Tag = () => {
    return (
        <div className="container-filter-tag">
            {/* Khu vực chọn thể loại và sắp xếp */}
            <div className="container-filter-tag-select">
                {/* Chọn thể loại truyện */}
                <div className="container-select">
                    <label className="label" for="tag">Thể loại:</label>
                    <select id="tag" name="tag">
                        <option>Hài hước</option>
                        <option>Kinh dị</option>
                    </select>
                </div>

                {/* Chọn kiểu sắp xếp */}
                <div className="container-select">
                    <label className="label" for="sort">Sắp xếp:</label>
                    <select id="sort" name="sort">
                        <option>Thời gian cập nhật tăng dần</option>
                        <option>Thời gian cập nhật giảm dần</option>
                    </select>
                </div>
            </div>

            {/* Mô tả về bộ lọc */}
            <div className="container-filter-tag-description">
                <p className="tag-description">
                    It is a long established fact that a reader will be distracted by the readable 
                    content of a page when looking at its layout. The point of using Lorem Ipsum is 
                    that it has a more-or-less normal distribution of letters, as opposed to using 
                    'Content here, content here', making it look like readable English. Many desktop 
                    publishing packages and web page editors now use Lorem Ipsum as their default 
                    model text, and a search for 'lorem ipsum' will uncover many web sites still in 
                    their infancy. Various versions have evolved over the years, sometimes by 
                    accident, sometimes on purpose (injected humour and the like).
                </p>
            </div>
        </div>
    );
};

export default Tag; // Xuất component để sử dụng ở nơi khác
