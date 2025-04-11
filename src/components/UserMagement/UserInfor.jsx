import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Book, BookOpen, DollarSign, Clock, User, Mail, Phone } from 'lucide-react';

const UserInformations = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Giả lập API call
    const fetchUser = async () => {
      // Mock data
      const mockUser = {
        id: userId,
        fullName: 'Nguyễn Văn A',
        username: 'nguyenvana',
        email: 'nguyenvana@gmail.com',
        phone: '0987654321',
        avatar: 'https://i.pravatar.cc/150?img=3',
        createdAt: '15/03/2022',
        membership: 'VIP',
        membershipExpiry: '15/03/2024',
        totalSpent: 1250000,
        readingStats: {
          totalRead: 42,
          currentlyReading: 3,
          favoriteGenres: ['Trinh thám', 'Tiên hiệp', 'Ngôn tình']
        },
        purchasedStories: [
          { id: 1, title: 'Đấu Phá Thương Khung', price: 200000, purchaseDate: '10/02/2023' },
          { id: 2, title: 'Thần Đạo Đan Tôn', price: 150000, purchaseDate: '05/01/2023' },
          { id: 3, title: 'Tu Chân Giới', price: 180000, purchaseDate: '20/12/2022' }
        ],
        readingHistory: [
          { id: 1, title: 'Ma Thổi Đèn', lastRead: '2 ngày trước', progress: '85%' },
          { id: 2, title: 'Toàn Chức Cao Thủ', lastRead: '1 tuần trước', progress: '42%' },
          { id: 3, title: 'Ỷ Thiên Đồ Long Ký', lastRead: '3 tuần trước', progress: '100%' }
        ]
      };
      setUser(mockUser);
    };

    fetchUser();
  }, [userId]);

  if (!user) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link to="/admin/user-management" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại danh sách
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <div className="flex flex-col items-center mb-4">
              <img 
                src={user.avatar} 
                alt={user.fullName} 
                className="w-24 h-24 rounded-full mb-3 border-2 border-blue-200"
              />
              <h2 className="text-xl font-bold text-center">{user.fullName}</h2>
              <span className="text-sm text-gray-500">@{user.username}</span>
              <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                user.membership === 'VIP' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {user.membership}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Tham gia: {user.createdAt}</span>
              </div>
              {user.membership === 'VIP' && (
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>VIP đến: {user.membershipExpiry}</span>
                </div>
              )}
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span>Tổng chi tiêu: {user.totalSpent.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Tổng quan
                </button>
                <button
                  onClick={() => setActiveTab('reading')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'reading'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Truyện đang đọc
                </button>
                <button
                  onClick={() => setActiveTab('purchased')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'purchased'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Truyện đã mua
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Thống kê đọc truyện</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Tổng số truyện đã đọc</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{user.readingStats.totalRead}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <Book className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Đang đọc</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{user.readingStats.currentlyReading}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Tổng chi tiêu</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{user.totalSpent.toLocaleString()}đ</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-4">Thể loại yêu thích</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {user.readingStats.favoriteGenres.map((genre, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reading' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Truyện đang đọc ({user.readingHistory.length})</h3>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên truyện</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lần đọc cuối</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiến độ</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {user.readingHistory.map((story) => (
                          <tr key={story.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.lastRead}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-blue-600 h-2.5 rounded-full" 
                                  style={{ width: story.progress }}
                                ></div>
                              </div>
                              <span className="mt-1 block text-xs text-gray-500">{story.progress}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'purchased' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Truyện đã mua ({user.purchasedStories.length})</h3>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên truyện</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày mua</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {user.purchasedStories.map((story) => (
                          <tr key={story.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.price.toLocaleString()}đ</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.purchaseDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformations;