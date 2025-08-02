"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../api/axiosInstance";


//interface for checking
interface Doctor {
    id: number;
    name: string;

}

export default function Dashboard() {
    const router = useRouter();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/login");
            return;
        }
        const fetchDoctors = async () => {
            try {
                const res = await axiosInstance.get<Doctor[]>("/doctors");
                setDoctors(res.data);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("access_token");
                    router.push("/login");
                } else {
                    setError("Failed to load doctors.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        router.push("/login");
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-700">Doctors List</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
                >
                    Logout
                </button>
            </div>

            {error && (
                <p className="text-center text-red-600 font-semibold mb-4">{error}</p>
            )}

            {doctors.length === 0 ? (
                <p className="text-center text-gray-600">No doctors found.</p>
            ) : (
                //displaying the doctors if found
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {doctors.map((doctor) => (
                        <li
                            key={doctor.id}
                            className="p-4 border rounded shadow hover:shadow-md transition"
                        >
                            <p className="text-lg font-semibold text-gray-700">{doctor.name}</p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
