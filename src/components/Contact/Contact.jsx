import React from "react";

const ContactForm = () => {
  return (
    <div className="flex justify-center items-center w-full h-full p-0">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row ]">
        {/* Left Section */}
        <div
          className="w-full md:w-2/5 flex flex-col items-center justify-center text-center bg-cover bg-center p-6 md:p-1"
          style={{ backgroundImage: "url('/images/brg_contact.png')" }}
        >
          <div className="w-4/5 md:h-3/5 bg-[#D9D9D9]/50 rounded-lg p-4">
            <h2 className="text-lg md:text-xl font-bold">Thông tin liên hệ</h2>
            <p className="italic text-xs md:text-sm mt-2">Bạn cần hỗ trợ?</p>
            <p className="italic text-xs md:text-sm mt-2">
              Hãy gửi tin nhắn cho chúng tôi!
            </p>

            <div className="mt-6 space-y-2 flex flex-col justify-center items-center ">
              <p className="flex items-center space-x-2">
                <img src="/images/email.png" alt="Email Icon" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">Group7@gmail.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <img src="/images/phone.png" alt="Phone Icon" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">0912345678</span>
              </p>
              <p className="flex items-center space-x-2">
                <img src="/images/location.png" alt="Location Icon" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">UIT-Thu Duc</span>
              </p>
            </div>

            <div className="flex justify-evenly mt-6">
              <img src="/images/instagram.png" alt="Instagram Icon" className="w-5 h-5" />
              <img src="/images/facebook.png" alt="Facebook Icon" className="w-5 h-5" />
              <img src="/images/tiktok.png" alt="Tiktok Icon" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-3/5 p-4">
          <form className="space-y-3 text-sm">
            <div className="flex justify-center">
              <img src="/images/logo.png" alt="Logo" className="w-1/2" />
            </div>
            <div>
              <label className="block font-semibold">Tên người dùng:</label>
              <input className="w-full p-2 border rounded-md text-xs md:text-sm" type="text" />
            </div>
            <div>
              <label className="block font-semibold">Email:</label>
              <input className="w-full p-2 border rounded-md text-xs md:text-sm" type="email" />
            </div>
            <div>
              <label className="block font-semibold">Số điện thoại:</label>
              <input className="w-full p-2 border rounded-md text-xs md:text-sm" type="text" />
            </div>
            <div>
              <label className="block font-semibold">Loại vấn đề:</label>
              <select className="w-full p-2 border rounded-md text-xs md:text-sm">
                <option>Chọn vấn đề</option>
                <option>Hỗ trợ kỹ thuật</option>
                <option>Đóng góp ý kiến</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Nội dung:</label>
              <textarea className="w-full h-20 p-2 border rounded-md text-xs md:text-sm"></textarea>
            </div>
            <button className="w-full bg-[#B3D8A1] text-white p-2 rounded-md font-semibold text-xs md:text-sm hover:bg-green-600">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
