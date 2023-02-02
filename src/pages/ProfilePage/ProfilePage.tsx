import Card from 'react-bootstrap/Card'
// import { Link } from 'react-router-dom'

export default function ProfilePage (): JSX.Element {
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Profile</h1>
            <br />
            <div className="col-md-3 rounded mx-auto d-block">
                <Card.Img variant="top" src="https://fakeimg.pl/150x150/?text=PROFILE IMG"/>
                <br />
                Name: _____<br />
                Major: _____<br />
                Year: _____<br />
                # of Tasks Completed: __<br />
                # of Tasks Pending: __
            </div>
            <br />

            <br />
        </div>
    </div>
  )
}
