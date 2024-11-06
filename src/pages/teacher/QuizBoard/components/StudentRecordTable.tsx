import { useNavigate } from 'react-router-dom'
import studentsData from '../../../../dummy_datas/quiz_student_record.json'

const StudentRecordTable = () => {
  const navigate = useNavigate()

  return (
    <div className='overflow-x-auto px-2 w-full mx-auto '>
      <table className='min-w-full bg-white border border-gray-300 rounded-md'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b text-start'>Student ID</th>
            <th className='py-2 px-4 border-b text-start'>Student Name</th>
            <th className='py-2 px-4 border-b text-center'>Score</th>
            <th className='py-2 px-4 border-b text-center'>Completion Time</th>
            <th className='py-2 px-4 border-b text-center'>Submitted At</th>
            <th className='py-2 px-4 border-b text-start'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.id} className='h-[50px] my-2'>
              <td className='py-2 px-4 border-b'>{student.id}</td>
              <td className='py-2 px-4 border-b'>{student.name}</td>
              <td className='py-2 px-4 border-b text-center'>{student.score}</td>
              <td className='py-2 px-4 border-b text-center'>{student.completionTime}</td>
              <td className='py-2 px-4 border-b text-center'>{student.submittedAt}</td>
              <td className='py-2 px-4 border-b'>
                <button className='text-blue-500 hover:underline' onClick={() => navigate('/quiz/2/student/3')}>
                  View Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentRecordTable
