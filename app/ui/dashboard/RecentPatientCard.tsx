import Link from 'next/link';
import React from 'react';

type Patient = {
    name: string;
    location: string;
    imageUrl: string;
};

const patients: Patient[] = [
    { name: 'Mr. John Doe', location: 'Springfield', imageUrl: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg' },
    { name: 'Mrs. Alice Johnson', location: 'Meadowville', imageUrl: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg' },
    { name: 'Mr. Robert Smith', location: 'Greenfield', imageUrl: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg' },
];

const RecentPatientCard = () => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-xs">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Patient</h2>
                <Link href="add-patient" className="text-green-500 text-sm">View more &gt;&gt;</Link>
            </div>
            <div className="mt-4 space-y-4">
                {patients.map((patient, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img
                            src={patient.imageUrl}
                            alt={patient.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500">{patient.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPatientCard;
