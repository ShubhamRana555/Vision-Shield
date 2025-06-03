import { useState } from "react";
import { Search } from "lucide-react";
import api from "../services/api";

const VehicleSearch = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!vehicleNumber.trim()) {
      setError("Please enter a license plate number");
      return;
    }

    setLoading(true);
    setError(null);
    setVehicleDetails(null);

    try {
      console.log("Searching for:", vehicleNumber);
      const data = await api.searchVehicle(vehicleNumber);
      console.log("Received data:", data);
      setVehicleDetails(data);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Failed to fetch vehicle details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString || dateTimeString === 'Unknown') return 'Unknown';
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString();
    } catch (e) {
      return dateTimeString;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 border dark:border-gray-700 transition-all">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-white">
          Vehicle Lookup
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter License Plate Number"
            className="w-full flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
            disabled={loading}
          >
            <Search size={18} /> {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Searching database...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {vehicleDetails && !loading && (
          <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm space-y-4 text-gray-800 dark:text-gray-200 transition-all border border-blue-200 dark:border-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚗</span>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">License Plate</p>
                <p className="font-semibold">{vehicleDetails.licensePlate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-semibold">{vehicleDetails.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                <p className="font-semibold">{formatDateTime(vehicleDetails.endTime)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSearch;
