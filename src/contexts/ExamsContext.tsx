import { Exam } from '@/types/type'
import React, { createContext, ReactNode, useContext, useState } from 'react'

export interface ExamsContextType {
  exams: Exam[]
  setExams: (exams: Exam[]) => void
}

const ExamsContext = createContext<ExamsContextType>({
  exams: [],
  setExams: () => {} // provide default value
})

export const useExams = () => {
  return useContext(ExamsContext)
}

const ExamsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [exams, _setExams] = useState<Exam[]>([])

  const setExams = (exams: Exam[]) => {
    _setExams(exams)
  }

  const value = { exams, setExams }

  return <ExamsContext.Provider value={value}>{children}</ExamsContext.Provider>
}

export default ExamsProvider
