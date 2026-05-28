import {

ResponsiveContainer,
LineChart,
Line,
CartesianGrid,
XAxis,
YAxis,
Tooltip

}

from 'recharts';

const MonthlyChart = ({
data,
theme
}) => {

return(

<div
style={{
width:'100%',
height:'350px'
}}
>

<h3
style={{
marginBottom:'20px',
color:theme.text
}}
>

Monthly Distance Trend

</h3>

<ResponsiveContainer
width="100%"
height="100%"
>

<LineChart
data={data}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
dataKey="month"
/>

<YAxis />

<Tooltip />

<Line

type="monotone"

dataKey="distance"

stroke="#1976d2"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>

);

};

export default MonthlyChart;