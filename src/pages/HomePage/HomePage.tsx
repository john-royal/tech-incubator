import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function HomePage() {
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Home</h1>
            <br></br>
            <div className="col-md-3 rounded mx-auto d-block">
                <Card.Img variant="top" src="https://fakeimg.pl/350x275/?text=RELEVANT IMAGE"/>
            </div>
            <br></br>
            <p className="mx-auto d-flex h5 col-md-9 text-center text-secondary" style={{lineHeight: "2em"}}>
                Welcome to the tech incubator!
            </p>
            <br></br>
            <Button variant="link">HOME</Button>
            <Button variant="link">TASKS</Button>
            <Button variant="link">PROFILE</Button>
        </div>
    </div>
  )
}
