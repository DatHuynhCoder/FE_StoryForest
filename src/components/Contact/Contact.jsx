import React from "react";

const ContactForm = () => {
  return (
    <div className="flex justify-center items-center  flex w-full h-full">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-full h-full">
        {/* Left Section */}
        <div
          className="w-2/5 flex flex-col items-center justify-center text-center bg-cover bg-center "
          style={{ backgroundImage: "url('/images/brg_contact.png')" }}
        >
          <div className="w-4/5 h-3/5 bg-[#D9D9D9]/50 rounded-lg">
            
            <h2 className="text-xl font-bold pt-4">Thông tin liên hệ</h2>
            <p className="italic text-sm pt-4">
              Bạn cần hỗ trợ?
            </p>
            <p className="italic text-sm pt-2">
            Hãy gửi tin nhắn cho chúng tôi!
            </p>
           
            <div className="mt-10 flex flex-col ml-5 space-y-2">
                <p className="flex  space-x-2">
                    <img src="/images/email.png" alt="Email Icon" className="w-5 h-5" />
                    <span className="font-bold">Group7@gmail.com</span>
                </p>
                <p className="flex  space-x-2">
                    <img src="/images/phone.png" alt="Phone Icon" className="w-5 h-5" />
                    <span className="font-bold">0912345678</span>
                </p>
                <p className="flex  space-x-2">
                    <img src="/images/location.png" alt="Location Icon" className="w-5 h-5" />
                    <span className="font-bold">UIT-Thu Duc</span>
                </p>
            </div>
            <div className="flex justify-evenly p-5 mt-10">
                <img src="/images/instagram.png" alt="Email Icon" className="w-5 h-5" />
                <img src="/images/facebook.png" alt="Email Icon" className="w-5 h-5" />
                <img src="/images/tiktok.png" alt="Email Icon" className="w-5 h-5" />
            </div>
          

          </div>
        </div>

        {/* Right Section */}
        <div className="w-3/5 h-full p-2 bg-white ">
        <form className="space-y-2  text-sm m-2">
            <div className="flex justify-center items-center">
            <img src="/images/logo.png" alt="Email Icon" className="w-1/2 " />

            </div>
            <div >
                <label className="block font-semibold">Tên người dùng:</label>
                <input className="w-full m-1 p-2 border rounded-md  text-s" type="text" />
            </div>
            <div >
                <label className="block font-semibold">Email:</label>
                <input className="w-full m-1 p-2 border rounded-md  text-s" type="email" />
            </div>
            <div >
                <label className="block font-semibold">Số điện thoại:</label>
                <input className="w-full m-1 p-2 border rounded-md  text-s" type="text" />
            </div>
            <div>
                <label className="block font-semibold">Loại vấn đề:</label>
                <select className="w-full m-1 p-2 border rounded-md  text-s">
                <option>Chọn vấn đề</option>
                <option>Hỗ trợ kỹ thuật</option>
                <option>Đóng góp ý kiến</option>
                </select>
            </div>
            <div >
                <label className="block font-semibold">Nội dung:</label>
                <textarea className="w-full h-[80px] m-1 p-2 border rounded-md  text-s"></textarea>
            </div>
            <button className="w-2/10 bg-[#B3D8A1] text-white mb-2 p-2 rounded-md font-semibold text-s hover:bg-green-600">
                Gửi
            </button>
</form>

        </div>
      </div>
    </div>
  );
};

export default ContactForm;
