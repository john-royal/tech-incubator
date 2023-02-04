import { doc, getDoc } from 'firebase/firestore'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { db } from '../lib/firebase'
import { type Task } from '../lib/types'

export default function TaskView (): JSX.Element {
  const task = useLoaderData() as Task

  return (
    <Container>
      <Row className="my-5">
        <Col xs={12} md={6}>
          <Image src={task.imageURL} fluid />
        </Col>
        <Col xs={12} md={6}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>
            Due date: {(task.dueDate != null) ? task.dueDate.toDateString() : 'N/A'}
          </p>
          <p>
            Employer: {task.employer.name}
          </p>
          <Image src={task.employer.imageURL} height={50} width={50} />
          <p>
            Assignee: {(task.assignee != null) ? task.assignee.name : 'N/A'}
          </p>
          {(task.assignee != null)
            ? (
            <Button variant="success" disabled>
              Task assigned
            </Button>
              )
            : (
            <Button variant="primary">Assign to self</Button>
              )}
        </Col>
      </Row>
    </Container>
  )
}

export const loadTask: LoaderFunction = async ({ params }) => {
  const task = await getDoc(doc(db, 'tasks_v2', params.id as string))
  if (task.exists()) {
    return task.data() as Task
  } else {
    throw new Error('Task not found')
  }
}
