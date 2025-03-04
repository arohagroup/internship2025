import React, { useState } from 'react';
import { FiUserPlus, FiUsers, FiBriefcase, FiSearch, FiPlusCircle, FiMenu, FiUser } from 'react-icons/fi';
import ProfileSection from '../components/admin/ProfileSection';
import AddJobSection from '../components/admin/AddJobSection';
import ApplicationsSection from '../components/admin/ApplcationsSection';
import SearchJobsSection from '../components/admin/SearchJobsSection';
import SearchCandidatesSection from '../components/admin/SearchCandidatesSection';
import AddAdminSection from '../components/admin/AddAdminSection';
import ViewAdminsSection from '../components/admin/ViewAdminsSection';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { id: 'profile', icon: FiUser, label: 'Profile' },
    { id: 'addJob', icon: FiPlusCircle, label: 'Add Job' },
    { id: 'applications', icon: FiBriefcase, label: 'Applications' },
    { id: 'searchJobs', icon: FiSearch, label: 'Search Jobs' },
    { id: 'searchCandidates', icon: FiSearch, label: 'Search Candidates' },
    { id: 'addAdmin', icon: FiUserPlus, label: 'Add Admin' },
    { id: 'viewAdmins', icon: FiUsers, label: 'View Admins' },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      localStorage.clear()
    }
  }, [navigate]);


  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        const data = await response.json();

        let role  = data.admin.role
        if (role !== 'superadmin') {
          setMenuItems(menuItems.filter(item => item.id !== 'addAdmin'));
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchAdminProfile();
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'addJob':
        return <AddJobSection />;
      case 'applications':
        return <ApplicationsSection />;
      case 'searchJobs':
        return <SearchJobsSection />;
      case 'searchCandidates':
        return <SearchCandidatesSection />;
      case 'addAdmin':
        return <AddAdminSection />;
      case 'viewAdmins':
        return <ViewAdminsSection />;
      default:
        return <ProfileSection />;
    }
  }


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl font-bold text-orange-600">Admin Panel</h1>
        </div>
        <ul className="flex flex-col py-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-100 ${activeTab === item.id ? 'bg-orange-100' : ''}`}
              >
                <item.icon className="mr-3" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 ml-4">Dashboard</h2>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="py-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-100 ${activeTab === item.id ? 'bg-orange-100' : ''}`}
                  >
                    <item.icon className="mr-3" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
