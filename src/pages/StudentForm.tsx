
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState, type ChangeEvent } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../lib/firebase'
import { type Student } from '../lib/types'

async function submitForm ({ id, name, bio, year, major, image }: { id: string, name: string, bio: string, year: number, major: string, image: File }): Promise<void> {
  await uploadBytes(ref(storage, `students/${id}`), image)
  const imageURL = await getDownloadURL(ref(storage, `students/${id}`))
  const student: Student = { id, name, bio, year, major, imageURL }
  await setDoc(doc(db, `students/${id}`), student)
}

export default function StudentForm (): JSX.Element {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [major, setMajor] = useState('')
  const [year, setYear] = useState(2023)
  const [errorMessage, setErrorMessage] = useState('')
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (name === '' || bio === '' || major === '' || image === null) {
      setErrorMessage('Please enter all required fields.')
      return
    }

    submitForm({ id, name, bio, year, major, image })
      .then(() => { navigate(`/student/${id}`) })
      .catch((e: Error) => { setErrorMessage(e.message) })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-3">Tell Us More About Yourself</h1>
          {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
              type="text"
              name="name"
              autoComplete="full-name"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              required
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Major</Form.Label>
              <Form.Control
              type="text"
              name="major"
              autoComplete="major"
              value={major}
              onChange={(e) => { setMajor(e.target.value) }}
              required
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Graduation Year</Form.Label>
              <Form.Control
              type="year"
              name="year"
              autoComplete="year"
              value={year}
              onChange={(e) => { setYear(Number(e.target.value)) }}
              required
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Bio</Form.Label>
              <Form.Control
              type="text"
              name="bio"
              autoComplete="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
              required
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => { setImage((e.target.files as FileList)[0]) }} />
            </Form.Group>

            <Form.Group className="my-3">
              <Button variant="primary" type="submit">Update Profile</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
