import React, { useEffect, useState } from 'react';
import { Search, Eye, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import { parse } from 'date-fns';
import { useNavigate } from 'react-router';
import { apiAuth } from '../../services/api';
import { FaUserCircle } from 'react-icons/fa';

const UserTable = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        key: 'createdAt',
        direction: 'descending'
    });
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        itemsPerPage: 5,
        totalPages: 1
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const params = {
                search: debouncedSearch,
                accountType: 'user',
                page: currentPage,
                limit: pagination.itemsPerPage,
                sortBy: sortConfig.key,
                sortOrder: sortConfig.direction === 'ascending' ? 'asc' : 'desc'
            };

            const response = await apiAuth.get('/api/admin/accounts', { params });
            console.log('Users list',response.data);
            const { data, pagination: paginationData } = response.data;

            const usersWithDate = data.map(user => ({
                ...user,
                createdAt: user.createdAt
                    ? parse(user.createdAt, 'HH:mm dd/MM/yyyy', new Date())
                    : null
            }));

            setUsers(usersWithDate);
            setPagination(paginationData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [debouncedSearch, currentPage, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

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
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const generatePageNumbers = () => {
        const totalPages = pagination.totalPages;
        const current = currentPage;
        let startPage = Math.max(1, current - 2);
        let endPage = Math.min(totalPages, current + 2);

        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + 4);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - 4);
            }
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-8" /></td>
            <td className="px-4 py-3 flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2" />
                <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
                    <div className="h-3 bg-gray-100 rounded w-16" />
                </div>
            </td>
            <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 bg-gray-200 rounded w-32" /></td>
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24" /></td>
            <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32" /></td>
            <td className="px-4 py-3 text-center"><div className="h-4 bg-gray-200 rounded w-6 mx-auto" /></td>
        </tr>
    );

    return (
        <div className="mx-auto px-2 sm:px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <h2 className="text-lg font-medium text-gray-800">User List</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            Sort by:
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
                            <option value="createdAt-descending">Newest</option>
                            <option value="createdAt-ascending">Oldest</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                                <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-3 sm:px-4 py-2 cursor-pointer hover:bg-green-100" onClick={() => requestSort('createdAt')}>
                                    <div className="flex items-center">
                                        Created At {getSortIcon('createdAt')}
                                    </div>
                                </th>
                                <th className="px-3 sm:px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-500">
                                            {(currentPage - 1) * pagination.itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3">
                                            <div className="flex items-center">
                                                {user.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-8 h-8 rounded-full mr-2" />
                                                ) : (
                                                    <FaUserCircle className="w-8 h-8 rounded-full mr-2 text-gray-500" />
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="sm:hidden text-xs text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                                            {user.email}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-500">
                                            {user.phone || 'N/A'}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-gray-500">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-sm text-center">
                                            <button
                                                onClick={() => handleViewDetails(user)}
                                                className="text-teal-600 hover:text-teal-900"
                                                title="View details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && (
                    <div className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-2">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(currentPage - 1) * pagination.itemsPerPage + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(currentPage * pagination.itemsPerPage, pagination.total)}</span> of{' '}
                            <span className="font-medium">{pagination.total}</span> results
                        </div>
                        <div className="flex flex-wrap justify-center gap-1">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {generatePageNumbers().map(pageNum => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-1 border rounded text-sm ${currentPage === pageNum ? 'bg-teal-600 text-white border-teal-600' : ''}`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                                disabled={currentPage === pagination.totalPages}
                                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTable;
