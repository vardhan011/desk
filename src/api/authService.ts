// src/api/authService.ts
import axiosInstance from './axiosInstance';

export interface AuthResponse {
    access_token: string;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
    const response = await axiosInstance.post('/auth/login', { username, password });
    return response.data;
}


export async function register(username: string, password: string): Promise<void> {
    await axiosInstance.post('/auth/register', { username, password });
}
