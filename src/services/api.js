import axios from "axios";
import {store} from "../redux/store.js"
import { refreshToken } from "../redux/userSlice.js";
import { jwtDecode } from "jwt-decode";

// Instance WITHOUT auth (for public requests)
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Instance WITH auth (for protected requests)
export const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const refreshAccessToken = async () => {
    try {   
        // Use api instance instead of axios directly to ensure consistent config
        const response = await api.post(
            "/api/reader/account/refresh-token", 
            {}, // Empty body is fine since we're using cookies
            { withCredentials: true }
        );

        if (response.data.success) {
            const newToken = response.data.accessToken;
            store.dispatch(refreshToken(newToken)); 
            return newToken;
        } else {
            throw new Error("Failed to refresh token");
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

// Request interceptor
apiAuth.interceptors.request.use(
    async (config) => {
        try {
            // Get token from Redux state instead of cookies for consistency
            const state = store.getState();
            const token = state.user?.token; // Adjust path based on your Redux structure
            
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp < currentTime) {
                        if (!isRefreshing) {
                            isRefreshing = true;
                            const newToken = await refreshAccessToken();
                            isRefreshing = false;

                            if (newToken) {
                                config.headers.Authorization = `Bearer ${newToken}`;
                                processQueue(null, newToken);
                            } else {
                                processQueue(new Error("Failed to refresh token"));
                                return Promise.reject("Token refresh failed");
                            }
                        } else {
                            return new Promise((resolve, reject) => {
                                failedQueue.push({
                                    resolve: (token) => {
                                        config.headers.Authorization = `Bearer ${token}`;
                                        resolve(config);
                                    },
                                    reject
                                });
                            });
                        }
                    } else {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    console.error("Invalid token:", error);
                }
            }
        } catch (error) {
            console.error("Token retrieval error:", error);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - similar fixes as request interceptor
apiAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const newToken = await refreshAccessToken();
                    isRefreshing = false;

                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        processQueue(null, newToken);
                        return axios(originalRequest);
                    } else {
                        processQueue(new Error("Failed to refresh token"));
                        // Handle navigation properly - don't use navigate here directly
                        window.location.href = "/login"; // Basic solution
                        return Promise.reject("Token refresh failed");
                    }
                } catch (refreshError) {
                    isRefreshing = false;
                    processQueue(refreshError);
                    window.location.href = "/login"; // Basic solution
                    return Promise.reject(refreshError);
                }
            } else {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(axios(originalRequest));
                        },
                        reject: (err) => {
                            reject(err);
                        }
                    });
                });
            }
        }

        return Promise.reject(error);
    }
);