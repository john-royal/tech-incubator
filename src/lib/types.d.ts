
export interface Employer {
  id: string
  name: string
  description: string
  imageURL: string
}

export interface Student {
  id: string
  name: string
  bio: string
  major: string
  year: number
  imageURL: string
}

export type UserType = 'student' | 'employer'

export interface User {
  id: string
  email: string
  type: UserType
}

export interface UserState {
  user: User | null
}

export interface Task {
  id: string
  title: string
  description: string
  imageURL: string
  employer: Employer
  assignee: Student | null
  submissionURL: string | null
  dueDate: Date | null
}
