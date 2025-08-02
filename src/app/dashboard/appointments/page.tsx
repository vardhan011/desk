"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../api/axiosInstance";

interface Appointment {
    id: number;
    doctorName: string;
    patientName: string;
    datetime: string;
}

export default function AppointmentsPage() {
    const router = useRouter();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [patientName, setPatientName] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [datetime, setDatetime] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        //gets the token from the storage
        if (!token) {
            router.push("/login");
            return;
        }
        //fetches the appointments
        const fetchAppointments = async () => {
            try {
                const res = await axiosInstance.get<Appointment[]>("/appointments");
                setAppointments(res.data);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("access_token");
                    router.push("/login");
                } else {
                    setError("Failed to load appointments.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [router]);

    const handleBookAppointment = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!patientName || !doctorName || !datetime) {
            setError("All fields are required");
            return;
        }
        try {
            const res = await axiosInstance.post<Appointment>("/appointments", {
                patientName,
                doctorName,
                datetime,
            });
            setAppointments((prev) => [...prev, res.data]);
            setPatientName("");
            setDoctorName("");
            setDatetime("");
        } catch {
            setError("Failed to book appointment");
        }
    };

    //cancel the appointments

    const handleCancel = async (id: number) => {
        if (!confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            await axiosInstance.delete(`/appointments/${id}`);
            setAppointments((prev) => prev.filter((a) => a.id !== id));
        } catch {
            alert("Failed to cancel appointment");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Appointment Management
            </h1>

            {error && (
                <div className="mb-4 text-center text-red-600 font-medium">{error}</div>
            )}

            <form
                onSubmit={handleBookAppointment}
                className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
            >
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                        Patient Name
                    </label>
                    <input
                        type="text"
                        placeholder="Patient Name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                        Doctor Name
                    </label>
                    <input
                        type="text"
                        placeholder="Doctor Name"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                        Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        value={datetime}
                        onChange={(e) => setDatetime(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
                >
                    Book Appointment
                </button>
            </form>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-600">No appointments scheduled.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                {["Patient", "Doctor", "Date & Time", "Actions"].map((heading) => (
                                    <th
                                        key={heading}
                                        className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt) => (
                                <tr
                                    key={appt.id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="border border-gray-300 p-3 text-sm">
                                        {appt.patientName}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm">
                                        {appt.doctorName}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm whitespace-nowrap">
                                        {new Date(appt.datetime).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm">
                                        <button
                                            onClick={() => handleCancel(appt.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
