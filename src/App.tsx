import { BrowserRouter as Router } from 'react-router-dom'
import MainCompenent from './MainComponent'
import './App.css'

function App (): JSX.Element {
  return (
    <div className="App">
      <Router>
        <MainCompenent />
      </Router>
    </div>
  )
}

export default App
