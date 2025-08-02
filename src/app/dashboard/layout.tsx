"use client";

import React from "react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <nav className="w-64 bg-white shadow-lg p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8 text-gray-700">Dashboard</h2>
                <ul className="space-y-3">
                    <li>
                        <Link
                            href="/dashboard"
                            className="block text-gray-700 hover:text-blue-600 transition"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/queue"
                            className="block text-gray-700 hover:text-blue-600 transition"
                        >
                            Queue Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/appointments"
                            className="block text-gray-700 hover:text-blue-600 transition"
                        >
                            Appointment Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/doctors"
                            className="block text-gray-700 hover:text-blue-600 transition"
                        >
                            Doctor Management
                        </Link>
                    </li>
                </ul>
            </nav>
            <main className="flex-grow p-6 max-w-full overflow-auto">{children}</main>
        </div>
    );
}
