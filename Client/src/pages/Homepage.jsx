import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Health<span className="text-blue-600">Lock</span> Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Manage your medical records, track access, and control your health data with our secure platform.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">12</h3>
            <p className="text-gray-600">Medical Records</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-green-600 mb-2">8</h3>
            <p className="text-gray-600">Doctors Connected</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">24</h3>
            <p className="text-gray-600">Access Logs</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button 
            onClick={() => navigate('/upload')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition"
          >
            Upload New Record
          </button>
          <button 
            onClick={() => navigate('/logs')}
            className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 py-3 px-6 rounded-lg font-medium transition"
          >
            View Access Logs
          </button>
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
            <span className="text-gray-600">Dr. Smith accessed your Blood Report</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
            <span className="text-gray-600">You uploaded a new X-Ray scan</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Dr. Johnson requested access to your MRI</span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}