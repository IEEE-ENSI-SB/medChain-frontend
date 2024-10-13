"use client"

import React, { useState } from 'react';
import MetricCard from '@/app/ui/dashboard/Cards';
import { HeartPulse, Stethoscope, Calendar, Bell } from 'lucide-react';
import RecentPatientCard from '../ui/dashboard/RecentPatientCard';

const Dashboard = () => {
    const [selectedStatistic, setSelectedStatistic] = useState("Monthly")
    const [balence, setBalance] = useState(10241.98)
    return (
        <div className="container px-4 py-4 bg-green-50">
            <h1 className='font-bold text-xl'>Welcome to MedChain !</h1>
            <p>Hospital Decenteralized Medical Center</p>
            <div className="flex gap-4 flex-warp mt-3">
                <MetricCard
                    title="Total Patient"
                    value={5}
                    change={4}
                    Icon={HeartPulse}
                    backgroundColor="bg-red-400"
                />
                <MetricCard
                    title="Doctor"
                    value={4}
                    change={-4}
                    Icon={Stethoscope}
                    backgroundColor="bg-green-400"
                />
                <MetricCard
                    title="Appointment"
                    value={6}
                    change={2}
                    Icon={Calendar}
                    backgroundColor="bg-blue-400"
                />
                <MetricCard
                    title="Notifications"
                    value={48}
                    change={5}
                    Icon={Bell}
                    backgroundColor="bg-purple-400"
                />
            </div>

            <div className='flex gap-4 flex-warp mt-4 mb-4'>
                <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center w-full max-w-xs">
                    <div>
                        <h2 className="text-gray-500 text-sm">Balance</h2>
                        <p className="text-2xl font-semibold text-blue-500"> {balence} <span className="text-purple-600">TND</span></p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md flex justify-between w-full">
                    <h2 className="text-gray-500 text-l">Patient Statistic</h2>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => setSelectedStatistic('Monthly')}
                            className={`${selectedStatistic === 'Monthly' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-500'} px-3 py-1 rounded-full`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setSelectedStatistic('Weekly')}
                            className={`${selectedStatistic === 'Weekly' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-500'} px-3 py-1 rounded-full`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setSelectedStatistic('Today')}
                            className={`${selectedStatistic === 'Today' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-500'} px-3 py-1 rounded-full`}
                        >
                            Today
                        </button>
                    </div>
                </div>
            </div>

            <RecentPatientCard />
        </div>
    );
};

export default Dashboard;