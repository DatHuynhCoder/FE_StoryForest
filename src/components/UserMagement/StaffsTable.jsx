import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Search, Plus, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import AddStaffForm from './AddStaffForm';
import { FaUserCircle } from 'react-icons/fa';
import { api } from '../../services/api';

const StaffTable = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState(null);
  const staffPerPage = 5;
  const navigate = useNavigate();

  const handleAddClick = () => setShowAddForm(true);
  const handleCloseForm = () => setShowAddForm(false);

  const fetchStaff = async () => {
    try {
      const response = await api.get('/api/admin/accounts?accountType=staff');
      console.log('Staffs list', response.data);
      const result = response.data;
      if (result.success) {
        setStaff(result.data);
        setFilteredStaff(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    const filtered = staff.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStaff(filtered);
    setCurrentPage(1);
  }, [search, staff]);

  const indexOfLast = currentPage * staffPerPage;
  const indexOfFirst = indexOfLast - staffPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStaff.length / staffPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this staff member?');
    if (!confirmDelete) return;

    try {
      setLoadingStates(prev => ({ ...prev, [id]: true }));
      await api.delete(`/api/admin/staffs/${id}`);
      
      setStaff(prev => prev.filter(staff => staff.id !== id));
      setFilteredStaff(prev => prev.filter(staff => staff.id !== id));
      
      alert('Staff member deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete staff member');
      console.error('Delete error:', err);
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/user-management/staff/${id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddSuccess = () => {
    handleCloseForm();
    fetchStaff(); 
  };

  return (
    <div className="mx-auto px-2 sm:px-4 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-medium text-gray-800">Staff List</h2>
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
          <button
            onClick={handleAddClick}
            className="flex items-center justify-center gap-1 bg-teal-600 text-white px-3 py-2 rounded text-sm hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl"
            style={{ animation: showAddForm ? 'modalFadeIn 0.3s ease-out forwards' : '' }}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <AddStaffForm onSuccess={handleAddSuccess} />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avatar</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStaff.length > 0 ? (
                currentStaff.map((person, index) => (
                  <tr key={person.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500">{indexOfFirst + index + 1}</td>
                    <td className="px-4 py-3">
                      {person.avatar ? (
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-8 h-8 rounded-full mr-2" 
                        /> 
                      ) : ( 
                        <FaUserCircle className="w-8 h-8 rounded-full mr-2 text-gray-500" />
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{person.name}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{person.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{person.role}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{(person.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(person.id)}
                          className="text-teal-600 hover:text-teal-900"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(person.id)}
                          disabled={loadingStates[person.id]}
                          className="text-red-600 hover:text-red-900 flex items-center"
                          title="Delete"
                        >
                          {loadingStates[person.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-sm text-gray-500">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-2">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirst + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLast, filteredStaff.length)}</span> of{' '}
            <span className="font-medium">{filteredStaff.length}</span> results
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded text-sm ${
                  currentPage === i + 1 ? 'bg-teal-600 text-white border-teal-600' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;