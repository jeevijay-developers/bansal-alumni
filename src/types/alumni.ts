export interface AlumniRegistration {
  id?: number;
  full_name: string;
  father_name: string;
  course_program: string;
  competitive_exam: string; // "JEE ADVANCED", "NEET", or ""
  bansal_study_year: string; // "1981-82", "1982-83", etc.
  selection_year: string; // "1981", "1982", etc. or "unselected"
  exam_rank: number | null; // 1-15000 or null
  college_joined: string;
  stream_taken: string;
  pg_completed: boolean;
  pg_stream: string;
  pg_completion_year: number | null;
  other_exams: string;
  address: string;
  linkedin_profile: string;
  email?: string; // new: contact email
  phone_number?: string; // new: contact phone number
  verified?: boolean; // admin verification status
  created_at?: string;
  updated_at?: string;
}
