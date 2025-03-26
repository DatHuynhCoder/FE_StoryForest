// Import các asset (hình ảnh) và file CSS
import iconResult from "../../assets/iconResult.png";
import bookImage from "../../assets/book.jpg";
import "../SearchResult/ResultPage.css";
import arrowIcon from "../../assets/back-next-icon.png";

import Tag from "./Filter/Tag/Tag";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useState } from "react";

const ResultPage = () => {
    const books = Array(10).fill({ title: "His story", image: bookImage })
    const pages = Array.from({ length: 5 }, (_, i) => i + 1);
    const[inPage, setInPage] = useState(1)
    return (
        <>
            <HeaderNav />
            <Tag />

            <>
                {/* container-result */}
                <div className=" mt-5 flex flex-col">
                    {/* container-result-title */}
                    <div className="h-10 flex items-center p-1">
                        <img src={iconResult} alt="icon result" className="h-full mr-2" />
                        <p className="font-medium">Kết quả tìm kiếm</p>
                    </div>
                    {/* container-result-books */}
                    <div className="m-3 mr-5 ml-5 grid grid-cols-2 md:gap-1 grid-rows-2 md:grid-cols-6 p-5 bg-[#B3D8A8] rounded-lg">
                        {books.map((book, i) => (
                            
                            <>
                            {/* container-book */}
                                <div className="flex flex-col justify-center items-center hover:bg-white p-5 rounded-lg">
                                    <img src={book.image} alt="book image" className="rounded-lg"/>
                                    <p className="font-medium">{book.title}</p>
                                </div>
                            </>))}

                    </div>
                    {/* container-result-pagination */}
                    <div className=" h-10 flex justify-center mt-5 mb-10">
                    <img src={arrowIcon} alt="src" className="h-full rotate-180 mr-2 ml-2"/>
                    {pages.map((page,i)=>(
                        <>
                        {/* container-pagination-icon */}
                        <div className="bg-[#B3D8A8] aspect-square rounded-full flex justify-center items-center mr-2 ml-2 hover:text-white" key={i}>
                            <p>{page}</p>
                        </div>
                        </>
                        ))}
                    <img src={arrowIcon} alt="src" className="h-full mr-2 ml-2"/>
                   
                    </div>

                </div>
            </>

        </>
        // <div>
        //     

        //    
        //    {/* container-result */}
        //     <div className="container-result-title">
        //         <img className="icon-result" src={iconResult} alt="icon result" />
        //         <p className="title-result">Kết quả tìm kiếm</p>
        //     </div>

        //     {/* Khu vực hiển thị danh sách truyện tìm kiếm được */}
        //     <div className="container-result-books">
        //         <div className="grid-books">
        //             {/* Hiển thị danh sách sách theo dạng lưới */}
        //             <div className="item-book">
        //                 <img className="book-image" src={bookImage} alt="book image" />
        //                 <p className="book-name">Tên truyện</p>
        //             </div>
        //             <div className="item-book">
        //                 <img className="book-image" src={bookImage} alt="book image" />
        //                 <p className="book-name">Tên truyện</p>
        //             </div>
        //             <div className="item-book">
        //                 <img className="book-image" src={bookImage} alt="book image" />
        //                 <p className="book-name">Tên truyện</p>
        //             </div>
        //             <div className="item-book">
        //                 <img className="book-image" src={bookImage} alt="book image" />
        //                 <p className="book-name">Tên truyện</p>
        //             </div>
        //             <div className="item-book">
        //                 <img className="book-image" src={bookImage} alt="book image" />
        //                 <p className="book-name">Tên truyện</p>
        //             </div>
        //             <div className="item-book">
        //                 <img className="book-image" src={bookImage} alt="book image" />
        //                 <p className="book-name">Tên truyện</p>
        //             </div>
        //             <div className="item-book">
        //                 <img className="book-image" src={bookImage} alt="book image" />
        //                 <p className="book-name">Tên truyện</p>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Khu vực phân trang */}
        //     <div className="container-result-pagination">
        //         {/* Nút quay về trang trước */}
        //         <div className="item-page-index">
        //             <img className="back-page-index" src={arrowIcon} alt="arrow icon" />
        //         </div>

        //         {/* Hiển thị số trang */}
        //         <div className="item-page-index">1</div>
        //         <div className="item-page-index">2</div>
        //         <div className="item-page-index">3</div>
        //         <div className="item-page-index">4</div>
        //         <div className="item-page-index">5</div>

        //         {/* Nút chuyển sang trang tiếp theo */}
        //         <div className="item-page-index">
        //             <img className="next-page-index" src={arrowIcon} alt="arrow icon" />
        //         </div>
        //     </div>

        //     {/* Footer */}
        //     <div className="footer"></div>
        // </div>
    );
};

export default ResultPage;
