import React from 'react';
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
import { ClimateYearlyDataInterface } from '@/app/utils/dataTransformer/transformChartData';


export const DATA_VIZ_COLORS_100 = [
  "#993333", "#996633", "#999933", "#669933", "#339933", "#339966", "#339999", "#336699",
  "#333399", "#663399", "#993399", "#993366", "#993333", "#994733", "#995c33", "#997033",
  "#998533", "#999933", "#859933", "#709933", "#5c9933", "#479933", "#339933", "#339947",
  "#33995c", "#339970", "#339985", "#339999", "#338599", "#337099", "#335c99", "#334799",
  "#333399", "#473399", "#5c3399", "#703399", "#853399", "#993399", "#993385", "#993370",
  "#99335c", "#993347", "#993333", "#993333", "#994133", "#995033", "#995f33", "#996e33",
  "#997d33", "#998c33", "#999933", "#8c9933", "#7d9933", "#6e9933", "#5f9933", "#509933",
  "#419933", "#339933", "#339941", "#339950", "#33995f", "#33996e", "#33997d", "#33998c",
  "#339999", "#338c99", "#337d99", "#336e99", "#335f99", "#335099", "#334199", "#333399",
  "#413399", "#503399", "#5f3399", "#6e3399", "#7d3399", "#8c3399", "#993399", "#99338c",
  "#99337d", "#99336e", "#99335f", "#993350", "#993341", "#993333", "#993333", "#993b33",
  "#994433", "#994d33", "#995533", "#995e33", "#996633", "#996f33", "#997833", "#998033",
  "#998933", "#999133", "#999933"
];

export const getColorByIndex = (index: number): string => {
  return DATA_VIZ_COLORS_100[index % DATA_VIZ_COLORS_100.length];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

const ClimateLineChart: React.FC<{climateData: ClimateYearlyDataInterface[]}> = ({climateData}) => {

  const getData = (labels: Array<string>) => {
    return {
      labels,
      datasets: climateData.map((data, index) => {
        const colour = getColorByIndex(index);
        return {
          label: data.country,
          data: data.climateYearlyData.map(d => Number(d.temperatureChange)),
          borderColor: colour,
          backgroundColor: colour,
        }
      }) 
    }
  }
  const labels = climateData[0].climateYearlyData.map(d => d.year);
  return <Line options={options} data={getData(labels)} />;
}

export default ClimateLineChart;
