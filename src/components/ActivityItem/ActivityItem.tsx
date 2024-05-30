import React from 'react'
import './ActivityItem.css'

interface PropTypes {
	title: string,
	value: number,
}

const ActivityItem: React.FC<PropTypes>  = ({title, value}) => {
	return (<div className='activityItemContainer'>
		{title}
		{value}
	</div>)
} 

export default ActivityItem