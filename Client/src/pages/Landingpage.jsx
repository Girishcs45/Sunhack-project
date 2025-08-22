import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-green-600">HealthLock</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Securely share and access medical records in seconds.  
          Role-based access, QR authentication, and full control.
        </p>

        {/* Toggle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Patient */}
          <div
            onClick={() => navigate("/signup")}
            className="cursor-pointer bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:border-green-500 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Patient</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Upload your medical reports and generate secure QR codes  
              to share with doctors instantly.
            </p>
          </div>

          {/* Doctor */}
          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:border-green-500 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Doctor</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Scan QR codes to access patient history.  
              Get complete, secure medical insights in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 py-16 px-8 md:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose HealthLock?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2 text-green-600">🔒 Secure</h3>
            <p className="text-gray-600 text-sm">
              End-to-end encryption ensures your health data  
              is always protected and accessible only by you.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2 text-green-600">⚡ Fast Access</h3>
            <p className="text-gray-600 text-sm">
              Share reports with doctors instantly using  
              time-limited QR codes.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2 text-green-600">📊 Organized</h3>
            <p className="text-gray-600 text-sm">
              Keep all your health records in one place,  
              accessible anytime, anywhere.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
