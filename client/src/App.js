import React from "react";
import { Button } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import Userslist from "./pages/admin/Userslist";
import Doctorslist from "./pages/admin/Doctorslist";
import Profile from "./pages/Doctor/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status">
            {/* <span class="sr-only">Loading...</span> */}
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}></Route>
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>}></Route>
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>}></Route>
        <Route path="/admin/userslist" element={<ProtectedRoute><Userslist /></ProtectedRoute>}></Route>
        <Route path="/admin/doctorslist" element={<ProtectedRoute><Doctorslist /></ProtectedRoute>}></Route>
        <Route path="/doctor/profile/:userId" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path="/book-appointment/:doctorId" element={<ProtectedRoute><BookAppointment/></ProtectedRoute>}></Route>
        <Route path="/appointments" element={<ProtectedRoute><Appointments/></ProtectedRoute>}></Route>
        <Route path="/doctor/appointments" element={<ProtectedRoute><DoctorAppointments/></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
