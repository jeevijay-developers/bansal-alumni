import { useEffect, useMemo, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import type { AlumniRegistration } from "../types/alumni";

interface AlumniDirectoryProps {
  alumni: AlumniRegistration[];
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 350;

export default function AlumniDirectory({
  alumni,
  pageSize = DEFAULT_PAGE_SIZE,
}: AlumniDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim().toLowerCase());
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTerm]);

  const filteredAlumni = useMemo(() => {
    if (!debouncedTerm) return alumni;
    return alumni.filter((alum) => {
      const haystack = [
        alum.full_name,
        alum.father_name,
        alum.course_program,
        alum.college_joined,
        alum.stream_taken,
        alum.competitive_exam,
        alum.selection_year,
        alum.bansal_study_year,
        alum.exam_rank?.toString() ?? "",
        alum.linkedin_profile,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(debouncedTerm);
    });
  }, [alumni, debouncedTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredAlumni.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAlumni = filteredAlumni.slice(
    startIndex,
    startIndex + pageSize
  );
  const showingFrom = filteredAlumni.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(
    filteredAlumni.length,
    startIndex + paginatedAlumni.length
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
            Verified Alumni Directory
          </p>
          <h3 className="text-2xl font-bold text-primary-900">
            {alumni.length} members (contact details hidden for privacy)
          </h3>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, exam, college, or rank..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alumni
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exam & Rank
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                College & Stream
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bansal Journey
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Connect
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAlumni.length === 0 ? (
              <tr>
                <td
                  className="px-6 py-10 text-center text-gray-500 text-sm"
                  colSpan={5}
                >
                  {debouncedTerm
                    ? "No matching alumni found. Try a different search term."
                    : "No verified alumni available yet. Please check back soon."}
                </td>
              </tr>
            ) : (
              paginatedAlumni.map((alum) => (
                <tr
                  key={alum.id || alum.full_name}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {alum.full_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Batchmate of {alum.father_name}
                    </p>
                    <p className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </p>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">
                      {alum.competitive_exam || "Exam Not Specified"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Selection Year: {alum.selection_year || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Rank: {alum.exam_rank ?? "Not shared"}
                    </p>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">
                      {alum.college_joined || "College not shared"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Stream: {alum.stream_taken || "N/A"}
                    </p>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">
                      Bansal Study Year: {alum.bansal_study_year || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Course: {alum.course_program || "N/A"}
                    </p>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {alum.linkedin_profile ? (
                      <a
                        href={alum.linkedin_profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors text-sm font-medium"
                      >
                        View LinkedIn
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-sm text-gray-500">
                        LinkedIn not shared
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
        <p>
          Showing {showingFrom}-{showingTo} of {filteredAlumni.length} verified
          alumni
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
