"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../api/authService";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login(username, password);
            localStorage.setItem("access_token", data.access_token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Front Desk Login
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />

                {error && (
                    <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
