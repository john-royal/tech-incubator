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
        <p align="center"><img src={student.imageURL} alt={student.name} width="250" height="250"/></p>
        <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">{student.name}</h1>
        <p className="col-md-3 rounded mx-auto d-block">{student.bio}</p>
        <p className="col-md-3 rounded mx-auto d-block">Major: {student.major}</p>
        <p className="col-md-3 rounded mx-auto d-block">Year: {student.year}</p>
        <TasksGrid tasks={tasks} />
    </>
  )
}

export const loadStudent = async ({ params }: LoaderFunctionArgs): Promise<LoaderData> => {
  const id = params.id as string
  const [student, tasks] = await Promise.all([
    getDoc(doc(db, 'students', id)),
    getDocs(query(collection(db, 'tasks'), where('assignee.id', '==', id)))
  ])
  if (student.exists()) {
    return {
      student: student.data() as Student,
      tasks: tasks.docs.map(doc => doc.data()) as Task[]
    }
  } else {
    throw new Error('Student not found')
  }
}
