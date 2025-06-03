import React from "react";
import { Car, BadgeCheck, Video, ShieldCheck, BarChart } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const features = [
    {
      title: "Total Vehicles Processed",
      value: "1,248",
      icon: <Car className="text-blue-600" size={28} />,
    },
    {
      title: "Verified Plates",
      value: "1,110",
      icon: <BadgeCheck className="text-green-600" size={28} />,
    },
    {
      title: "Live Footage Scans",
      value: "327",
      icon: <Video className="text-purple-600" size={28} />,
    },
    {
      title: "Security Flags",
      value: "42",
      icon: <ShieldCheck className="text-red-600" size={28} />,
    },
  ];

  return (
    <div className="p-6 ml-20 md:ml-60">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md p-5 rounded-2xl flex items-center space-x-4 hover:shadow-xl transition duration-300"
          >
            <div>{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">System Insights</h3>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The Smart Vehicle Recognition System is actively monitoring and identifying vehicle details using AI-powered number plate detection. The dashboard provides real-time insights on traffic volume, flagged incidents, and processed data. 
          </p>
          <div className="flex items-center gap-4">
            <BarChart className="text-blue-600" size={36} />
            <p className="text-gray-700 dark:text-gray-200">
              Last Update: <span className="font-medium">4 minutes ago</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
