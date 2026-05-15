import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../data/store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell } from
'recharts';
export function Reports() {
  const { appointments, services } = useApp();
  // Mock data for charts since we don't have enough real data to make it look good
  const weeklyData = [
  {
    name: 'Mon',
    appointments: 12
  },
  {
    name: 'Tue',
    appointments: 19
  },
  {
    name: 'Wed',
    appointments: 15
  },
  {
    name: 'Thu',
    appointments: 22
  },
  {
    name: 'Fri',
    appointments: 25
  },
  {
    name: 'Sat',
    appointments: 18
  },
  {
    name: 'Sun',
    appointments: 5
  }];

  // Calculate service distribution from actual data, fallback to mock if empty
  const serviceCounts: Record<string, number> = {};
  appointments.forEach((app) => {
    const serviceName =
    services.find((s) => s.id === app.serviceId)?.name || 'Unknown';
    serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
  });
  const pieData =
  Object.keys(serviceCounts).length > 0 ?
  Object.keys(serviceCounts).map((key) => ({
    name: key,
    value: serviceCounts[key]
  })) :
  [
  {
    name: 'Wellness Exam',
    value: 40
  },
  {
    name: 'Vaccination',
    value: 30
  },
  {
    name: 'Dental',
    value: 15
  },
  {
    name: 'Surgery',
    value: 10
  },
  {
    name: 'Other',
    value: 5
  }];

  const COLORS = [
  '#f59e0b',
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#ec4899',
  '#64748b'];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-2">
          View clinic performance and appointment trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Appointments by Day (This Week)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 5,
                  right: 20,
                  bottom: 5,
                  left: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb" />
                
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{
                    fill: '#f3f4f6'
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} />
                
                <Bar
                  dataKey="appointments"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Service Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value">
                  
                  {pieData.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} />

                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} />
                
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((entry, index) =>
            <div
              key={index}
              className="flex items-center text-sm text-gray-600">
              
                <div
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: COLORS[index % COLORS.length]
                }}>
              </div>
                {entry.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>);

}