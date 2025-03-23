import React from 'react'
import { FaComment } from "react-icons/fa";
import './NovelReader.css'; // Import the CSS file

function NovelReader() {
    const novelContent = [
        'Trong những câu chuyện mà cha mẹ kể bên giường ngủ của con cái, những câu chuyện mà người ta thường gọi là cổ tích, không thể thiếu một chuyện tình giữa Công chúa và Hoàng tử.',
        'Một nàng Công chúa biến mất, chỉ để lại duy nhất một chiếc giày thủy tinh, và một chàng Hoàng tử đi khắp nơi tìm nàng. Một nàng Công chúa ăn phải quả táo độc do âm mưu của mụ phù thủy và chìm vào giấc ngủ sâu, được đánh thức bởi nụ hôn của Hoàng tử.',
        'Có người chê bai những câu chuyện ấy là sáo rỗng, nhưng gọi một điều là sáo rỗng vốn dĩ chỉ có nghĩa rằng đó là câu chuyện được yêu thích và phổ biến. Có câu chuyện nào khơi gợi cảm xúc con người nhiều như tình yêu nở rộ giữa nghịch cảnh?',
        'Thế nhưng, lý do người ta yêu thích những câu chuyện tựa cổ tích lại chính là vì những câu chuyện cổ tích ấy không thể xảy ra trong thực tế. Trí tưởng tượng chỉ mãi là trí tưởng tượng, không thể tránh khỏi sự khác biệt với thực tại.',
        'Trong thực tế, mọi thứ xuất hiện trong cổ tích đều tồn tại: những nàng Công chúa bị giam trong tháp, những mụ phù thủy, những chàng Hoàng tử dũng cảm, và tình yêu.',
        'Nhưng chẳng có gì đảm bảo rằng tất cả những yếu tố ấy sẽ hòa quyện cùng nhau. Chàng Hoàng tử tuấn tú sẽ cứu nàng Công chúa bị nguyền rủa và nhốt trong tháp vẫn chưa xuất hiện.',
        '“Liệu một người như thế có xuất hiện không? Một chàng Hoàng tử trong mơ...”',
        '“Hmm, chịu.”',
        'Câu chuyện cũ về một chàng Hoàng tử tuấn tú xuất hiện và cứu lấy nàng Công chúa xinh đẹp đã trở nên phai nhòa theo thời gian.',
        '***',
        'Đã hơn 15 năm kể từ khi nàng Công chúa bị nhốt trong tháp trở thành lời đồn đại trong giới hầu cận của hoàng gia. Người ta thương hại nàng Công chúa bị nguyền rủa khiến toàn thân biến dạng, nhưng cũng không ngừng chế giễu.',
        '“Hoàng tử nào lại đi yêu một người phụ nữ thân thể bị biến dạng chẳng khác nào quái vật? Có khi hắn ta lại sợ đái ra quần vì cái lời nguyền ấy chứ.”',
        '“Haa. Thật đáng tiếc. Thế mà người ta nói rằng cô ấy từng rất xinh đẹp...”',
        'Nàng Công chúa bị cha mẹ và anh chị em ruồng bỏ, chẳng có ai yêu thương nàng.',
        '“Ặc, nếu là ta, ta đã tự cắn lưỡi mà chết luôn rồi... Híc!!”',
        'Ngoại trừ một người.',
        '“Suỵt.”',
        'Nàng Công chúa không hề cô đơn.',
        '“Cẩn thận, Công chúa có thể nghe thấy các người đấy.”',
        'Có một người hầu gái trung thành đã tự nguyện nhận lấy vị trí chăm sóc nàng Công chúa mà ai ai cũng xa lánh.',
        'Một người hầu không màng tới ánh mắt thiên hạ, chỉ một lòng hầu hạ nàng Công chúa.',
        'Người ta gọi người hầu gái ấy là Hoàng tử.',
        {
            url: 'https://i.imgur.com/lKxztBg.jpeg'
        }
    ]
    const comments = [
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User1', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User2', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User3', content: 'This is a comment' },
        { avatar: 'https://static.ybox.vn/2022/7/4/1658994867129-Spy.x.Family.full.3493446.jpg', user: 'User4', content: 'This is a comment' },
    ]
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center md:pl-[200px] md:pr-[200px] bg-[#f0dcbd]'>
                <div className='flex flex-col'>
                    <p className='text-xl md:text-3xl font-semibold text-black text-center'>Hầu Gái của Nàng Công Chúa Bị Nguyền Rủa</p>
                </div>
                {/* This div will contain 2 button */}
                <div className='flex flex-col justify-center headifo sticky-top'>
                    <p className='md:text-lg mt-2'>Chương 0: Rapunzel</p>
                </div>
                <div className='flex flex-col justify-center sticky-top'>
                    <button className='p-[10px] bg-green-700 text-white font-bold md:w-[500px] w-[200px] rounded mt-3'>Chương sau</button>
                    <button className='p-[10px] font-bold md:w-[500px] w-[200px] rounded border mt-3'>Chương trước</button>
                </div>
                {/* This div will contain the manga images */}
                <div className='p-[10px] md:p-[10px]'>
                    {novelContent.map((content, index) => (
                        <div className='mt-3' key={index}>
                            {typeof content === 'string' ? (
                                <p className='md:text-xl text-justify'>{content}</p>
                            ) : (
                                <div className='flex justify-center'>
                                    <img src={content.url}
                                        alt='manga'
                                        loading='lazy'
                                        className='max-w-xs max-h-xs object-cover'
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Back to Top button */}
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-5 right-5 p-3 bg-green-700 text-white font-bold rounded-full shadow-lg'
                >
                    ↑Top
                </button>
                {/* This div is for comment */}
                <div className='flex flex-col justify-center mt-10 md:w-[100%] w-[80%]'>
                    <p className='md:text-lg mt-2 text-green-700 font-bold flex'>Bình luận &nbsp; <FaComment size={20} /></p>
                    <textarea
                        className='border p-2 mt-3'
                        placeholder='Viết bình luận...'
                    ></textarea>
                    <button className='p-[10px] bg-green-700 text-white font-bold md:w-[100%] rounded mt-3'>Gửi bình luận</button>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <div className='mt-3'>
                                    <div className='flex items-center'>
                                        <img src={comment.avatar} alt={comment.user} className='w-10 h-10 rounded-full' />
                                        <p className='ml-1 font-semibold'>{comment.user}</p>
                                    </div>
                                    <div className='mt-2 w-[100%] border p-2 rounded-md mt-2'>
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NovelReader