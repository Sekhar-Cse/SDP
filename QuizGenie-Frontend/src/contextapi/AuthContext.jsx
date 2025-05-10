import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component to manage login states and user data
export function AuthProvider({ children }) {
  // Load initial state from sessionStorage or default to false/null
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(() => {
    return sessionStorage.getItem('isStudentLoggedIn') === 'true';
  });

  const [isExaminerLoggedIn, setIsExaminerLoggedIn] = useState(() => {
    return sessionStorage.getItem('isExaminerLoggedIn') === 'true';
  });

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    sessionStorage.setItem('isStudentLoggedIn', isStudentLoggedIn);
    sessionStorage.setItem('isExaminerLoggedIn', isExaminerLoggedIn);
  }, [isAdminLoggedIn, isStudentLoggedIn, isExaminerLoggedIn]);

  // Logout functionality
  const logout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('isStudentLoggedIn');
    sessionStorage.removeItem('isExaminerLoggedIn');
    
    setIsAdminLoggedIn(false);
    setIsStudentLoggedIn(false);
    setIsExaminerLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isStudentLoggedIn,
        setIsStudentLoggedIn,
        isExaminerLoggedIn,
        setIsExaminerLoggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);
