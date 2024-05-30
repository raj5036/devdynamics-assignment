import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS, 
	CategoryScale, 
	LinearScale, 
	PointElement, 
	LineElement,
	Title, 
	Tooltip, 
	Legend,
} from 'chart.js'
import './BarChart.css'
import React from 'react'

ChartJS.register(
	CategoryScale, 
	LinearScale, 
	PointElement, 
	LineElement,
	Title, 
	Tooltip, 
	Legend,
)

interface PropTypes {
	options: any,
	data: any
}

const BarChart: React.FC<PropTypes> = ({data, options}) => {
	return (<div className='lineChartContainer'>
		<Line
			data={data} 
			options={{
					...options,
					responsive: true,
				}}
		/>
	</div>)
}

export default BarChart