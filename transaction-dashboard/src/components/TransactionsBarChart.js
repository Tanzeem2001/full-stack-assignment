// TransactionsBarChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function TransactionsBarChart({ selectedMonth, onFetchChartData }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch chart data when the component mounts or when selectedMonth changes
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = () => {
    // Call the provided onFetchChartData callback to fetch chart data
    onFetchChartData(selectedMonth)
      .then(data => setChartData(data))
      .catch(error => console.error('Error fetching chart data:', error));
  };

  // Check if chartData is available before rendering the chart
  if (!chartData || !chartData.labels || !chartData.datasets) {
    return <div> No data available for the chart.</div>;
  }

  return (
    <div className="transactions-bar-chart mt-4">
      <h3>Transactions Bar Chart - {selectedMonth}</h3>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Price Range',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Items',
              },
            },
          },
        }}
      />
    </div>
  );
}

export default TransactionsBarChart;
