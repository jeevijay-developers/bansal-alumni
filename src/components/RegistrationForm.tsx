import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { AlumniRegistration } from "../types/alumni";

interface RegistrationFormProps {
  onNavigateToHome: () => void;
}

export default function RegistrationForm({
  onNavigateToHome,
}: RegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate year ranges for Bansal study years (1981-82 to 2024-25)
  const generateBansalStudyYears = () => {
    const years = [];
    for (let year = 1981; year <= 2024; year++) {
      years.push(`${year}-${(year + 1).toString().slice(-2)}`);
    }
    return years;
  };

  // Generate selection years (1981 to 2025)
  const generateSelectionYears = () => {
    const years = [];
    for (let year = 1981; year <= 2025; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const [formData, setFormData] = useState<AlumniRegistration>({
    full_name: "",
    father_name: "",
    email: "",
    phone_number: "",
    course_program: "",
    competitive_exam: "",
    bansal_study_year: "",
    selection_year: "",
    exam_rank: null,
    college_joined: "",
    stream_taken: "",
    pg_completed: false,
    pg_stream: "",
    pg_completion_year: null,
    other_exams: "",
    address: "",
    linkedin_profile: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? null : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: submitError } = await supabase
        .from("alumni_registrations")
        .insert([formData]);

      if (submitError) throw submitError;

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during submission"
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      full_name: "",
      father_name: "",
      email: "",
      phone_number: "",
      course_program: "",
      competitive_exam: "",
      bansal_study_year: "",
      selection_year: "",
      exam_rank: null,
      college_joined: "",
      stream_taken: "",
      pg_completed: false,
      pg_stream: "",
      pg_completion_year: null,
      other_exams: "",
      address: "",
      linkedin_profile: "",
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="max-w-2xl w-full  rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-50" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-lg text-primary-700 mb-8">
            Thank you for joining our Alumni Network! We'll get in touch soon
            with more information about upcoming events and opportunities.
          </p>
          <button
            onClick={onNavigateToHome}
            className="inline-flex items-center space-x-2 bg-primary text-primary-50 px-8 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onNavigateToHome}
          className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className=" rounded-2xl shadow-xl p-6 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-3">
              Alumni Registration Form
            </h1>
            <p className="text-primary-700">
              Join our network and stay connected with fellow achievers
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-primary-100 border border-primary-200 rounded-lg p-4 flex items-start space-x-3">
              <X className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary-900">Error</h3>
                <p className="text-primary-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <section className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal & Academic Details
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter father's name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  name="linkedin_profile"
                  value={formData.linkedin_profile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course/Program You Pursued
                </label>
                <input
                  type="text"
                  name="course_program"
                  value={formData.course_program}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., B.Tech Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  In which year did you study at Bansal Classes?
                </label>
                <select
                  name="bansal_study_year"
                  value={formData.bansal_study_year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Year</option>
                  {generateBansalStudyYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Competitive Exam
                </label>
                <select
                  name="competitive_exam"
                  value={formData.competitive_exam}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Exam</option>
                  <option value="JEE ADVANCED">JEE ADVANCED</option>
                  <option value="NEET">NEET</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    In which year did you get selection?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="selection_year"
                    value={formData.selection_year}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Year</option>
                    <option value="unselected">Unselected</option>
                    {generateSelectionYears().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rank in Competitive Exam
                  </label>
                  <input
                    type="number"
                    name="exam_rank"
                    value={formData.exam_rank || ""}
                    onChange={handleInputChange}
                    min="1"
                    max="15000"
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="1-15000"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    College Joined
                  </label>
                  <input
                    type="text"
                    name="college_joined"
                    value={formData.college_joined}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., IIT Delhi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stream Taken
                  </label>
                  <input
                    type="text"
                    name="stream_taken"
                    value={formData.stream_taken}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Post-Graduation Details
                </h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PG Completed?
                  </label>
                  <select
                    name="pg_completed"
                    value={formData.pg_completed ? "true" : "false"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pg_completed: e.target.value === "true",
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                {formData.pg_completed && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PG Stream Name
                      </label>
                      <input
                        type="text"
                        name="pg_stream"
                        value={formData.pg_stream}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., MBA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PG Completion Year
                      </label>
                      <input
                        type="number"
                        name="pg_completion_year"
                        value={formData.pg_completion_year || ""}
                        onChange={handleInputChange}
                        min="1990"
                        max={new Date().getFullYear()}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Year"
                      />
                    </div>
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Other Competitive Exams
                </label>
                <input
                  type="text"
                  name="other_exams"
                  value={formData.other_exams}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., GATE, CAT, UPSC"
                />
              </div>
            </section>

            <section className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Permanent Address
                </h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your complete address"
                />
              </div>
            </section>

            <div className="pt-6 border-t border-gray-200">
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-white text-primary-700 py-4 rounded-lg border-2 border-primary-700 hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-bold"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-700 text-white py-4 rounded-lg hover:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
