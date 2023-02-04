import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom'
import TasksGrid from '../components/TasksGrid'
import { db } from '../lib/firebase'
import { type Student, type Task } from '../lib/types'

interface LoaderData {
  student: Student
  tasks: Task[]
}

export default function StudentProfile (): JSX.Element {
  const { student, tasks } = useLoaderData() as LoaderData

  return (
    <>
        <img src={student.imageURL} alt={student.name} />
        <h1>{student.name}</h1>
        <p>{student.bio}</p>
        <p>Major: {student.major}</p>
        <p>Year: {student.year}</p>
        <TasksGrid tasks={tasks} />
    </>
  )
}

export const loadStudent = async ({ params }: LoaderFunctionArgs): Promise<LoaderData> => {
  const id = params.id as string
  const [student, tasks] = await Promise.all([
    getDoc(doc(db, 'employers', id)),
    getDocs(query(collection(db, 'tasks'), where('assignee.id', '==', id)))
  ])
  if (student.exists()) {
    return {
      student: student.data() as Student,
      tasks: tasks.docs.map(doc => doc.data()) as Task[]
    }
  } else {
    throw new Error('Employer not found')
  }
}
