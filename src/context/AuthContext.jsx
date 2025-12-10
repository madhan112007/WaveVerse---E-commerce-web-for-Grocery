import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock users database (in real app, this would be API calls)
  const mockUsers = [
    {
      id: 1,
      email: 'admin@waveverse.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      email: 'user@example.com',
      password: 'user123',
      name: 'John Doe',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = sessionStorage.getItem('waveverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      sessionStorage.setItem('waveverse_user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: userData.role || 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=6fbf73&color=fff`
      };

      // Add to mock database
      mockUsers.push({ ...newUser, password: userData.password });
      
      // Show success message based on role
      const roleMessage = userData.role === 'admin' 
        ? 'Admin account created successfully! You now have full access to manage the platform.'
        : 'User account created successfully! Welcome to WaveVerse!';
      
      console.log(roleMessage);
      
      setUser(newUser);
      sessionStorage.setItem('waveverse_user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('waveverse_user');
    // Also clear cart and wishlist on logout
    sessionStorage.removeItem('waveverse_cart');
    sessionStorage.removeItem('waveverse_wishlist');
  };

  const forgotPassword = async (email) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      if (!foundUser) {
        throw new Error('No user found with this email address');
      }

      // In real app, this would send an email
      return { success: true, message: 'Password reset link sent to your email' };
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const updateProfile = async (updates) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      sessionStorage.setItem('waveverse_user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    updateProfile,
    isAdmin,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};