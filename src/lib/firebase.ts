import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: 'AIzaSyAA6Nn11qNk_OMhY5EoTnsz1LgS75cnCQw',
  authDomain: 'headstarter-tech-incubator.firebaseapp.com',
  projectId: 'headstarter-tech-incubator',
  storageBucket: 'headstarter-tech-incubator.appspot.com',
  messagingSenderId: '460632280800',
  appId: '1:460632280800:web:90de62867fd9ba06d34a85',
  measurementId: 'G-NCLDD78YQM'
})

export default app
export const db = getFirestore(app)
