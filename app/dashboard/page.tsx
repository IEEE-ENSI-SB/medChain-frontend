"use client"

import React, { useState } from 'react';
import MetricCard from '@/app/ui/dashboard/Cards';
import { HeartPulse, Stethoscope, Calendar, Bell } from 'lucide-react';
import RecentPatientCard from '../ui/dashboard/RecentPatientCard';

const Dashboard = () => {
    const [selectedStatistic, setSelectedStatistic] = useState("Monthly")
    const [balance] = useState(10241.98)

    return (
        <div className="px-4 py-4 bg-green-50">
            <h1 className='font-bold text-xl'>Welcome to MedChain!</h1>
            <p className="mb-4">Hospital Decentralized Medical Center</p>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className='flex flex-col sm:flex-row gap-4 mt-4 mb-4'>
                <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center w-full sm:w-1/3">
                    <div>
                        <h2 className="text-gray-500 text-sm">Balance</h2>
                        <p className="text-2xl font-semibold text-blue-500">{balance.toFixed(2)} <span className="text-purple-600">TND</span></p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md flex flex-col sm:flex-row justify-between w-full sm:w-2/3">
                    <h2 className="text-gray-500 text-l mb-2 sm:mb-0">Patient Statistic</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Monthly', 'Weekly', 'Today'].map((stat) => (
                            <button
                                key={stat}
                                onClick={() => setSelectedStatistic(stat)}
                                className={`${selectedStatistic === stat ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-500'} px-3 py-1 rounded-full`}
                            >
                                {stat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <RecentPatientCard />
        </div>
    );
};

export default Dashboard;