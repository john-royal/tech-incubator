import { doc, getDoc } from 'firebase/firestore'
import { redirect, useLoaderData, type LoaderFunction } from 'react-router-dom'
import { db } from '../lib/firebase'
import { type Employer } from '../lib/types'

export default function EmployerProfile (): JSX.Element {
  const employer = useLoaderData() as Employer

  return (
    <>
        <img src={employer.imageURL} alt={employer.name} />
        <h1>{employer.name}</h1>
        <p>{employer.description}</p>
    </>
  )
}

export const loadEmployer: LoaderFunction = async ({ params }) => {
  const employer = await getDoc(doc(db, 'employers', params.id as string))
  if (employer.exists()) {
    return employer.data() as Employer
  } else {
    return redirect('/404')
  }
}
