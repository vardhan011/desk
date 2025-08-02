"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../api/axiosInstance";

interface Patient {
    id: number;
    name: string;
}

interface QueueItem {
    id: number;
    status: "Waiting" | "With Doctor" | "Completed";
    queueNumber: number;
    priority: number;
    patient: Patient;
}

const statusMapFrontendToDisplay: Record<
    "waiting" | "with-doctor" | "completed",
    QueueItem["status"]
> = {
    waiting: "Waiting",
    "with-doctor": "With Doctor",
    completed: "Completed",
};

export default function QueuePage() {
    //states for changing
    const router = useRouter();
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/login");
            return;
        }

        //fetching the queue details

        const fetchQueue = async () => {
            try {
                const response = await axiosInstance.get<QueueItem[]>("/queue");
                setQueue(response.data);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("access_token");
                    router.push("/login");
                } else {
                    setError("Failed to load queue data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQueue();
    }, [router]);

    //updating the status

    const updateStatus = async (
        id: number,
        newStatusKey: "waiting" | "with-doctor" | "completed"
    ) => {
        try {
            await axiosInstance.patch(`/queue/${id}`, { status: newStatusKey });
            setQueue((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, status: statusMapFrontendToDisplay[newStatusKey] }
                        : item
                )
            );
        } catch {
            alert("Failed to update status");
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
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Queue Management</h1>

            {queue.length === 0 ? (
                <p className="text-center text-gray-600">No patients in queue.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                {["Patient Name", "Status", "Actions"].map((heading) => (
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
                            {queue.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="border border-gray-300 p-3 text-sm">
                                        {item.patient.name}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-sm">{item.status}</td>
                                    <td className="border border-gray-300 p-3 text-sm space-x-2">
                                        {item.status !== "Waiting" && (
                                            <button
                                                onClick={() => updateStatus(item.id, "waiting")}
                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                            >
                                                Mark Waiting
                                            </button>
                                        )}
                                        {item.status !== "With Doctor" && (
                                            <button
                                                onClick={() => updateStatus(item.id, "with-doctor")}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                            >
                                                With Doctor
                                            </button>
                                        )}
                                        {item.status !== "Completed" && (
                                            <button
                                                onClick={() => updateStatus(item.id, "completed")}
                                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                            >
                                                Completed
                                            </button>
                                        )}
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
