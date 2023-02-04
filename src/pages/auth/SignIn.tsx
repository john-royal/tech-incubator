import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, type FormEventHandler } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebase'

export default function SignInPage (): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(() => { navigate('/') })
      .catch(error => {
        console.error('An error occurred while signing in: ', error)
        setErrorMessage(error.message)
      })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-3">Sign In</h1>
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Button variant="primary" type="submit">Sign In</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
