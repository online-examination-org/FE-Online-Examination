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

// export interface UpdateExamBody {
//   title: string
//   start_time: string
//   end_time: string
//   duration: number
//   description: string
// }
