
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useState, type FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../lib/firebase'


export default function StudentProfile (): JSX.Element {

  const [bio, setBio] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [major, setMajor] = useState('')
  const [year, setYear] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

  }

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-3">Tell Us More About Yourself</h1>
          {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="my-2">
              <Form.Label>Major</Form.Label>
              <Form.Control
              type="major"
              name="major"
              autoComplete="major"
              value={major}
              onChange={(e) => { setMajor(e.target.value) }}
              required
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Year</Form.Label>
              <Form.Control
              type="year"
              name="year"
              autoComplete="year"
              value={year}
              onChange={(e) => { setYear(e.target.value) }}
              required
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Bio</Form.Label>
              <Form.Control
              type="bio"
              name="bio"
              autoComplete="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
              required
              />
            </Form.Group>

            {/* Add image uploader */}

            <Form.Group className="my-3">
              <Button variant="primary" type="submit">Update Profile</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}