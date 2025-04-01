import axios from "axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const navigate = useNavigate;

// Instance WITHOUT auth (for public requests)
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    console.log("API Request Headers:", config.headers);
    return config;
});

// withCredentials: true, // Gửi cookie, session
// Instance WITH auth (for protected requests)
export const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Queue of failed requests to retry after token refresh
let failedQueue = [];

// Process the queue of failed requests
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

// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/reader/account/refresh-token`,
            { refreshToken }
        );

        if (response.data.success) {
            localStorage.setItem("token", response.data.token || response.data.accessToken);
            return response.data.token || response.data.accessToken;
        } else {
            throw new Error("Failed to refresh token");
        }
    } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        return null;
    }
};

// Request interceptor
apiAuth.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                // If token is expired, try to refresh it
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
                            navigate("/login");
                            return Promise.reject("Token refresh failed");
                        }
                    } else {
                        // If refresh is already in progress, queue this request
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
                    // Token is still valid
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                navigate("/login");
                return Promise.reject(error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const newToken = await refreshAccessToken();
                    isRefreshing = false;

                    if (newToken) {
                        // Retry the original request with new token
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        processQueue(null, newToken);
                        return axios(originalRequest);
                    } else {
                        processQueue(new Error("Failed to refresh token"));
                        navigate("/login");
                        return Promise.reject("Token refresh failed");
                    }
                } catch (refreshError) {
                    isRefreshing = false;
                    processQueue(refreshError);
                    navigate("/login");
                    return Promise.reject(refreshError);
                }
            } else {
                // If refresh is already in progress, queue this request
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