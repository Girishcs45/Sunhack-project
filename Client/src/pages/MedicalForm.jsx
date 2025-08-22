import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { Stethoscope, Droplet, Ruler, Scale, HeartPulse, Shield, Soup, Cigarette, Dna, File, FileScan, Handshake, ChevronDown, ChevronUp, Syringe, GlassWater, Dumbbell, CalendarCheck, FileText, PersonStanding, Phone, Heart } from 'lucide-react';

// A simple collapsible section component to organize the form
function CollapsibleSection({ title, children, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 cursor-pointer">
      <div className="flex items-center justify-between" onClick={onToggle}>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {isOpen ? <ChevronUp size={24} className="text-gray-600" /> : <ChevronDown size={24} className="text-gray-600" />}
      </div>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[1000px] pt-4' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
}

// Main React component for the comprehensive medical form
function App() {
  // State to hold all form data, including new fields
  const [formData, setFormData] = useState({
    // Section 1: Basic Health Info
    bloodGroup: "",
    height: "",
    weight: "",
    diabetic: "no",
    diabeticDetails: "",
    hypertension: "no",
    hypertensionDetails: "",
    allergies: "no",
    allergyDetails: "",
    chronicDiseases: "no",
    chronicDiseaseDetails: "",

    // Section 2: Lifestyle & Habits
    smoker: "no",
    alcoholConsumption: "no",
    exerciseRoutine: "no",
    exerciseFrequency: "",

    // Section 3: Medical History
    previousSurgeries: "no",
    surgeryDetails: "",
    ongoingTreatments: "no",
    treatmentDetails: "",
    familyMedicalHistory: "no",
    familyHistoryDetails: "",

    // Section 4: Prescriptions & Records (using text fields for now)
    currentMedications: "",
    prescriptionNotes: "",
    labReportsNotes: "",

    // Section 5: Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: ""
  });

  // State to manage which sections are open
  const [openSection, setOpenSection] = useState('basicInfo');

  // State to manage Firebase, authentication, and loading status
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Firebase and set up authentication on component mount
  useEffect(() => {
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);
      
      setDb(firestore);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else if (initialAuthToken) {
          await signInWithCustomToken(firebaseAuth, initialAuthToken);
        } else {
          await signInAnonymously(firebaseAuth);
        }
        setIsAuthReady(true);
        setIsLoading(false);
      });
      
      return () => unsubscribe();

    } catch (error) {
      console.error("Error initializing Firebase:", error);
      setStatus("Error: Failed to initialize the database. Please try again.");
      setIsLoading(false);
    }
  }, []);

  // Handle changes to all form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission and save data to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus(null);

    if (!db || !userId) {
      setStatus("Error: Database connection is not ready.");
      setIsSaving(false);
      return;
    }

    try {
      // The path is private to the authenticated user
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const docRef = doc(db, `/artifacts/${appId}/users/${userId}/medical_info/patient_data`);

      // `setDoc` with `merge: true` is used to update the document with new fields
      // without overwriting existing data.
      await setDoc(docRef, formData, { merge: true });

      setStatus("Medical information saved successfully!");
      console.log("Medical form submitted and saved:", formData);

    } catch (error) {
      console.error("Error saving medical form:", error);
      setStatus("Error: Failed to save medical information.");
    } finally {
      setIsSaving(false);
    }
  };

  // Render a loading state while Firebase is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <svg className="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-4">Loading application...</p>
      </div>
    );
  }

  // Render the form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-white font-sans text-gray-800">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-5xl mx-4 my-8 p-10 sm:p-12 md:p-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Patient Medical Info</h2>
        <p className="text-gray-500 mb-8 text-center">Fill out your health records</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <CollapsibleSection
            title="1. Basic Health Info"
            isOpen={openSection === 'basicInfo'}
            onToggle={() => setOpenSection(openSection === 'basicInfo' ? null : 'basicInfo')}
          >
            <div className="space-y-6 mt-4">
              {/* Blood Group */}
              <div className="relative">
                <Droplet className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Height (cm)"
                    className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  />
                </div>
                <div className="relative">
                  <Scale className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Weight (kg)"
                    className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Diabetic */}
              <div className="relative">
                <Syringe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="diabetic"
                  value={formData.diabetic}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="no">Diabetic: No</option>
                  <option value="yes">Yes</option>
                </select>
                {formData.diabetic === "yes" && (
                  <textarea
                    name="diabeticDetails"
                    value={formData.diabeticDetails}
                    onChange={handleChange}
                    placeholder="Enter type and details of diabetes..."
                    className="w-full p-4 mt-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none h-20"
                  />
                )}
              </div>
            </div>
          </CollapsibleSection>
          
          <CollapsibleSection
            title="2. Lifestyle & Habits"
            isOpen={openSection === 'lifestyle'}
            onToggle={() => setOpenSection(openSection === 'lifestyle' ? null : 'lifestyle')}
          >
            <div className="space-y-6 mt-4">
              {/* Smoker */}
              <div className="relative">
                <Cigarette className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="smoker"
                  value={formData.smoker}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="no">Smoker: No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {/* Alcohol Consumption */}
              <div className="relative">
                <GlassWater className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="alcoholConsumption"
                  value={formData.alcoholConsumption}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="no">Alcohol Consumption: No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {/* Exercise Routine */}
              <div className="relative">
                <Dumbbell className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="exerciseRoutine"
                  value={formData.exerciseRoutine}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="no">Exercise Routine: No</option>
                  <option value="yes">Yes</option>
                </select>
                {formData.exerciseRoutine === "yes" && (
                  <input
                    type="text"
                    name="exerciseFrequency"
                    value={formData.exerciseFrequency}
                    onChange={handleChange}
                    placeholder="How often do you exercise?"
                    className="w-full p-4 mt-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  />
                )}
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="3. Medical History"
            isOpen={openSection === 'medicalHistory'}
            onToggle={() => setOpenSection(openSection === 'medicalHistory' ? null : 'medicalHistory')}
          >
            <div className="space-y-6 mt-4">
              {/* Previous Surgeries / Operations */}
              <div className="relative">
                <Stethoscope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="previousSurgeries"
                  value={formData.previousSurgeries}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="no">Previous Surgeries: No</option>
                  <option value="yes">Yes</option>
                </select>
                {formData.previousSurgeries === "yes" && (
                  <textarea
                    name="surgeryDetails"
                    value={formData.surgeryDetails}
                    onChange={handleChange}
                    placeholder="Add details & year of surgeries..."
                    className="w-full p-4 mt-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none h-20"
                  />
                )}
              </div>
              {/* Ongoing Treatments */}
              <div className="relative">
                <Syringe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="ongoingTreatments"
                  value={formData.ongoingTreatments}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="no">Ongoing Treatments: No</option>
                  <option value="yes">Yes</option>
                </select>
                {formData.ongoingTreatments === "yes" && (
                  <textarea
                    name="treatmentDetails"
                    value={formData.treatmentDetails}
                    onChange={handleChange}
                    placeholder="Add details of treatments..."
                    className="w-full p-4 mt-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none h-20"
                  />
                )}
              </div>
              {/* Family Medical History */}
              <div className="relative">
                <Dna className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="familyMedicalHistory"
                  value={formData.familyMedicalHistory}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                >
                  <option value="no">Family Medical History: No</option>
                  <option value="yes">Yes</option>
                </select>
                {formData.familyMedicalHistory === "yes" && (
                  <textarea
                    name="familyHistoryDetails"
                    value={formData.familyHistoryDetails}
                    onChange={handleChange}
                    placeholder="Add details (e.g., diabetes, heart disease)..."
                    className="w-full p-4 mt-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none h-20"
                  />
                )}
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="4. Prescriptions & Records"
            isOpen={openSection === 'prescriptions'}
            onToggle={() => setOpenSection(openSection === 'prescriptions' ? null : 'prescriptions')}
          >
            <div className="space-y-6 mt-4">
              {/* Current Medications */}
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <textarea
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="Enter medicine names and dosage..."
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none h-28"
                />
              </div>
              {/* Prescription & Lab Notes (text fields for now) */}
              <div className="relative">
                <File className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <textarea
                  name="prescriptionNotes"
                  value={formData.prescriptionNotes}
                  onChange={handleChange}
                  placeholder="Notes about prescriptions..."
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none h-28"
                />
              </div>
              <div className="relative">
                <FileScan className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <textarea
                  name="labReportsNotes"
                  value={formData.labReportsNotes}
                  onChange={handleChange}
                  placeholder="Notes about lab reports or scans..."
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none h-28"
                />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="5. Emergency Contact"
            isOpen={openSection === 'emergencyContact'}
            onToggle={() => setOpenSection(openSection === 'emergencyContact' ? null : 'emergencyContact')}
          >
            <div className="space-y-6 mt-4">
              {/* Name */}
              <div className="relative">
                <PersonStanding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  placeholder="Contact's Full Name"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                />
              </div>
              {/* Relation */}
              <div className="relative">
                <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleChange}
                  placeholder="e.g. Spouse, Parent, Sibling"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                />
              </div>
              {/* Phone Number */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="e.g. 123-456-7890"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition font-semibold text-lg shadow-md disabled:bg-green-400"
            disabled={isSaving || !isAuthReady}
          >
            {isSaving ? "Saving..." : "Save Medical Info"}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 text-center text-sm font-medium ${status.startsWith("Error") ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
