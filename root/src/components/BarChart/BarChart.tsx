import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import './BarChart.css'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface PropTypes {
	options?: any,
	data: any
}

/**
 * Component representing a Bar Chart
 */
const BarChart: React.FC<PropTypes> = ({data, options}) => {
	// Return JSX for Bar Chart component
	return (
		<div className='barChartContainer'>
			<Bar 
				options={{
					...options,
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							position: 'bottom'
						}
					}
				}} 
				data={data} 
			/>
		</div>
	)
}

export default BarChart