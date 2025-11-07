export interface AlumniRegistration {
  full_name: string;
  father_name: string;
  course_program: string;
  selected_jee: boolean;
  selected_neet: boolean;
  exam_rank: number | null;
  college_joined: string;
  stream_taken: string;
  pg_completed: boolean;
  pg_stream: string;
  pg_completion_year: number | null;
  other_exams: string;
  address: string;
  company_name: string;
  currently_working: boolean;
  position_role: string;
  work_from_year: number;
  work_to_year: number | null;
  total_experience: number;
  roles: string[];
  industries: string[];
  skills: string[];
}
