import { Grid } from '@mui/material'
import { Card, ListGroup } from 'react-bootstrap'
import type { Task } from '../lib/types'

export default function TasksGrid ({ tasks }: { tasks: Task[] }): JSX.Element {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
      {tasks.map((task) => (
        <Grid item xs={3} key={task.id}>
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src="https://fakeimg.pl/100x100/?text=CMPNY LOGO" />
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Company: {task.employer.name}</ListGroup.Item>
              <ListGroup.Item>taskID: {task.id}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Grid>
      ))
      }
    </Grid>
  )
}
