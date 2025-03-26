import { useState } from "react";

const Tag = () => {
    const tags = ["Hài hước", "Kinh dị", "Lãng mạn"]
    const sorts = ["Thời gian cập nhật tăng dần", "Thời gian cập nhật giảm dần"]

    const [tag, setTag] = useState(tags[0])
    const [sort, setSort] = useState(sorts[0])
    return (
        <>
        {/* container-tag */}
        <div className=" grid grid-rows-2 md:grid-cols-2 bg-[#095533] md:gap-10 md:pb-1" >
            {/* container-tag-filter */}
            <div className=" md:row-span-2 flex flex-col justify-around mr-1">
                <div className=" grid grid-cols-3 m-2">
                <label className="text-white font-medium text-lg text-center">Thể loại:</label>
                <select name="tag" id="tag" className=" col-span-2 bg-white rounded-md font-medium h-10" value={tag} onChange={(e) => setTag(e.target.value)}>
                    {tags.map((tag,i)=>(<option key={i} value={tag}>{tag}</option>))}
                </select></div>
                <div className="grid grid-cols-3 justify-center m-2"> <label className="text-lg text-white font-medium text-center">Sắp xếp:</label>
                <select name="sort" id="sort" className="md:h-10 col-span-2 bg-white rounded-md font-medium h-10" value={sort} onChange={(e) => setSort(e.target.value)}>
                    {sorts.map((sort,i)=>(<option key={i} value={sort}>{sort}</option>))}
                </select></div>
               
            </div>
            {/* container-tag-description */}
            <div className="md:border-l-2 md:border-white md:row-span-2 md:flex md:justify-center md:items-center m-2">
                <p className="text-white p-5 text-justify ">Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản</p>
            </div>

        </div>
        </>
    );
};

export default Tag; // Xuất component để sử dụng ở nơi khác