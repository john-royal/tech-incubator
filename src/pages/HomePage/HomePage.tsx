import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function HomePage (): JSX.Element {
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Home</h1>
            <br />
            <div className="col-md-3 rounded mx-auto d-block">
                <Card.Img variant="top" src="https://fakeimg.pl/350x275/?text=RELEVANT IMAGE"/>
            </div>
            <br />
            <p className="mx-auto d-flex h5 col-md-9 text-center text-secondary" style={{ lineHeight: '2em' }}>
                Welcome to the tech incubator!
            </p>
            <br />
            <Link to="/" className="btn btn-link">Home</Link>{' '}
            <Link to="/tasks" className="btn btn-link">Tasks</Link>{' '}
            <Link to="/profile" className="btn btn-link">Profile</Link>
        </div>
    </div>
  )
}
