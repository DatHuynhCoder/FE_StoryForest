// Import các asset (hình ảnh) và file CSS
import iconResult from "../../assets/iconResult.png";
import bookImage from "../../assets/book.jpg";
import "../SearchResult/ResultPage.css";
import arrowIcon from "../../assets/back-next-icon.png";

// Import các component con
import Author from "./Filter/Author/Author";
import Tag from "./Filter/Tag/Tag";
// 
import { api } from "../../services/api";
//
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Spinner from "../../components/Spinner";
const ResultPage = () => {
    const { keyword } = useParams();
    const [listResult, setListResult] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get(`api/search/${keyword}`)
            .then((res) => {
                console.log(res.data);
                setListResult(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            })
    }, [keyword]);
    if (loading) {
        return (
            <Spinner />
        )
    }
    return (
        <div>
            {/* Component bộ lọc thể loại và sắp xếp */}
            <Tag />
            {/* Khu vực tiêu đề kết quả tìm kiếm */}
            <div className="container-result-title">
                <img className="icon-result" src={iconResult} alt="icon result" />
                <p className="title-result">Kết quả tìm kiếm</p>
            </div>

            {/* Khu vực hiển thị danh sách truyện tìm kiếm được */}
            <div className="container-result-books">
                <div className="grid-books">
                    {/* Hiển thị danh sách sách theo dạng lưới */}
                    {
                        listResult.map((item, index) => (
                            <div className="item-book" key={index}>
                                <img className="book-image" src={item.cover_url} alt="book image" />
                                <p className="book-name">{item.title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Khu vực phân trang */}
            <div className="container-result-pagination">
                {/* Nút quay về trang trước */}
                <div className="item-page-index">
                    <img className="back-page-index" src={arrowIcon} alt="arrow icon" />
                </div>

                {/* Hiển thị số trang */}
                <div className="item-page-index">1</div>
                <div className="item-page-index">2</div>
                <div className="item-page-index">3</div>
                <div className="item-page-index">4</div>
                <div className="item-page-index">5</div>

                {/* Nút chuyển sang trang tiếp theo */}
                <div className="item-page-index">
                    <img className="next-page-index" src={arrowIcon} alt="arrow icon" />
                </div>
            </div>

            {/* Footer */}
            <div className="footer"></div>
        </div>
    );
};

export default ResultPage;
