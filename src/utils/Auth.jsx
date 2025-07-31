// Authentication utility functions

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token && token.length > 10; // Basic validation
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("cart");
  localStorage.removeItem("redirectAfterLogin");
};

export const logout = () => {
  removeToken();
  window.location.href = "/login";
};

// Optional: Add token expiration check
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // If your JWT tokens have expiration, decode and check here
    // For now, we'll assume tokens don't expire
    return false;
  } catch (error) {
    return true;
  }
};

// API call wrapper with auth
export const authenticatedFetch = async (url, options = {}) => {
  const token = getToken();

  if (!token) {
    logout();
    return null;
  }

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, authOptions);

    // If unauthorized, logout user
    if (response.status === 401) {
      logout();
      return null;
    }

    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
