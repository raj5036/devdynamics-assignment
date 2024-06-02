import React from 'react';
import { Chart as DoughnutChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css'

DoughnutChartJS.register(ArcElement, Tooltip);

interface PropTypes {
	data: any
}

const DoughnutChart: React.FC<PropTypes> = ({data}) => {
	console.log(data)
	return (
		<div className='doughnutChartContainer'>
			<Doughnut 
				data={data} 
				options={{
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							enabled: true,
						}
					}
				}}
			/>
		</div>
	)
}

export default DoughnutChart