import { Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { Task } from '../lib/types'

export default function TasksGrid ({ tasks }: { tasks: Task[] }): JSX.Element {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
      {tasks.map((task) => (
        <Grid item xs={3} key={task.id}>
          <Card style={{ width: '15rem' }}>
            <Link to={`/task/${task.id}`} style={{ color: 'unset', textDecoration: 'none' }}>
                <Card.Img variant="top" src={task.imageURL} alt={task.title} />
                <Card.Body>
                    <Card.Subtitle className="my-1 text-muted">{task.employer.name}</Card.Subtitle>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                </Card.Body>
            </Link>
          </Card>
        </Grid>
      ))
      }
    </Grid>
  )
}
