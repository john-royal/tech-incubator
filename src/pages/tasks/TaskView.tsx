import { doc, getDoc, setDoc } from 'firebase/firestore'
import { type FormEventHandler, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useLoaderData, useNavigate, type LoaderFunction } from 'react-router-dom'
import { db } from '../../lib/firebase'
import type { Student, Task } from '../../lib/types'
import { useUser } from '../../lib/user'

export default function TaskView (): JSX.Element {
  const task = useLoaderData() as Task
  const { user } = useUser()
  const navigate = useNavigate()

  const assignToSelf = async (): Promise<void> => {
    if (user?.type !== 'student') {
      alert('Cannot assign task: not signed in as student')
      return
    } else if (task.assignee != null) {
      alert('Cannot assign task: task assignee already set')
      return
    }
    const student = (await getDoc(doc(db, 'students', user.id))).data() as Student
    task.assignee = student
    await setDoc(doc(db, 'tasks', task.id), task)
    navigate(`/task/${task.id}`)
  }

  return (
    <Container>
      <Row className="my-5">
        <Col xs={12} md={6}>
          <Image src={task.imageURL} fluid />
        </Col>
        <Col xs={12} md={6}>
          <h1>{task.title}</h1>
          <p className="subtitle">{task.employer.name}</p>
          <p>{task.description}</p>
          {task.assignee == null && (
            <Button variant="primary" onClick={() => { void assignToSelf() }}>Assign to self</Button>
          )}
          {task.assignee?.id === user?.id && <TaskUpdateForm />}
        </Col>
      </Row>
    </Container>
  )
}

function TaskUpdateForm (): JSX.Element {
  const task = useLoaderData() as Task
  const [dueDate, setDueDate] = useState(task.dueDate ?? new Date())
  const [submissionURL, setSubmissionURL] = useState(task.submissionURL ?? '')
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault()

    task.dueDate = dueDate
    task.submissionURL = submissionURL

    setDoc(doc(db, 'tasks', task.id), task)
      .then(() => { navigate(`/task/${task.id}`) })
      .catch(error => { alert(error.toString()) })
  }

  return <form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>Due Date</Form.Label>
      <Form.Control type="date" value={dueDate.toISOString()} onChange={e => { setDueDate(new Date(e.target.value)) }} />
    </Form.Group>

    <Form.Group>
      <Form.Label>Submission URL</Form.Label>
      <Form.Control type="text" value={submissionURL} onChange={e => { setSubmissionURL(e.target.value) }} />
    </Form.Group>

    <Button variant="primary">Save</Button>
  </form>
}

export const loadTask: LoaderFunction = async ({ params }) => {
  const task = await getDoc(doc(db, 'tasks', params.id as string))
  if (task.exists()) {
    return task.data() as Task
  } else {
    throw new Error('Task not found')
  }
}
