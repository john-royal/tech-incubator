import { type ChangeEvent, useState } from 'react'
import { Form, Button, Container, Modal, Row, Col } from 'react-bootstrap'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { type Employer } from '../lib/types'

async function submitForm (name: string, description: string, logo: File): Promise<void> {
  const id = `employers/${uuidv4()}`
  await uploadBytes(ref(storage, id), logo)
  const imageURL = await getDownloadURL(ref(storage, id))
  const employer1: Employer = { id, name, description, imageURL }
  await setDoc(doc(db, id), employer1)
}

function EmployerForm (): JSX.Element {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (name.length === 0 || description.length === 0 || logo === null) {
      setErrorMessage('Please enter all required fields.')
      return
    }

    submitForm(name, description, logo)
      .then(() => { navigate('/') })
      .catch((e: Error) => { setErrorMessage(e.message) })
  }

  return (
    <Container>
        <Row>
        <Col>
            <h2>Apply</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                required
                />
            </Form.Group>
            <Form.Group controlId="desc" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                type="email"
                value={description}
                onChange={(e) => { setDesc(e.target.value) }}
                required
                />
            </Form.Group>
            <Form.Group controlId="logo" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setLogo((e.target.files != null) ? e.target.files[0] : null)
                }
                }
                required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Col>
        </Row>
        <Modal show={errorMessage !== ''} onHide={() => { setErrorMessage('') }}>
        <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => { setErrorMessage('') }}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    </Container>
  )
}

export default EmployerForm
