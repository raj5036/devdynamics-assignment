import React,{ useState, useEffect } from 'react'
import Select from 'react-select'
import { MockAPI } from './lib/ApiClient'
import { Developer } from './lib/Types'
import { ActivityTypes } from './lib/Utils'
import ActivityItem from './components/ActivityItem/ActivityItem'
import BarChart from './components/BarChart/BarChart'
import './App.css'

function App() {
  const [appData, setAppData] = useState<any>(null)
  const [currentDev, setCurrentDev] = useState<Developer>({
    name: '',
    activeDays: null,
    dayWiseActivity: [],
    totalActivity: ActivityTypes.map((activity: string) => {
      return {name: activity, value: 0}
    })
  })
  const [chartParameters, setChartParameters] = useState<Array<any>>([])

  useEffect(() => {
    MockAPI()
      .then((response: any) => {
        console.log(response)
        setAppData(response)
      })
      .catch(error => {
        console.error('API call error', error)
      })
  }, [])

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

  const onChartSelectChange = (options: any) => {
    console.log(options)
    setChartParameters(options)
  }

  return (
    <React.Fragment>
      <h1 className='header'>Discover your team highlights</h1>
      
      {appData &&
        <div className='mainContainer'>
          <div className='selectContainer'>
            <span>Choose a developer</span>
            <Select 
              className='selectDev'
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
            {currentDev.totalActivity.map((activity: any, index: number) => {
              return <ActivityItem
                key={index}
                title={activity.name}
                value={activity.value}
              />
            })}
          </div>

          <div className='chartContainer'>
            <Select
              className='chartSelect'
              options={ActivityTypes.map((type: string) => {
                return {
                  label: type, value: type
                }
              })}
              isMulti={true}
              onChange={onChartSelectChange}
              placeholder='Choose parameters'
            />
            <BarChart/>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default App
