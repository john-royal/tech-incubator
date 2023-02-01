import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function ProfilePage() {
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Profile</h1>
            <br></br>
            <div className="col-md-3 rounded mx-auto d-block">
                <Card.Img variant="top" src="https://fakeimg.pl/150x150/?text=PROFILE IMG"/>
                <br></br>
                Name: _____<br></br>
                Major: _____<br></br>
                Year: _____<br></br>
                # of Tasks Completed: __<br></br>
                # of Tasks Pending: __
            </div>
            <br></br>

            <br></br>
            <Button variant="link">HOME</Button>
            <Button variant="link">TASKS</Button>
            <Button variant="link">PROFILE</Button>
        </div>
    </div>
  )
}
