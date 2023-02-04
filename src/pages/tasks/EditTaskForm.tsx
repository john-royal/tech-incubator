import { collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState, type ChangeEvent, type FormEventHandler } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { redirect } from 'react-router-dom'
import { db, storage } from '../../lib/firebase'
import { type Task } from '../../lib/types'

export default function EditTaskForm (): JSX.Element {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const putTask = async (id: string | undefined, title: string, description: string, image: File): Promise<Task> => {
    const taskRef = typeof id === 'string' ? doc(db, 'tasks', id) : doc(collection(db, 'tasks'))
    const imageRef = ref(storage, `images/${taskRef.id}`)
    await uploadBytes(imageRef, image)
    const imageURL = await getDownloadURL(imageRef)
    const task: Task = {
      id: taskRef.id,
      title,
      description,
      imageURL,
      employer: { id: '', name: '', description: '', imageURL: '' },
      assignee: null,
      submissionURL: null,
      dueDate: null
    }
    await setDoc(taskRef, task)
    return task
  }

  const handleSubmit: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (title === '' || description === '' || image == null) {
      setError('Please enter a title and description, and upload an image.')
      return
    }

    setError('')
    setLoading(true)

    putTask(undefined, title, description, image)
      .then(task => { redirect(`/task/${task.id}`) })
      .catch(error => { setError(error.toString()) })
      .finally(() => { setLoading(false) })
  }

  const form = (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={e => { setTitle(e.target.value) }} />
        </Form.Group>
        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={e => { setDescription(e.target.value) }} />
        </Form.Group>
        <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => { setImage((e.target.files as FileList)[0]) }} />
        </Form.Group>

        {(error !== '') && (
        <Form.Group>
            <Form.Text className="text-danger">{error}</Form.Text>
        </Form.Group>
        )}

        <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
        </Button>
    </Form>
  )

  return (
    <Container>
        <Row className="d-flex justify-content-center mt-5">
            <Col xs={12} md={8} lg={6}>
                <h1 className="text-center mb-3">New Task</h1>
                {form}
            </Col>
        </Row>
    </Container>
  )
}
