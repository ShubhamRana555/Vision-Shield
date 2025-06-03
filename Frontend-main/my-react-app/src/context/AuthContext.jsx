import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    try {
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('userData');
      
      if (token && userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          setUser({ token, ...userData });
        } catch (e) {
          // If JSON parsing fails, clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          setUser(null);
        }
      }
    } catch (e) {
      // Handle any localStorage errors
      console.error('Error accessing localStorage:', e);
    }
    setLoading(false);
  }, []);

  const login = (token, userData = {}) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser({ token, ...userData });
    } catch (e) {
      console.error('Error saving auth data:', e);
    }
  };

  const signOut = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setUser(null);
    } catch (e) {
      console.error('Error clearing auth data:', e);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
