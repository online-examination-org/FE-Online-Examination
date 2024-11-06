export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  name: string
  email: string
  password: string
}

export interface CreateExamBody {
  title: string
  start_time: string
  end_time: string
  duration: number
  description: string
}

export interface Profile {
  id: number
  name: string
  email: string
  role: string
}

export interface Exam {
  exam_id: number
  teacher_id: number
  title: string
  passcode: string
  start_time: string // ISO 8601 format, consider Date if you need date handling
  end_time: string // ISO 8601 format, consider Date if you need date handling
  duration: number // duration in minutes
  create_at: number // Unix timestamp
  description: string
}
// export interface UpdateExamBody {
//   title: string
//   start_time: string
//   end_time: string
//   duration: number
//   description: string
// }
