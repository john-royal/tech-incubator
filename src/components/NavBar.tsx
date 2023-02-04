
import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { useUser } from '../lib/user'

export default function NavBar (): JSX.Element {
  const { user } = useUser()

  const links = [
    { to: '/', title: 'Home' },
    { to: '/tasks', title: 'Tasks' }
  ]
  if (user != null) {
    links.push(
      { to: `/${user.type}/${user.id}`, title: 'Profile' },
      { to: '/sign-out', title: 'Sign Out' }
    )
  } else {
    links.push(
      { to: '/sign-in', title: 'Sign In' },
      { to: '/create-account', title: 'Create Account' }
    )
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Tech Incubator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {links.map(link => (
            <Nav.Link as={Link} to={link.to} key={link.to}>{link.title}</Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
