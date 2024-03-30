import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const BooksBorrowedGraph = () => {
  const [chartData, setChartData] = useState([null]);
  const sampleData = {
    labels: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'],
    datasets: [
        {
            label: 'Books Borrowed Over Time',
            data: [10, 20, 15, 25, 30], // Sample counts of books borrowed
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/fetchGraphData.php');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setChartData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'MMM D',
                  },
                },
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Books',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default BooksBorrowedGraph;