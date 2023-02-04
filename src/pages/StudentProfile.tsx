import { doc, getDoc } from 'firebase/firestore'
import { redirect, useLoaderData, type LoaderFunction } from 'react-router-dom'
import { auth, db } from '../lib/firebase'
import { type Student } from '../lib/types'

export default function StudentProfile (): JSX.Element {
  const student = useLoaderData() as Student

  return (
    <>
        <img src={student.imageURL} alt={student.name} />
        <h1>{student.name}</h1>
        <p>{student.bio}</p>
        <p>Major: {student.major}</p>
        <p>Year: {student.year}</p>
    </>
  )
}

export const loadStudent: LoaderFunction = async ({ params }) => {
  const id = typeof params.id === 'string' ? params.id : auth.currentUser?.uid as string
  const student = await getDoc(doc(db, 'students', id))
  if (student.exists()) {
    return student.data() as Student
  } else {
    return redirect('/404')
  }
}
