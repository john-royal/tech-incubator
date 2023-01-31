import { initializeApp } from 'firebase/app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

initializeApp({
  apiKey: 'AIzaSyAA6Nn11qNk_OMhY5EoTnsz1LgS75cnCQw',
  authDomain: 'headstarter-tech-incubator.firebaseapp.com',
  projectId: 'headstarter-tech-incubator',
  storageBucket: 'headstarter-tech-incubator.appspot.com',
  messagingSenderId: '460632280800',
  appId: '1:460632280800:web:90de62867fd9ba06d34a85',
  measurementId: 'G-NCLDD78YQM'
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
