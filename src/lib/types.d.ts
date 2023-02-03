export interface User {
  id: string
  email: string
}

export interface EmployerUser extends User {
  name: string
  description: string
  imageURL: string
  type: 'employer'
}

export interface StudentUser extends User {
  name: string
  bio: string
  major: string
  year: number
  imageURL: string
  type: 'student'
}
