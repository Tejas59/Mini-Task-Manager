import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import TaskTable from "./components/TaskTable";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userId = localStorage.getItem("id");
  if (!userId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterModal />}></Route>
        <Route path="/" element={<LoginModal />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <TaskTable />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
