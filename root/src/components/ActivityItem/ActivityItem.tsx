import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import CountUp from 'react-countup';
import './ActivityItem.css'

interface PropTypes {
	title: string,
	value: number,
	color: string
}

const ActivityItem: React.FC<PropTypes>  = ({title, value, color}) => {
	return (<div className='activityItemContainer'>
		<div className='titleContainer'>
			<span className='title'>{title}</span>
			<FaArrowRight className='arrowIcon'/>
		</div>
		<div 
			className='value'
			style={{color}}
		>
			{value == 0 ? value : <CountUp start={0} end={value} duration={2}/>}
		</div>
	</div>)
} 

export default ActivityItem