import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const BooksBorrowedGraph = () => {
  const [chartData, setChartData] = useState([null]);

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

    console.log(chartData)

    fetchData();
  }, []);

  return (
    <Line
    datasetIdKey='id'
    data={{
        labels: ['Jun', 'Jul', 'Aug'],
        datasets: [
        {
            id: 1,
            label: 'Dataset 1',
            data: [5, 6, 7],
        },
        {
            id: 2,
            label: 'Dataset 2',
            data: [3, 2, 1],
        },
        ],
    }}
    />
  );
};

export default BooksBorrowedGraph;