import { collection, getDocs } from 'firebase/firestore'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link, useLoaderData } from 'react-router-dom'
import TasksGrid from '../../components/TasksGrid'
import { db } from '../../lib/firebase'
import type { Task } from '../../lib/types'
import { useUser } from '../../lib/user'

export default function TasksGridView (): JSX.Element {
  const tasks = useLoaderData() as Task[]
  const { user } = useUser()

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Tasks</h1>
        </Col>
        <Col>
          {user?.type === 'employer' && <Link to="/task/new">New Task</Link>}
        </Col>
      </Row>
      <TasksGrid tasks={tasks} />
    </Container>
  )
}

export async function loadTasks (): Promise<Task[]> {
  const tasks = await getDocs(collection(db, 'tasks'))
  return tasks.docs.map((task) => task.data() as Task)
}
