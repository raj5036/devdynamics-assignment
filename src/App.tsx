import React,{ useState, useEffect } from 'react'
import Select, { MultiValue } from 'react-select'
import { toast } from 'react-toastify'
import ActivityItem from './components/ActivityItem/ActivityItem'
import { ActivityTypes } from './lib/Utils'
import { IDeveloper } from './lib/Types'
import { MockAPI } from './lib/ApiClient'
import LineChart from './components/LineChart/LineChart'
import BarChart from './components/BarChart/BarChart'
import './App.css'

function App() {
  const [appData, setAppData] = useState<any>(null)
  const [currentDev, setCurrentDev] = useState<IDeveloper>({
    name: '',
    activeDays: null,
    dayWiseActivity: [],
    totalActivity: ActivityTypes.map((activity: string) => {
      return {name: activity, value: 0}
    })
  })
  const [chartParameters, setChartParameters] = useState<MultiValue<{label: string, value: string}>>([])
  const [chartDataset, setChartDataset] = useState<any>({
    labels: [],
    datasets: [{
      label: 'Label',
      data: ActivityTypes,
      yAxisID: 'y',
      stack: 'stack 0'
    }]
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
  }, [])

  const getActivityColor = (activityType: string) => {
    const activityMeta = appData.data.AuthorWorklog.activityMeta.find((activity: any) => {
      return activity.label == activityType
    })
    
    return activityMeta.fillColor
  }

  const getCurrentDevData = (key: string, name: string) => {
    const currentDevData = appData.data.AuthorWorklog.rows.find((row: any) => row.name === name)
    return currentDevData[key]
  }

  const getActivityTypeDataset = (dayWiseActivity: Array<any>, activityType: string) => {
    const result = dayWiseActivity.map((activeDay: any) => {
      const activityDetail = activeDay.items.children.find((item: any) => (item.label == activityType))
      return activityDetail
    })
    return result
  }

  const onSelectChange = (option: any) => {
    const name = option.value
    setCurrentDev(() => {
      const activeDays = getCurrentDevData('activeDays', name)
      const totalActivity = getCurrentDevData('totalActivity', name)
      const dayWiseActivity = getCurrentDevData('dayWiseActivity', name)
      
      
      setChartDataset({
        labels: dayWiseActivity.map((activity: any) => activity.date),
        datasets: ActivityTypes.map((activity: any) => {
          const currentActivityData = getActivityTypeDataset(dayWiseActivity, activity)
          const counts = currentActivityData.map(data => data.count)
          const fillColors = currentActivityData.map(data => data.fillColor)
          
          return {
            label: activity,
            data: counts,
            backgroundColor: fillColors,
            borderColor: fillColors,
            yAxisID: 'y',
            stack: 'stack 0'
          }
        })
      })

      return {
        name,
        activeDays,
        totalActivity,
        dayWiseActivity
      }
    })
  }

  const onChartSelectChange = (options: MultiValue<{label: string, value: string}>) => {
    if (options.length &&  !currentDev.name) {
      toast.error('Please select a developer first')
      return
    }

    console.log(chartParameters)

    setChartParameters(() => {
      const dayWiseActivity = getCurrentDevData('dayWiseActivity', currentDev.name)

      setChartDataset({
        labels: dayWiseActivity.map((activity: any) => activity.date),
        datasets: (options.length 
            ? options.map(option => option.label) 
            : ActivityTypes
          )
            .map((activity: any) => {
              const currentActivityData = getActivityTypeDataset(dayWiseActivity, activity)
              const counts = currentActivityData.map(data => data.count)
              const fillColors = currentActivityData.map(data => data.fillColor)
            
              return {
                label: activity,
                data: counts,
                backgroundColor: fillColors,
                borderColor: fillColors,
                yAxisID: 'y',
                stack: 'stack 0',
              }
          })
      })
      return options
    })
  }

  return (
    <React.Fragment>
      <h1 className='header'>Discover your team highlights. </h1>
      
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
                color={getActivityColor(activity.name)}
              />
            })}
          </div>

          <div className='chartContainer'>
            <Select
              className='chartSelect'
              options={currentDev.name ? ActivityTypes.map((type: string) => {
                return {
                  label: type, value: type
                }
              }) : []}
              isMulti={true}
              closeMenuOnSelect={true}
              onChange={onChartSelectChange}
              placeholder={!currentDev.name ? 'Select a Developer first' : 'Choose specific Parameters'}
              isDisabled={!currentDev.name}
            />
            <LineChart data={chartDataset} />
            <BarChart data={chartDataset} />
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default App
