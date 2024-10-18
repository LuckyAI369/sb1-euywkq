import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, Package, TicketIcon } from 'lucide-react';

const data = [
  { name: 'Jan', installations: 4, serviceCalls: 3 },
  { name: 'Feb', installations: 3, serviceCalls: 2 },
  { name: 'Mar', installations: 2, serviceCalls: 4 },
  { name: 'Apr', installations: 5, serviceCalls: 3 },
  { name: 'May', installations: 4, serviceCalls: 5 },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Customers" value="120" icon={Users} />
        <DashboardCard title="Active Jobs" value="15" icon={Briefcase} />
        <DashboardCard title="Inventory Items" value="250" icon={Package} />
        <DashboardCard title="Open Tickets" value="8" icon={TicketIcon} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="installations" fill="#8884d8" />
            <Bar dataKey="serviceCalls" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;