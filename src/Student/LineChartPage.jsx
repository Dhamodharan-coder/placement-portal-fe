import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, registerables } from 'chart.js';
import { Pipeline } from './StudentContext';

// Register all necessary components
ChartJS.register(...registerables);

const LineChartPage = () => {
  // Get the last 7 months for the labels
  const {linechartselect,linechartreject} = useContext(Pipeline);
  const data = {
    labels: ['Selected', 'Rejected'], // X-axis labels
    datasets: [{
      label: 'Data',
      data: [linechartselect, linechartreject], // Example data points
      backgroundColor:  'rgba(55, 48, 163, 1)', // Border color
    }],
  };

  // Configuration for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart of Overall Performance',
      },
    },
  };

  return (
    <div  style={{ height: '400px', width: '600px' }}>
    <Bar data={data} options={options} />
    </div>
  );
};

export default LineChartPage;
