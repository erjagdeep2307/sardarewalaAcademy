import React from 'react';
import { Users, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{className?: string}>;
  color: { bg: string; text: string };
  trend: string;
}

const StatCard = ({ label, value, icon: Icon, color, trend }: StatCardProps) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-lg bg-opacity-10 ${color.bg}`}>
        <Icon className={`w-6 h-6 ${color.text}`} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
        <TrendingUp className="w-4 h-4 mr-1" />
        {trend}
      </span>
      <span className="text-gray-400 dark:text-gray-500 ml-2">vs last month</span>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Students" 
          value="1,248" 
          icon={Users} 
          color={{ bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' }} 
          trend="+12%"
        />
        <StatCard 
          label="Active Revenue" 
          value="₹4.2L" 
          icon={DollarSign} 
          color={{ bg: 'bg-[#138808]', text: 'text-[#138808] dark:text-green-500' }} 
          trend="+8%"
        />
        <StatCard 
          label="Pending Enquiries" 
          value="45" 
          icon={Calendar} 
          color={{ bg: 'bg-[#FF9933]', text: 'text-[#FF9933] dark:text-orange-400' }} 
          trend="-2%"
        />
        <StatCard 
          label="Website Visits" 
          value="12.5k" 
          icon={TrendingUp} 
          color={{ bg: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400' }} 
          trend="+24%"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Recent Registrations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  <th className="pb-3 pl-2">Name</th>
                  <th className="pb-3">Program</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="py-3 pl-2 font-medium text-gray-900 dark:text-white">Student Name {i}</td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">Army Training</td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">Oct {10+i}, 2023</td>
                    <td className="py-3">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">Paid</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/admin/programs')}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              + Add New Program
            </button>
            <button 
              onClick={() => navigate('/admin/gallery')}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              + Upload Gallery Images
            </button>
            <button 
              onClick={() => navigate('/admin/enquiries')}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              View Recent Enquiries
            </button>
            <button 
              onClick={() => navigate('/admin/visitors')}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              Check Visitor Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};