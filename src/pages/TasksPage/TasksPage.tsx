import { collection, getDocs } from 'firebase/firestore'
import Table from 'react-bootstrap/Table'
import { db } from '../../lib/firebase'
import { useLoaderData } from 'react-router-dom'

export default function TasksPage (): JSX.Element {
  interface Task {
    Assigned_To: string
    Company: string
    Description: string
    Subject: string
    key: number
  }
  const tasks = useLoaderData() as Task[]
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Tasks</h1>
            <br />
            <h3 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Open Roles</h3>
            <Table align="center" striped>
                <thead>
                    <tr>
                    <th>taskID</th>
                    <th>Company</th>
                    <th>Subject</th>
                    <th>Description</th>
                    </tr>
                </thead>
                {tasks.map((task) => (
                    <tbody key={task.key}>
                        <tr>
                        <td>{task.key}</td>
                        <td>{task.Company}</td>
                        <td>{task.Subject}</td>
                        <td>{task.Description}</td>
                        </tr>
                    </tbody>
                ))
                }
            </Table>
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

export async function loadTasks (): Promise<DocumentData> {
  const tasks = await getDocs(collection(db, 'tasks'))
  return tasks.docs.map((task) => task.data())
}
