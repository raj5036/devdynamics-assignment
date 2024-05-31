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
import React from 'react'
import './LineChart.css'

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

const LineChart: React.FC<PropTypes> = ({data, options}) => {
	return (<div className='lineChartContainer'>
		<Line
			data={data} 
			options={{
					...options,
					responsive: true,
					scales: {
						y: {
							type: "linear" as const,
							display: true,
							position: "left" as const,
						},
					},
				}}
		/>
	</div>)
}

export default LineChart