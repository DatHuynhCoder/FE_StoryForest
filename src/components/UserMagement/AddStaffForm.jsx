import React, { useState } from 'react';
import { User, Mail, Lock, Check, Loader2} from 'lucide-react';
import { api } from '../../services/api';

const AddStaffForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email format';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post('/api/admin/staffs', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'staff'
      });

      console.log('Created staff:', response.data);
      setSuccess(true);
      setFormData({ username: '', email: '', password: '' });
      

      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.message || 'Server error';
      setServerError(message);
      console.error('Error creating staff:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <User className="h-6 w-6 mr-2 text-teal-600" />
        Add New Staff Account
      </h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
          <Check className="h-5 w-5 mr-2" />
          Staff account created successfully!
        </div>
      )}
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className={`pl-10 w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-teal-500 focus:border-teal-500`}
              disabled={isSubmitting}
            />
          </div>
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={`pl-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-teal-500 focus:border-teal-500`}
              disabled={isSubmitting}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              className={`pl-10 w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 focus:ring-teal-500 focus:border-teal-500`}
              disabled={isSubmitting}
            />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaffForm;