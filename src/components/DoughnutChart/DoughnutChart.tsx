import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

interface PropTypes {
	data: any
}

const DoughnutChart: React.FC<PropTypes> = ({data}) => {
	console.log(data)
	return (
		<div className='doughnutChartContainer'>
			<Doughnut data={data} />
		</div>
	)
}

export default DoughnutChart