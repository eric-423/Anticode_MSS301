import { createContext, useState } from 'react';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [isStudent, setIsStudent] = useState(false);

  const value = {
    isStudent,
    setIsStudent
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext }; 