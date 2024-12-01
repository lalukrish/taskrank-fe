import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Box from "@mui/material/Box";
import SigninPage from "./pages/signin";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/dashboard/navbar";
import SignupPage from "./pages/signup";
import Task from "./pages/task";
import TaskRank from "./pages/TaskRank";

function App() {
  const location = useLocation();

  const noSidebarRoutes = ["/", "/signup"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showSidebar && <Navbar />}
      <Box>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/taskpage" element={<Task />} />
          <Route path="/taskrank" element={<TaskRank />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
