import { useState } from 'react';
import { 
  User, Mail, Phone, Shield, Settings, Eye, EyeOff, 
  Save, Edit, Bell, Lock, Key, Activity, Users 
} from 'lucide-react';
import { useAppSelector } from '../../../hooks/redux';
import { useUpdateProfileMutation, useChangePasswordMutation } from '../../../store/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    emergencyContact: user?.emergencyContact || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(profileData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!profileData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(profileData.emergencyContact)) {
      newErrors.emergencyContact = 'Emergency contact number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfileForm()) return;

    try {
      await updateProfile(profileData).unwrap();
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }).unwrap();
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to change password. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Form */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    } ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Emergency Contact */}
              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={handleProfileInputChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.emergencyContact ? 'border-red-300' : 'border-gray-300'
                    } ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                    placeholder="Enter emergency contact number"
                  />
                </div>
                {errors.emergencyContact && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact}</p>}
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                    className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.newPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isChangingPassword ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Account Settings Cards */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Notifications */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Notifications</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Manage your notification preferences for system alerts and updates
              </p>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Configure →
              </button>
            </div>

            {/* Security */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900">Security</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Review your account security settings and login activity
              </p>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Review →
              </button>
            </div>

            {/* Activity */}
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900">Activity Log</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                View your recent account activity and administrative actions
              </p>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View Log →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Information */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Administrator Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Role & Permissions</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">System Administrator</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">Full Access Permissions</span>
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Account Active</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Account Details</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-500">Member Since:</span>
                  <span className="ml-2 text-gray-900">January 2024</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Last Login:</span>
                  <span className="ml-2 text-gray-900">Today at 2:30 PM</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Account Status:</span>
                  <span className="ml-2 text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
