import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import type { Task } from '../lib/types'
import './TasksGrid.css'

export default function TasksGrid ({ tasks }: { tasks: Task[] }): JSX.Element {
  const rows: Task[][] = splitIntoRows(tasks, 4)

  return <>
    {rows.map((row, i) => (
    <Row key={i}>
        {row.map((task, i) => (
            <Col key={i} className="mb-3">
                <TaskCard task={task} />
            </Col>
        ))}
    </Row>
    ))}
  </>
}

function TaskCard ({ task }: { task?: Task }): JSX.Element {
  if (task == null) return <></>

  return (
      <Card className="task-card">
          <Link to={`/task/${task.id}`} style={{ color: 'unset', textDecoration: 'none' }}>
              <Card.Img variant="top" src={task.imageURL} alt={task.title} />
              <Card.Body>
                  <Card.Subtitle className="my-1 text-muted">{task.employer.name}</Card.Subtitle>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
              </Card.Body>
          </Link>
      </Card>
  )
}

function splitIntoRows<T> (items: T[], itemsPerRow: number): T[][] {
  const rows: T[][] = []
  let i = 0
  while (i < items.length) {
    const row: T[] = []
    while (row.length < itemsPerRow) {
      row.push(items[i])
      i++
    }
    rows.push(row)
  }
  return rows
}
