import { collection, getDocs } from 'firebase/firestore'
import { useLoaderData } from 'react-router-dom'
import TasksGrid from '../../components/TasksGrid'
import { db } from '../../lib/firebase'
import type { Task } from '../../lib/types'

export default function TasksPage (): JSX.Element {
  const tasks = useLoaderData() as Task[]
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Tasks</h1>
            <br />
            <h3 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Open Roles</h3>
              <TasksGrid tasks={tasks} />
            <br />
            <p className="mx-auto d-flex h5 col-md-9 text-center text-secondary" style={{ lineHeight: '2em' }}>
                Companies are seeking to fill tasks! If you are a student that can meet a given tasks
                responsibilites, we encourage you to apply!
            </p>
            <br />
        </div>
    </div>
  )
}

export async function loadTasks (): Promise<Task[]> {
  const tasks = await getDocs(collection(db, 'tasks'))
  return tasks.docs.map((task) => task.data() as Task)
}
