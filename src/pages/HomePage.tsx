import Card from 'react-bootstrap/Card'

export default function HomePage (): JSX.Element {
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Home</h1>
            <br />
            <div className="col-md-3 rounded mx-auto d-block">
                <Card.Img variant="top" src="public/readme/collaboration.jpg"/>
            </div>
            <br />
            <p className="mx-auto d-flex h6 col-md-2 text-center text-secondary" style={{ lineHeight: '2em' }}>
                Welcome to the tech incubator!
            </p>
            <br />
        </div>
    </div>
  )
}
