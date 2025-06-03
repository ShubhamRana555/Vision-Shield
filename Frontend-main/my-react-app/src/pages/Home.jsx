// const Home = () => {
//     return (
        
//       <div className="bg-gray-50">
//         {/* Hero Section */}
//         <section className="h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col justify-center items-center text-center px-4">
//           <h1 className="text-5xl font-extrabold text-blue-900 mb-4 animate-fade-in">Smart Vehicle Recognition System</h1>
//           <p className="text-xl text-blue-800 mb-6 max-w-2xl animate-fade-in delay-200">
//             An AI-powered system to identify and fetch key vehicle details using number plates — optimized for real-world use cases.
//           </p>
//           <a href="/implementation" className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition-all animate-fade-in delay-300">
//             Watch Demo
//           </a>
//         </section>
  
//         {/* Features / Scope Section */}
//         <section className="py-16 bg-white">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Project Scope & Applications</h2>
  
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="bg-blue-100 p-6 rounded-xl shadow hover:scale-105 transition-transform">
//                 <h3 className="text-xl font-semibold mb-2">Real-Time Vehicle Detection</h3>
//                 <p className="text-gray-700">Identify vehicles through CCTV footage or user-uploaded videos/images.</p>
//               </div>
//               <div className="bg-blue-100 p-6 rounded-xl shadow hover:scale-105 transition-transform">
//                 <h3 className="text-xl font-semibold mb-2">Automated Number Plate Recognition</h3>
//                 <p className="text-gray-700">Leverage OCR & Deep Learning for accurate license plate recognition.</p>
//               </div>
//               <div className="bg-blue-100 p-6 rounded-xl shadow hover:scale-105 transition-transform">
//                 <h3 className="text-xl font-semibold mb-2">Fetch RTO Vehicle Info</h3>
//                 <p className="text-gray-700">Get vehicle owner details, registration date, and more using APIs.</p>
//               </div>
//               <div className="bg-blue-100 p-6 rounded-xl shadow hover:scale-105 transition-transform">
//                 <h3 className="text-xl font-semibold mb-2">Security & Surveillance</h3>
//                 <p className="text-gray-700">Used in parking, traffic management, and restricted access zones.</p>
//               </div>
//               <div className="bg-blue-100 p-6 rounded-xl shadow hover:scale-105 transition-transform">
//                 <h3 className="text-xl font-semibold mb-2">Transport Analytics</h3>
//                 <p className="text-gray-700">Analyze traffic flow, vehicle types, and patterns in smart cities.</p>
//               </div>
//               <div className="bg-blue-100 p-6 rounded-xl shadow hover:scale-105 transition-transform">
//                 <h3 className="text-xl font-semibold mb-2">Scalable Cloud Integration</h3>
//                 <p className="text-gray-700">Deploy the model using cloud services like AWS, GCP, or Azure.</p>
//               </div>
//             </div>
//           </div>
//         </section>
  
//         {/* Call to Action Section */}
//         <section className="bg-blue-600 text-white py-16">
//           <div className="max-w-4xl mx-auto text-center px-6">
//             <h2 className="text-3xl font-bold mb-4">Want to See It in Action?</h2>
//             <p className="mb-6 text-lg">Check out the implementation page to watch the model in action and understand how it works.</p>
//             <a href="/implementation" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition-all">
//               Go to Implementation
//             </a>
//           </div>
//         </section>
//       </div>
//     );
//   };
  
//   export default Home;
  

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 px-6 py-12">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
          Smart Vehicle Recognition System
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg">
          An AI-powered solution to identify and fetch vehicle details using number plate recognition — optimized for real-world scenarios.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="mt-12 flex justify-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link
          to="/implementation"
          className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-xl text-lg shadow-lg transition"
        >
          See Implementation
        </Link>
        <a
          href="#features"
          className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white py-3 px-6 rounded-xl text-lg shadow transition"
        >
          Explore Features
        </a>
      </motion.div>

      {/* Features */}
      <motion.div
        id="features"
        className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {[
          {
            title: "License Plate Recognition",
            desc: "Uses image processing & OCR to detect and extract number plates accurately.",
          },
          {
            title: "Real-Time Data Fetching",
            desc: "Pulls vehicle make, model, owner details from connected databases.",
          },
          {
            title: "Scalable Design",
            desc: "Built for integration with smart city infrastructure and traffic systems.",
          },
          {
            title: "Optimized for Edge Devices",
            desc: "Can run on low-resource devices like Raspberry Pi with camera modules.",
          },
          {
            title: "Secure & Compliant",
            desc: "Ensures data is encrypted and privacy laws are respected.",
          },
          {
            title: "User-Friendly Dashboard",
            desc: "Minimal UI with fast input and instant results.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
