'use client';

import axios from 'axios';

/**
 * Centralized API Client with Axios Interceptors
 *
 * Provides consistent API communication with:
 * - Request/response logging for debugging
 * - Automatic error handling and retries
 * - Request timeout configuration
 * - Standardized error responses
 * - Loading state management
 * - Authentication header handling (future-ready)
 */

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and adding auth headers
apiClient.interceptors.request.use(
  (config) => {
    // Testinn
    if (process.env.NODE_ENV === 'development') {
      console.log('API Requestt:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data
      });
    }

    // Add authorization header if token exists (guest token system)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      if (process.env.NODE_ENV === 'development') {
        console.log('🔑 Auth header added:', token.substring(0, 20) + '...');
      }
    }

    // Add request timestamp
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const endTime = new Date();
    const duration = response.config?.metadata ? endTime - response.config.metadata.startTime : 0;

    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        duration: `${duration}ms`,
        data: response.data
      });
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Calculate request duration if available
    let duration = 'unknown';
    if (originalRequest?.metadata?.startTime) {
      const endTime = new Date();
      duration = `${endTime - originalRequest.metadata.startTime}ms`;
    }

    // Log error details
    console.error('❌ API Error:', {
      method: originalRequest?.method?.toUpperCase(),
      url: originalRequest?.url,
      status: error.response?.status,
      duration,
      message: error.message,
      data: error.response?.data
    });

    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth token and redirect to login (future implementation)
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            // window.location.href = '/login';
          }
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.warn('⚠️ Access forbidden. User may not have required permissions.');
          break;

        case 429:
          // Rate limiting - implement retry logic
          if (!originalRequest._retry && originalRequest._retryCount < 3) {
            originalRequest._retry = true;
            originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

            // Wait before retrying (exponential backoff)
            const delay = Math.pow(2, originalRequest._retryCount) * 1000;
            console.log(`🔄 Retrying request in ${delay}ms (attempt ${originalRequest._retryCount})`);

            await new Promise(resolve => setTimeout(resolve, delay));
            return apiClient(originalRequest);
          }
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors - implement retry for idempotent requests
          if (
            !originalRequest._retry &&
            originalRequest._retryCount < 2 &&
            ['GET', 'PUT', 'DELETE'].includes(originalRequest.method?.toUpperCase())
          ) {
            originalRequest._retry = true;
            originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

            const delay = 2000; // 2 seconds for server errors
            console.log(`🔄 Retrying request due to server error in ${delay}ms (attempt ${originalRequest._retryCount})`);

            await new Promise(resolve => setTimeout(resolve, delay));
            return apiClient(originalRequest);
          }
          break;
      }

      // Return standardized error object
      return Promise.reject({
        message: data?.error || data?.message || 'An error occurred',
        status,
        data,
        isApiError: true
      });
    }

    if (error.request) {
      // Network error or no response received
      console.error('🌐 Network Error: No response received');
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        status: 0,
        isNetworkError: true
      });
    }

    // Request setup error
    return Promise.reject({
      message: error.message || 'Request configuration error',
      isConfigError: true
    });
  }
);

/**
 * API Methods for common operations
 */
export const api = {
  // AI Assistant API
  getAIAssistance: async (prompt, currentText, language = 'en') => {
    const response = await apiClient.post('/api/ai-assist', {
      prompt,
      currentText,
      language
    });
    return response.data;
  },

  // Application Submission API
  submitApplication: async (formData) => {
    const response = await apiClient.post('/api/submit-application', formData);
    return response.data;
  },

  // Generic methods for future use
  get: async (url, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  post: async (url, data, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  put: async (url, data, config = {}) => {
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
  }
};

export default apiClient;