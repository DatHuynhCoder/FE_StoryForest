// Import các asset (hình ảnh) và file CSS
import iconResult from "../../assets/iconResult.png";
import bookImage from "../../assets/book.jpg";
import arrowIcon from "../../assets/back-next-icon.png";

import Tag from "./Filter/Tag/Tag";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> 4ff556b00aa7253fb3e01ae2d243563f92f84df0

const ResultPage = () => {
    const books = Array(10).fill({ title: "His story", image: bookImage })
    const pages = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
<<<<<<< HEAD
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
                                    <img src={book.image} alt="book image" className="rounded-lg" />
                                    <p className="font-medium">{book.title}</p>
                                </div>
                            </>))}
=======
        <div>
            <HeaderNav/>
            {/* Component bộ lọc thể loại và sắp xếp */}
            <Tag />
            {/* Khu vực tiêu đề kết quả tìm kiếm */}
            <div className="container-result-title">
                <img className="icon-result" src={iconResult} alt="icon result" />
                <p className="title-result">Kết quả tìm kiếm</p>
            </div>
>>>>>>> 4ff556b00aa7253fb3e01ae2d243563f92f84df0

                    </div>
                    {/* container-result-pagination */}
                    <div className=" h-10 flex justify-center mt-5 mb-10">
                        <img src={arrowIcon} alt="src" className="h-full rotate-180 mr-2 ml-2" />
                        {pages.map((page, i) => (
                            <>
                                {/* container-pagination-icon */}
                                <div className="bg-[#B3D8A8] aspect-square rounded-full flex justify-center items-center mr-2 ml-2 hover:text-white" key={i}>
                                    <p>{page}</p>
                                </div>
                            </>
                        ))}
                        <img src={arrowIcon} alt="src" className="h-full mr-2 ml-2" />

                    </div>

                </div>
            </>

        </>

    );
};

export default ResultPage;
