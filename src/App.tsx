import React,{ useState, useEffect } from 'react'
import Select from 'react-select'
import { MockAPI } from './lib/ApiClient'
import { Developer } from './lib/Types'
import './App.css'

function App() {
  const [appData, setAppData] = useState<any>(null)
  const [currentDev, setCurrentDev] = useState<Developer>({
    name: '',
    activeDays: null,
    dayWiseActivity: [],
    totalActivity: []
  })

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

  const getCurrentDevData = (key: string, name: string) => {
    const currentDevData = appData.data.AuthorWorklog.rows.find((row: any) => row.name === name)
    return currentDevData[key]
  }

  const onSelectChange = (option: any) => {
    const name = option.value
    setCurrentDev({
      name,
      activeDays: getCurrentDevData('activeDays', name),
      totalActivity: getCurrentDevData('totalActivity', name),
      dayWiseActivity: getCurrentDevData('dayWiseActivity', name)
    })
  }

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
            onChange={onSelectChange}
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
