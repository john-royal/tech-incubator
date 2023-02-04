import { collection, getDocs } from 'firebase/firestore'
import { Card, ListGroup } from 'react-bootstrap'
import { Grid } from '@mui/material'
import { db } from '../../lib/firebase'
import { useLoaderData } from 'react-router-dom'

export default function TasksPage (): JSX.Element {
  interface Task {
    Assigned_To: string
    Company: string
    Description: string
    Subject: string
    key: number
  }
  const tasks = useLoaderData() as Task[]
  return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Tasks</h1>
            <br />
            <h3 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Open Roles</h3>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                {tasks.map((task) => (
                  <Grid item xs={3} key={task.key}>
                    <Card style={{ width: '15rem' }}>
                      <Card.Img variant="top" src="https://fakeimg.pl/100x100/?text=CMPNY LOGO" />
                      <Card.Body>
                        <Card.Title>{task.Subject}</Card.Title>
                        <Card.Text>{task.Description}</Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>Company: {task.Company}</ListGroup.Item>
                        <ListGroup.Item>taskID: {task.key}</ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Grid>
                ))
                }
              </Grid>
            <br />
            <p className="mx-auto d-flex h5 col-md-9 text-center text-secondary" style={{ lineHeight: '2em' }}>
                Companies are seeking to fill tasks! If you are a student that can meet a given tasks
                responsibilites, we encourage you to apply!
            </p>
            <br />
        </div>
    </div>
  )
}

export async function loadTasks (): Promise<DocumentData> {
  const tasks = await getDocs(collection(db, 'tasks'))
  return tasks.docs.map((task) => task.data())
}
