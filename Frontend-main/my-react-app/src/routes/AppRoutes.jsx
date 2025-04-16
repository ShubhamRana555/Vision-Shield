// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Home from "../pages/Home";
// import Implementation from "../pages/Implementation";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Predict from "../pages/Predict";
// import Dashboard from "../pages/Dashboard";
// import VehicleSearch from "../pages/VehicleSearch";



// const AppRoutes = () => {
//   return (
//     <>
//     <BrowserRouter>
//     <div className="flex">
//         <Sidebar />
//         <div className="flex-1 flex flex-col">
//           <Navbar />
          
//           {/* Main page content */}
//           <main className="p-4">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/implementation" element={<Implementation />} />
//               <Route path="/predict" element={<Predict />} />
//               <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Add here */}
//               <Route path="/VehicleSearch" element={<VehicleSearch />} /> {/* ✅ Add here */}
//               {/* Add more routes as needed */}
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </BrowserRouter>
//     </>
//   );
// };

// export default AppRoutes;


// // <BrowserRouter>
// //       {/* These are shared across all routes */}
//       // <div className="flex">
//       //   <Sidebar />
//       //   <div className="flex-1 flex flex-col">
//       //     <Navbar />
          
//       //     {/* Main page content */}
//       //     <main className="p-4">
//       //       <Routes>
//       //         <Route path="/" element={<Home />} />
//       //         <Route path="/implementation" element={<Implementation />} />
//       //         <Route path="/predict" element={<Predict />} />
//       //         {/* Add more routes as needed */}
//       //       </Routes>
//       //     </main>
//       //   </div>
//       // </div>
// //     </BrowserRouter>



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Predict from "../pages/Predict";
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
                <Route path="/predict" element={<Predict />} />
                <Route path="/vehiclesearch" element={<VehicleSearch />} />
                <Route path="/implementation" element={<Implementation />} />
              </Route>
              </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
