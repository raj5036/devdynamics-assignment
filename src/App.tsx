import React,{ useState, useEffect } from 'react'
import Select from 'react-select'
import { MockAPI } from './lib/ApiClient'
import './App.css'

function App() {
  const [appData, setAppData] = useState<any>(null)

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
        <Select options={appData.data.AuthorWorklog.rows.map((row: any) => {
          return {
            label: row.name, value: row.name
          }
        })}/>
        
        <div className='totalActivityContainer'>
          {/* {appData.data.AuthorWorklog.rows} */}
        </div>
      </div>
      }
    </React.Fragment>
  )
}

export default App
