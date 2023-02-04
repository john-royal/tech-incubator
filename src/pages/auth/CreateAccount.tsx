import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState, type FormEventHandler } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../lib/firebase'

export default function CreateAccountPage (): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState<'' | 'student' | 'employer'>('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const userInfo = {
          id: user.uid,
          email: user.email,
          type
        }
        await setDoc(doc(db, 'users', user.uid), userInfo)
        return userInfo
      })
      .then(() => { navigate('/') })
      .catch(error => {
        console.error('An error occurred while creating an account: ', error)
        setErrorMessage(error.message)
      })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-3">Create Account</h1>
          {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              required
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Are you a student or an employer?</Form.Label>
              <Form.Control
              as="select"
              name="type"
              value={type}
              onChange={(e) => { setType(e.target.value as 'student' | 'employer') }}
              required
              >
              <option value="">Choose an option</option>
              <option value="student">Student</option>
              <option value="employer">Employer</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
              <Button variant="primary" type="submit">Create Account</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
