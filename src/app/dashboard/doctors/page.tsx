"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    gender?: string;
    location?: string;
    availability?: { day: string; startTime: string; endTime: string }[];
}

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axiosInstance.get<Doctor[]>("/doctors");
                setDoctors(res.data);
            } catch {
                setError("Failed to load doctors");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const deleteDoctor = async (id: number) => {
        if (!confirm("Delete this doctor?")) return;
        try {
            await axiosInstance.delete(`/doctors/${id}`);
            setDoctors((prev) => prev.filter((d) => d.id !== id));
        } catch {
            alert("Failed to delete doctor");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
        );
    if (error)
        return (
            <p className="text-center text-red-600 font-semibold mt-4">{error}</p>
        );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-700">Doctors</h1>

            {doctors.length === 0 ? (
                <p className="text-center text-gray-600">No doctors found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                {[
                                    "Name",
                                    "Specialization",
                                    "Gender",
                                    "Location",
                                    "Actions",
                                ].map((head) => (
                                    <th
                                        key={head}
                                        className="border border-gray-300 p-3 text-left font-semibold text-gray-700 text-sm"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor) => (
                                <tr
                                    key={doctor.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="border border-gray-300 p-3 text-sm">
                                        {doctor.name}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm">
                                        {doctor.specialization}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm">
                                        {doctor.gender || "-"}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm">
                                        {doctor.location || "-"}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm space-x-2">
                                        <button
                                            onClick={() => deleteDoctor(doctor.id)}
                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
                                        >
                                            Delete
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
