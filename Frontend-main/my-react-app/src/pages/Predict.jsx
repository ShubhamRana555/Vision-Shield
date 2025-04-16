import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";

const Predict = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult({
        owner: "Umesh Bisht",
        vehicle: "Hyundai Verna",
        plate: "UK07AB1234",
        rcStatus: "Active",
        registeredOn: "12-Oct-2019",
      });
    }, 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Smart Vehicle Recognition</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Upload & Image Preview */}
        <div className="flex-1">
          <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 text-center dark:border-gray-600">
            {!image ? (
              <>
                <UploadCloud className="mx-auto mb-4 text-gray-400 dark:text-gray-500" size={40} />
                <p className="text-gray-600 dark:text-gray-300">Upload an image of a number plate</p>
              </>
            ) : (
              <img src={image} alt="Plate Preview" className="w-full max-h-60 object-contain mx-auto" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4 block w-full text-sm text-gray-500 dark:text-gray-300"
            />
          </div>

          <button
            onClick={handlePredict}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!image || loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Predicting...
              </span>
            ) : (
              "Predict Vehicle Info"
            )}
          </button>
        </div>

        {/* Result Box */}
        {result && (
          <div className="flex-1 border dark:border-gray-700 rounded-lg p-5 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Vehicle Details</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Owner:</strong> {result.owner}</li>
              <li><strong>Vehicle:</strong> {result.vehicle}</li>
              <li><strong>Plate No:</strong> {result.plate}</li>
              <li><strong>RC Status:</strong> {result.rcStatus}</li>
              <li><strong>Registered On:</strong> {result.registeredOn}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
