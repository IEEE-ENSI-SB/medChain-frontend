"use client";
import { useState } from "react";

interface Appointment {
    patient: {
        avatar: string;
        name: string;
        email: string;
        mobile: string;
    };
    bookingDate: string;
    appointmentDate: string;
    from: string;
    to: string;
    doctor: {
        name: string;
        email: string;
        mobile: string;
    };
    appointmentId: string;
}

const Appointments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [appointments, setAppointments] = useState<Appointment[]>([
    {
        patient: {
            avatar: "/path/to/avatar.jpg",
            name: "Mr. sami abdallah",
            email: "samiabdallah@gmail.com",
            mobile: "+21699111222",
        },
        bookingDate: "10/10/2024, 05:26:58 PM",
        appointmentDate: "2024-10-14",
        from: "10:31 PM",
        to: "1:34 PM",
        doctor: {
            name: "Dr. mouhammed amine",
            email: "dr.mouhammedamine@gmail.com",
            mobile: "+21699111444",
        },
        appointmentId: "APT2024",
    },
    {
        patient: {
            avatar: "/path/to/avatar.jpg",
            name: "Mr. iheb jlassi",
            email: "ihebjlassi@gmail.com",
            mobile: "+21699111222",
        },
        bookingDate: "10/10/2024, 05:26:58 PM",
        appointmentDate: "2024-10-14",
        from: "10:31 PM",
        to: "1:34 PM",
        doctor: {
            name: "Dr. mouhammed amine",
            email: "dr.mouhammedamine@gmail.com",
            mobile: "+21699111444",
        },
        appointmentId: "APT2022",
    },
    {
        patient: {
            avatar: "/path/to/avatar.jpg",
            name: "Mr. sami abdallah",
            email: "samiabdallah@gmail.com",
            mobile: "+21699111222",
        },
        bookingDate: "10/10/2024, 05:26:58 PM",
        appointmentDate: "2024-10-14",
        from: "10:31 PM",
        to: "1:34 PM",
        doctor: {
            name: "Dr. mouhammed amine",
            email: "dr.mouhammedamine@gmail.com",
            mobile: "+21699111444",
        },
        appointmentId: "APT2024",
        },
]);
const filteredAppointments = appointments.filter(
    (appointment) =>
        appointment.patient.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        appointment.patient.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        appointment.patient.mobile.includes(searchTerm)
);



return (
    <div className="p-4 max-w-7xl mx-auto"> 
        <h1 className="text-2xl font-bold mb-4">All Appointments</h1>
        <div className="flex justify-between mb-4">
        <input
        type="text"
        className="p-2 border rounded-md w-64"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        />
    </div>

    <div className="overflow-x-auto"> 
        <table className="min-w-full bg-white border border-gray-200">
        <thead>
            <tr>
                <th className="px-4 py-2 text-left">Patient</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Booking Date</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">To</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left whitespace-nowrap items-center">Appointment ID</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Doctor Email</th>
                <th className="px-4 py-2 text-left">Doctor Mobile</th>
            </tr>
        </thead>
        <tbody>
            {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => (
                    <tr
                    key={index}
                    className="border-t hover:bg-gray-100" 
                >
                    <td className="px-4 py-2 flex items-center whitespace-nowrap hover:text-green-500"> 
                        {appointment.patient.avatar ? (
                        <img
                            src={appointment.patient.avatar}
                            alt="Patient Avatar"
                            width={40}
                            height={40}
                            className="rounded-full mr-2"
                    />
                    ) : (
                        <div
                            className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center mr-2"
                            style={{ minWidth: 40, minHeight: 40 }}
                        >
                        </div>
                    )}
                    {appointment.patient.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.patient.email}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.bookingDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.appointmentDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.from}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.to}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.patient.mobile}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.appointmentId}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.doctor.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.doctor.email}</td>
                    <td className="px-4 py-2 whitespace-nowrap hover:text-green-500">{appointment.doctor.mobile}</td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={11} className="text-center py-4">
                    No appointments found
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        </div>
    </div>
);
};

export default Appointments;


