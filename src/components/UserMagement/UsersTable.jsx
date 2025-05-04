import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';

const UserTable = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        key: 'createdAt',
        direction: 'descending'
    });
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            const names = [
                'Eiichiro Oda', 'Tite Kubo', 'Masashi Kishimoto', 'Akira Toriyama',
                'Yoshihiro Togashi', 'Hajime Isayama', 'Naoko Takeuchi', 'Gosho Aoyama',
                'Ken Wakui', 'Koyoharu Gotouge', 'Gege Akutami', 'Hiromu Arakawa',
                'Tsugumi Ohba', 'Takeshi Obata', 'Sui Ishida', 'Haruichi Furudate',
                'ONE', 'Makoto Yukimura', 'Osamu Tezuka', 'Kazuki Takahashi'
            ];
            
            const data = names.map((name, i) => ({
                id: i + 1,
                name,
                email: `${name.toLowerCase().replace(/ /g, '')}@gmail.com`,
                phone: `0123${456000 + i}`,
                avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
                address: `Số ${i+1}, Đường ${name.split(' ')[0]}, TP.HCM`,
                role: ['Admin', 'User', 'Editor', 'Viewer'][i % 4]
            }));
            setUsers(data);
            setFilteredUsers(data);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [search, users]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...filteredUsers];
        if (sortConfig.key) {
            sortableUsers.sort((a, b) => {
                if (sortConfig.key === 'createdAt') {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    if (dateA < dateB) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (dateA > dateB) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                } else {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                }
            });
        }
        return sortableUsers;
    }, [filteredUsers, sortConfig]);

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

    const handleViewDetails = (user) => {
        navigate(`/admin/user-management/users/${user.id}`);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? 
            <ChevronUp className="h-4 w-4 ml-1 inline" /> : 
            <ChevronDown className="h-4 w-4 ml-1 inline" />;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="mx-auto px-2 sm:px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <h2 className="text-lg font-medium text-gray-800">Danh sách người dùng</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            Sắp xếp:
                        </label>
                        <select
                            id="sort"
                            className="block w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            value={`${sortConfig.key}-${sortConfig.direction}`}
                            onChange={(e) => {
                                const [key, direction] = e.target.value.split('-');
                                setSortConfig({ key, direction });
                            }}
                        >
                            <option value="name-ascending">Tên (A-Z)</option>
                            <option value="name-descending">Tên (Z-A)</option>
                            <option value="createdAt-descending">Mới nhất</option>
                            <option value="createdAt-ascending">Cũ nhất</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                                <th 
                                    className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('name')}
                                >
                                    <div className="flex items-center">
                                        Tên
                                        {getSortIcon('name')}
                                    </div>
                                </th>
                                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điện thoại</th>
                                <th 
                                    className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort('createdAt')}
                                >
                                    <div className="flex items-center">
                                        Ngày tạo
                                        {getSortIcon('createdAt')}
                                    </div>
                                </th>
                                <th className="px-3 sm:px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {indexOfFirst + index + 1}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img 
                                                    src={user.avatar} 
                                                    alt={user.name} 
                                                    className="w-8 h-8 rounded-full mr-2" 
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="sm:hidden text-xs text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                            {user.email}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {user.phone}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-center">
                                            <button
                                                onClick={() => handleViewDetails(user)}
                                                className="text-teal-600 hover:text-teal-900 inline-flex items-center justify-center"
                                                title="Xem chi tiết"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                                        Không tìm thấy người dùng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-2">
                    <div className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">{indexOfFirst + 1}</span> đến{' '}
                        <span className="font-medium">{Math.min(indexOfLast, sortedUsers.length)}</span> trong{' '}
                        <span className="font-medium">{sortedUsers.length}</span> kết quả
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                        >
                            Trước
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-1 border rounded text-sm ${
                                        currentPage === pageNum ? 'bg-teal-600 text-white border-teal-600' : ''
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="px-2 py-1">...</span>
                        )}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className="px-3 py-1 border rounded text-sm"
                            >
                                {totalPages}
                            </button>
                        )}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;