import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';

import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone,
  Shield,
  Calendar,
  Clock,
  Edit,
  Activity
} from 'lucide-react';
import { apiAuth } from '../../services/api';

const StaffInformations = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await apiAuth.get(`/api/admin/staffs/${id}`);
        setStaff(response.data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch staff data');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-4 max-w-md mx-auto bg-red-50 rounded-lg border border-red-200">
          <div className="text-red-600 font-medium mb-2">Error loading staff data</div>
          <div className="text-sm text-red-500">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-4 max-w-md mx-auto">
          <div className="text-gray-500 font-medium mb-2">No staff data found</div>
          <Link 
            to="/admin/user-management" 
            className="text-teal-600 hover:text-teal-800 text-sm inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to staff list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link 
          to="/admin/user-management" 
          className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to staff list
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Staff Profile Card */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-4 transition-all hover:shadow-md">
            <div className="flex flex-col items-center mb-5">
            
              {staff.avatar ? (
                <img
                    src={staff.avatar?.url || staff.avatar}
                    alt={staff.name}
                    className="w-28 h-28 rounded-full mb-3 border-4 border-teal-100 object-cover shadow-sm"
                    /> ) : ( <FaUserCircle className="w-28 h-28 rounded-full mb-3 border-4 border-teal-100 object-cover shadow-sm text-gray-500" />)
              }
                                   


              <h2 className="text-xl font-bold text-gray-800 text-center">{staff.name}</h2>
              <span className="text-sm text-gray-500 mt-1">@{staff.username}</span>
              
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="truncate">{staff.email}</span>
              </div>
              {staff.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span>{staff.phone}</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Role: {staff.role || 'Not specified'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Created: {formatDate(staff.createdAt)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Edit className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Updated: {formatDate(staff.updatedAt)}</span>
              </div>
              {staff.lastActive && (
                <div className="flex items-center text-sm text-gray-600">
                  <Activity className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span>Last active: {staff.lastActive}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center transition-colors ${
                    activeTab === 'overview'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center transition-colors ${
                    activeTab === 'activity'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Activity
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                      <User className="h-5 w-5 mr-2 text-teal-600" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <User className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Full Name</span>
                        </div>
                        <div className="text-gray-800 font-medium">{staff.name || "N/A"}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <Mail className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Email</span>
                        </div>
                        <div className="text-gray-800 font-medium">{staff.email}</div>
                      </div>
                      {staff.phone && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                          <div className="flex items-center mb-2">
                            <Phone className="h-4 w-4 mr-2 text-gray-600" />
                            <span className="text-sm font-medium text-gray-600">Phone</span>
                          </div>
                          <div className="text-gray-800 font-medium">{staff.phone}</div>
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <Shield className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Role</span>
                        </div>
                        <div className="text-gray-800 font-medium">{staff.role}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Created At</span>
                        </div>
                        <div className="text-gray-800 font-medium">{formatDate(staff.createdAt)}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <Clock className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Last Updated</span>
                        </div>
                        <div className="text-gray-800 font-medium">{formatDate(staff.updatedAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                      <Activity className="h-5 w-5 mr-2 text-teal-600" />
                      Recent Activity
                    </h3>
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-500">No activity data available</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                      <Activity className="h-5 w-5 mr-2 text-teal-600" />
                      Work History
                    </h3>
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-500">No work history data available</p>
                    </div>
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