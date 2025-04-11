import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Book, 
  BookOpen, 
  Trash2, 
  Edit, 
  Plus, 
  Clock, 
  User, 
  Mail, 
  Phone,
  Shield,
  Activity,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const StaffInformations = () => {
  const { staffId } = useParams();
  const [staff, setStaff] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Giả lập API call
    const fetchStaff = async () => {
      // Mock data cho nhân viên
      const mockStaff = {
        id: staffId,
        fullName: 'Trần Thị B',
        username: 'tranthib',
        email: 'tranthib@truyen.vn',
        phone: '0987123456',
        avatar: 'https://i.pravatar.cc/150?img=5',
        position: 'Quản lý nội dung',
        department: 'Biên tập',
        joinDate: '15/03/2021',
        lastActive: '10 phút trước',
        status: 'active', // active/inactive
        permissions: ['Thêm truyện', 'Sửa truyện', 'Xóa truyện', 'Duyệt chapter'],
        
        // Thống kê công việc
        workStats: {
          totalAdded: 128,
          totalEdited: 342,
          totalDeleted: 28,
          pendingApproval: 5,
          approvedThisMonth: 42,
          rejectionRate: '4.2%'
        },
        
        // Lịch sử thêm truyện
        addedStories: [
          { id: 1, title: 'Đấu La Đại Lục', date: '10/02/2023', status: 'published' },
          { id: 2, title: 'Thần Đạo Đan Tôn', date: '05/01/2023', status: 'published' },
          { id: 3, title: 'Tu Chân Giới', date: '20/12/2022', status: 'draft' }
        ],
        
        // Lịch sử xóa truyện
        deletedStories: [
          { id: 101, title: 'Ma Thổi Đèn Bản Cũ', date: '2 ngày trước', reason: 'Bản quyền' },
          { id: 102, title: 'Toàn Chức Cao Thủ Fanfic', date: '1 tuần trước', reason: 'Chất lượng thấp' }
        ],
        
        // Truyện đang xử lý
        pendingStories: [
          { id: 201, title: 'Ỷ Thiên Đồ Long Ký Remake', date: '3 giờ trước', action: 'edit' },
          { id: 202, title: 'Tây Du Ký Hiện Đại', date: '1 ngày trước', action: 'review' }
        ]
      };
      setStaff(mockStaff);
    };

    fetchStaff();
  }, [staffId]);

  if (!staff) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link to="/user-management" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại danh sách nhân viên
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Sidebar thông tin cơ bản */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <div className="flex flex-col items-center mb-4">
              <img 
                src={staff.avatar} 
                alt={staff.fullName} 
                className="w-24 h-24 rounded-full mb-3 border-2 border-blue-200"
              />
              <h2 className="text-xl font-bold text-center">{staff.fullName}</h2>
              <span className="text-sm text-gray-500">@{staff.username}</span>
              <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {staff.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{staff.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{staff.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span>{staff.position}</span>
              </div>
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 mr-2 text-gray-500" />
                <span>Phòng ban: {staff.department}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Ngày vào làm: {staff.joinDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <Activity className="h-4 w-4 mr-2 text-gray-500" />
                <span>Hoạt động cuối: {staff.lastActive}</span>
              </div>
              
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Quyền hạn</h4>
                <div className="flex flex-wrap gap-1">
                  {staff.permissions.map((permission, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
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
                  onClick={() => setActiveTab('added')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'added'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Truyện đã thêm
                </button>
                <button
                  onClick={() => setActiveTab('deleted')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'deleted'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Truyện đã xóa
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'pending'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Đang xử lý
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Thống kê công việc</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <Plus className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Truyện đã thêm</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{staff.workStats.totalAdded}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <Edit className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Truyện đã sửa</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{staff.workStats.totalEdited}</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <Trash2 className="h-5 w-5 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Truyện đã xóa</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{staff.workStats.totalDeleted}</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Chờ duyệt</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{staff.workStats.pendingApproval}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Đã duyệt (tháng)</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{staff.workStats.approvedThisMonth}</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">Tỉ lệ từ chối</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">{staff.workStats.rejectionRate}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'added' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Truyện đã thêm ({staff.addedStories.length})</h3>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên truyện</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày thêm</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {staff.addedStories.map((story) => (
                          <tr key={story.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                story.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {story.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'deleted' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Truyện đã xóa ({staff.deletedStories.length})</h3>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên truyện</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày xóa</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {staff.deletedStories.map((story) => (
                          <tr key={story.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'pending' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Truyện đang xử lý ({staff.pendingStories.length})</h3>
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên truyện</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày cập nhật</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {staff.pendingStories.map((story) => (
                          <tr key={story.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{story.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{story.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {story.action === 'edit' ? 'Chỉnh sửa' : 'Duyệt nội dung'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">Xem</button>
                            </td>
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

export default StaffInformations;