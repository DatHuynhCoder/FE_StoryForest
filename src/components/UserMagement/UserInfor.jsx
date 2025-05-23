import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { 
  ArrowLeft, Book, BookOpen, DollarSign, Clock, 
  User, Mail, Phone, Award, BarChart2, Calendar,
  Star, Shield, Hash, Info, Heart
} from 'lucide-react';
import { apiAuth } from '../../services/api';
import { FaUserCircle } from 'react-icons/fa';


const UserInformations = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiAuth.get(`/api/admin/users/${id}`);
        setUser(response.data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
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
  
  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center p-4 max-w-md mx-auto bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-600 font-medium mb-2">Error loading user data</div>
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
  
  if (!user) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center p-4 max-w-md mx-auto">
        <div className="text-gray-500 font-medium mb-2">No user data found</div>
        <Link 
          to="/admin/user-management" 
          className="text-teal-600 hover:text-teal-800 text-sm inline-flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to user list
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link 
          to="/admin/user-management" 
          className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to user list
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* User Profile Card */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-4 transition-all hover:shadow-md">
            <div className="flex flex-col items-center mb-5">
          
        
                {user.avatar ? (
                  <img
                      src={user.avatar?.url || user.avatar}
                      alt={user.name}
                      className="w-28 h-28 rounded-full mb-3 border-4 border-teal-100 object-cover shadow-sm"
                      /> ) : ( <FaUserCircle className="w-28 h-28 rounded-full mb-3 border-4 border-teal-100 object-cover shadow-sm text-gray-500" />)
                }
                                  
              <h2 className="text-xl font-bold text-gray-800 text-center">{user.name || user.username}</h2>
              <span className="text-sm text-gray-500 mt-1">@{user.username}</span>
              <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                user.role === 'VIP reader' 
                  ? 'bg-purple-100 text-purple-800' 
                  : user.role === 'Admin'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
              }`}>
                {user.role}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>{user.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Gender: {user.gender || 'Not specified'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Joined: {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Achievements: {user.achivement || 'None yet'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BarChart2 className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Level: {user.level || 1}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>EXP: {user.exp || 0}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>Rank: {user.rank || 'Unranked'}</span>
              </div>
              {user.lastcheckin && (
                <div className="flex items-center text-sm text-gray-600">
                  <Hash className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span>Check-in streak: {user.streak || 0}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Details Section */}
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
                  <Info className="h-4 w-4 mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center transition-colors ${
                    activeTab === 'about'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  About
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center transition-colors ${
                    activeTab === 'activity'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Activity
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                      <Info className="h-5 w-5 mr-2 text-teal-600" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <User className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Full Name</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.name || 'Not provided'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <Mail className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Email</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.email}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <Phone className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Phone</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.phone || 'Not provided'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                        <div className="flex items-center mb-2">
                          <User className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Gender</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.gender || 'Not specified'}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                      <Award className="h-5 w-5 mr-2 text-purple-600" />
                      Achievements & Stats
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 transition-all hover:border-purple-200">
                        <div className="flex items-center mb-2">
                          <Award className="h-4 w-4 mr-2 text-purple-600" />
                          <span className="text-sm font-medium text-purple-600">Achievements</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.achivement || 'None yet'}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 transition-all hover:border-blue-200">
                        <div className="flex items-center mb-2">
                          <BarChart2 className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">Level</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.level || 1}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100 transition-all hover:border-green-200">
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm font-medium text-green-600">EXP</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.exp || 0}</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 transition-all hover:border-yellow-200">
                        <div className="flex items-center mb-2">
                          <Shield className="h-4 w-4 mr-2 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-600">Rank</span>
                        </div>
                        <div className="text-gray-800 font-medium">{user.rank || 'Unranked'}</div>
                      </div>
                      {user.lastcheckin && (
                        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 transition-all hover:border-teal-200">
                          <div className="flex items-center mb-2">
                            <Hash className="h-4 w-4 mr-2 text-teal-600" />
                            <span className="text-sm font-medium text-teal-600">Check-in Streak</span>
                          </div>
                          <div className="text-gray-800 font-medium">{user.streak || 0}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                    <Info className="h-5 w-5 mr-2 text-teal-600" />
                    About
                  </h3>
                  
                  {user.about && user.about.length > 0 ? (
                    <div className="space-y-3">
                      {user.about.map((item, index) => (
                        <div key={index} className="flex items-start bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <Heart className="h-4 w-4 mt-1 mr-2 text-red-500 flex-shrink-0" />
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center py-8">
                      <p className="text-gray-500">User hasn't provided any information yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                    <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                    Recent Activity
                  </h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Account Created</span>
                    </div>
                    <div className="text-gray-800 font-medium">{formatDate(user.createdAt)}</div>
                  </div>
                  
                  {user.updatedAt && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Last Updated</span>
                      </div>
                      <div className="text-gray-800 font-medium">{formatDate(user.updatedAt)}</div>
                    </div>
                  )}
                  
                  {user.lastcheckin && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-teal-200">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Last Check-in</span>
                      </div>
                      <div className="text-gray-800 font-medium">{formatDate(user.lastcheckin)}</div>
                    </div>
                  )}
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