import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import StudentNavBar from "./student/StudentNavBar";
import ExaminerNavBar from "./examiner/ExaminerNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

function AppContent() {
  const { isAdminLoggedIn, isStudentLoggedIn, isExaminerLoggedIn } = useAuth();

  return (
    <BrowserRouter>

      {isAdminLoggedIn ? (
        <AdminNavBar />
      ) : isStudentLoggedIn ? (
        <StudentNavBar />
      ) : isExaminerLoggedIn ? (
        <ExaminerNavBar />
      ) : (
        <MainNavBar />
      )}
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
