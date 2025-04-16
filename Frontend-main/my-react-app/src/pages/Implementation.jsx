import myVideo from '../assets/demo.mp4'; // ✅ correct relative path

const Implementation = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="text-center my-10">
          <h1 className="text-4xl font-bold text-blue-800">Model Implementation</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            This section showcases the working of our project model. Watch the demo and explore the process flow below.
          </p>
        </div>
  
        {/* Video Section */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-3xl aspect-video shadow-lg rounded-xl overflow-hidden">
            <video width="770" controls>
            <source src={myVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
        </div>
  
        {/* Timeline / Process Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Process Overview</h2>
          <div className="space-y-4">
            {[
              "1. User inputs details about a car.",
              "2. The model processes and predicts output based on trained data.",
              "3. Results are shown including pricing, specs, and more.",
              "4. Option to explore further actions or analysis.",
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Implementation;
  