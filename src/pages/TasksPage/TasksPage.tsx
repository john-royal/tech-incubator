// import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

export default function TasksPage (): JSX.Element {
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Tasks</h1>
            <br />
            <h3 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Open Roles</h3>
            <Table align="center" striped>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Company</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Tech</td>
                    <td>ez</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Finance</td>
                    <td>medium</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>Admin</td>
                    <td>hard</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            <p className="mx-auto d-flex h5 col-md-9 text-center text-secondary" style={{ lineHeight: '2em' }}>
                Welcome to the tech incubator!
            </p>
            <br />
        </div>
    </div>
  )
}
