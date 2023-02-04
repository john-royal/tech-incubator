import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState, type ChangeEvent } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../lib/firebase'
import { type Employer } from '../lib/types'

async function submitForm (id: string, name: string, description: string, logo: File): Promise<void> {
  await uploadBytes(ref(storage, `employers/${id}`), logo)
  const imageURL = await getDownloadURL(ref(storage, `employers/${id}`))
  const employer1: Employer = { id, name, description, imageURL }
  await setDoc(doc(db, `employers/${id}`), employer1)
}

function EmployerForm (): JSX.Element {
  const { id } = useParams() as { id: string }
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

    submitForm(id, name, description, logo)
      .then(() => { navigate(`/employer/${id}`) })
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
                type="text"
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
