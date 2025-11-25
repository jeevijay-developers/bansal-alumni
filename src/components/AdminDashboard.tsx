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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [updatingVerification, setUpdatingVerification] = useState<
    number | null
  >(null);

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

  const toggleVerification = async (id: number, currentStatus: boolean) => {
    setUpdatingVerification(id);
    try {
      const { error } = await supabase
        .from("alumni_registrations")
        .update({ verified: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === id ? { ...reg, verified: !currentStatus } : reg
        )
      );

      // Update selected record if it's the one being modified
      if (selectedRecord?.id === id) {
        setSelectedRecord({ ...selectedRecord, verified: !currentStatus });
      }
    } catch (error) {
      console.error("Error updating verification:", error);
      alert("Failed to update verification status");
    } finally {
      setUpdatingVerification(null);
    }
  };

  const exportToCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Father's Name",
      "Email",
      "Phone Number",
      "Course/Program",
      "Bansal Study Year",
      "Competitive Exam",
      "Selection Year",
      "Exam Rank",
      "College Joined",
      "Stream Taken",
      "PG Completed",
      "PG Stream",
      "PG Completion Year",
      "Other Exams",
      "Address",
      "LinkedIn Profile",
      "Verified",
      "Registration Date",
    ];

    const csvData = registrations.map((reg) => [
      reg.id || "",
      reg.full_name || "",
      reg.father_name || "",
      reg.email || "",
      reg.phone_number || "",
      reg.course_program || "",
      reg.bansal_study_year || "",
      reg.competitive_exam || "",
      reg.selection_year || "",
      reg.exam_rank || "",
      reg.college_joined || "",
      reg.stream_taken || "",
      reg.pg_completed ? "Yes" : "No",
      reg.pg_stream || "",
      reg.pg_completion_year || "",
      reg.other_exams || "",
      reg.address || "",
      reg.linkedin_profile || "",
      reg.verified ? "Yes" : "No",
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
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.college_joined?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.linkedin_profile?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRegistrations = filteredRegistrations.slice(
    startIndex,
    endIndex
  );

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              Verified
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {registrations.filter((r) => r.verified).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              LinkedIn Profiles
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {registrations.filter((r) => r.linkedin_profile).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              PG Completed
            </h3>
            <p className="text-3xl font-bold text-purple-600">
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
              placeholder="Search by name, college, or LinkedIn..."
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
                      Email / Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      College
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LinkedIn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
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
                  {paginatedRegistrations.map((registration) => (
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
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {registration.email || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {registration.phone_number || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {registration.college_joined || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {registration.stream_taken || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {registration.linkedin_profile ? (
                          <a
                            href={registration.linkedin_profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-700 hover:text-primary-900 underline"
                          >
                            View Profile
                          </a>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Not provided
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={registration.verified || false}
                            onChange={() =>
                              toggleVerification(
                                registration.id!,
                                registration.verified || false
                              )
                            }
                            disabled={updatingVerification === registration.id}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 ${
                              updatingVerification === registration.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          ></div>
                          <span
                            className={`ms-3 text-sm font-medium ${
                              registration.verified
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            {updatingVerification === registration.id ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin h-4 w-4 mr-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              </span>
                            ) : registration.verified ? (
                              "Verified"
                            ) : (
                              "Unverified"
                            )}
                          </span>
                        </label>
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

        {/* Pagination */}
        {!loading && filteredRegistrations.length > 0 && (
          <div className="bg-white rounded-lg shadow mt-4 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredRegistrations.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredRegistrations.length}
                </span>{" "}
                results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-primary-700 text-white"
                              : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
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
                    Email Address
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.email || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Phone Number
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.phone_number || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Verification Status
                  </h3>
                  <button
                    onClick={() =>
                      toggleVerification(
                        selectedRecord.id!,
                        selectedRecord.verified || false
                      )
                    }
                    disabled={updatingVerification === selectedRecord.id}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      selectedRecord.verified
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    } ${
                      updatingVerification === selectedRecord.id
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {updatingVerification === selectedRecord.id ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </span>
                    ) : selectedRecord.verified ? (
                      "✓ Verified - Click to Unverify"
                    ) : (
                      "⚠ Unverified - Click to Verify"
                    )}
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Selection Year
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.selection_year || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Course/Program
                  </h3>
                  <p className="text-gray-900">
                    {selectedRecord.course_program || "N/A"}
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
                    LinkedIn Profile
                  </h3>
                  {selectedRecord.linkedin_profile ? (
                    <a
                      href={selectedRecord.linkedin_profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-700 hover:text-primary-900 underline break-all"
                    >
                      {selectedRecord.linkedin_profile}
                    </a>
                  ) : (
                    <p className="text-gray-900">Not provided</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Address
                </h3>
                <p className="text-gray-900">{selectedRecord.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
