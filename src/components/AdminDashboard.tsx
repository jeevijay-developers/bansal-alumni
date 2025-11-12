import { useState, useEffect } from "react";
import { ArrowLeft, Download, LogOut, Eye, Search } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { AlumniRegistration } from "../types/alumni";

interface AdminDashboardProps {
  onNavigateToHome: () => void;
}

// Static admin credentials - DO NOT CHANGE
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "bansal@2025",
};

export default function AdminDashboard({
  onNavigateToHome,
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registrations, setRegistrations] = useState<AlumniRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] =
    useState<AlumniRegistration | null>(null);

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch registrations when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setUsername("");
    setPassword("");
    onNavigateToHome();
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("alumni_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Father's Name",
      "Course/Program",
      "Selected JEE",
      "Selected NEET",
      "Exam Rank",
      "College Joined",
      "Stream Taken",
      "PG Completed",
      "PG Stream",
      "PG Completion Year",
      "Other Exams",
      "Address",
      "Company Name",
      "Currently Working",
      "Position/Role",
      "Work From Year",
      "Work To Year",
      "Total Experience",
      "Roles",
      "Industries",
      "Skills",
      "Registration Date",
    ];

    const csvData = registrations.map((reg) => [
      reg.id || "",
      reg.full_name || "",
      reg.father_name || "",
      reg.course_program || "",
      reg.competitive_exam || "",
      reg.bansal_study_year || "",
      reg.selection_year || "",
      reg.exam_rank || "",
      reg.college_joined || "",
      reg.stream_taken || "",
      reg.pg_completed ? "Yes" : "No",
      reg.pg_stream || "",
      reg.pg_completion_year || "",
      reg.other_exams || "",
      reg.address || "",
      reg.company_name || "",
      reg.currently_working ? "Yes" : "No",
      reg.position_role || "",
      reg.work_from_year || "",
      reg.work_to_year || "",
      reg.total_experience || "",
      reg.roles?.join("; ") || "",
      reg.industries?.join("; ") || "",
      reg.skills?.join("; ") || "",
      reg.created_at ? new Date(reg.created_at).toLocaleString() : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `bansal_alumni_registrations_${
        new Date().toISOString().split("T")[0]
      }.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.father_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.college_joined?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <LogOut className="w-8 h-8 text-white transform rotate-180" />
            </div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">BANSAL Alumni Association Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-700 text-white py-3 rounded-lg hover:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Login
            </button>
          </form>

          <button
            onClick={onNavigateToHome}
            className="mt-6 w-full text-primary-700 hover:text-primary-900 text-sm font-medium flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                BANSAL Alumni Registrations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToCSV}
                disabled={registrations.length === 0}
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Total Registrations
            </h3>
            <p className="text-3xl font-bold text-primary-900">
              {registrations.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Currently Working
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {registrations.filter((r) => r.currently_working).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              PG Completed
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {registrations.filter((r) => r.pg_completed).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, college, or company..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading registrations...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">No registrations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      College
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stream
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRegistrations.map((registration) => (
                    <tr
                      key={registration.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {registration.full_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {registration.father_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.college_joined}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.stream_taken}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.company_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.position_role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registration.created_at
                          ? new Date(
                              registration.created_at
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedRecord(registration)}
                          className="text-primary-700 hover:text-primary-900 font-medium inline-flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-primary-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Registration Details</h2>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Full Name
                  </h3>
                  <p className="text-gray-900">{selectedRecord.full_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Father's Name
                  </h3>
                  <p className="text-gray-900">{selectedRecord.father_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Course/Program
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.course_program}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    College
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.college_joined}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Stream
                  </h3>
                  <p className="text-gray-900">{selectedRecord.stream_taken}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Exam Rank
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.exam_rank || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Company
                  </h3>
                  <p className="text-gray-900">{selectedRecord.company_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Position
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.position_role}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Experience
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.total_experience} years
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Currently Working
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.currently_working ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Address
                </h3>
                <p className="text-gray-900">{selectedRecord.address}</p>
              </div>

              {selectedRecord.roles && selectedRecord.roles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Roles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.roles.map((role, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedRecord.industries &&
                selectedRecord.industries.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      Industries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.industries.map((industry, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {selectedRecord.skills && selectedRecord.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
