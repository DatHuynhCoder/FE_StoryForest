import "../Author/Author.css"; // Import file CSS của component
import avatarAuthor from "../../../../assets/book.jpg"; // Import ảnh tác giả

const Author = () => {
    return (
        <div className="container-author">
            {/* Khu vực hiển thị ảnh đại diện và tên tác giả */}
            <div className="container-avartar-name-author">
                <img 
                    className="author-avatar" 
                    src={avatarAuthor} 
                    alt="Ảnh đại diện của tác giả"
                />
                <p className="author-name">Lorem Ipsum</p>
            </div>

            {/* Khu vực hiển thị mô tả về tác giả */}
            <div className="container-author-description">
                <p className="author-description">
                    It is a long established fact that a reader will be distracted by the readable 
                    content of a page when looking at its layout. The point of using Lorem Ipsum is that 
                    it has a more-or-less normal distribution of letters, as opposed to using 'Content 
                    here, content here', making it look like readable English. Many desktop publishing 
                    packages and web page editors now use Lorem Ipsum as their default model text, and a 
                    search for 'lorem ipsum' will uncover many web sites still in their infancy. Various 
                    versions have evolved over the years, sometimes by accident, sometimes on purpose 
                    (injected humour and the like).
                </p>
            </div>
        </div>
    );
};

export default Author; // Xuất component để sử dụng ở nơi khác
