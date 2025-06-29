import { useContext } from 'react';
import { StudentContext } from './StudentContext';

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
}; 