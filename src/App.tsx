import React,{ useState, useEffect } from 'react'
import { MockAPI } from './lib/ApiClient'
import './App.css'

function App() {
  const [appData, setAppData] = useState<unknown>(null)

  useEffect(() => {
    MockAPI()
      .then(response => {
        console.log(response)
        setAppData(appData)
      })
      .catch(error => {
        console.error('API call error', error)
      })
  }, [])

  return (
    <React.Fragment>
      <h1 className='header'>Discover your team highlights</h1>
    </React.Fragment>
  )
}

export default App
