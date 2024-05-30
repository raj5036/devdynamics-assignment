import React,{ useState, useEffect } from 'react'
import Select from 'react-select'
import { MockAPI } from './lib/ApiClient'
import './App.css'

function App() {
  const [appData, setAppData] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<string>('')

  useEffect(() => {
    MockAPI()
      .then((response: any) => {
        console.log(response)
        setAppData(response)
      })
      .catch(error => {
        console.error('API call error', error)
      })
  }, [appData])

  return (
    <React.Fragment>
      <h1 className='header'>Discover your team highlights</h1>
      
      {appData &&
      <div className='mainContainer'>
        <div className='selectContainer'>
          <span>Choose a developer</span>
          <Select 
            className='select'
            options={appData.data.AuthorWorklog.rows.map((row: any) => {
              return {
                label: row.name, value: row.name
              }
            })}
            isMulti={false}
            onChange={(option: any) => setCurrentUser(option.value)}
          />
        </div>
        
        <div className='totalActivityContainer'>
          
        </div>
      </div>
      }
    </React.Fragment>
  )
}

export default App
