

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
// import Predict from "../pages/Predict";
import VehicleSearch from "../pages/VehicleSearch";
import Implementation from "../pages/Implementation";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../utilities/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
              <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vehiclesearch" element={<VehicleSearch />} />
                <Route path="/implementation" element={<Implementation />} />
              </Route>
              </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
