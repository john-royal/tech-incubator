import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom'
import TasksGrid from '../components/TasksGrid'
import { db } from '../lib/firebase'
import { type Employer, type Task } from '../lib/types'

interface LoaderData {
  employer: Employer
  tasks: Task[]
}

export default function EmployerProfile (): JSX.Element {
  const { employer, tasks } = useLoaderData() as LoaderData

  return (
    <>
        <img src={employer.imageURL} alt={employer.name} width="250" height="250"/>
        <h1>{employer.name}</h1>
        <p>{employer.description}</p>
        <TasksGrid tasks={tasks} />
    </>
  )
}

export const loadEmployer = async ({ params }: LoaderFunctionArgs): Promise<LoaderData> => {
  const id = params.id as string
  const [employer, tasks] = await Promise.all([
    getDoc(doc(db, 'employers', id)),
    getDocs(query(collection(db, 'tasks'), where('employer.id', '==', id)))
  ])
  if (employer.exists()) {
    return {
      employer: employer.data() as Employer,
      tasks: tasks.docs.map(doc => doc.data()) as Task[]
    }
  } else {
    throw new Error('Employer not found')
  }
}
