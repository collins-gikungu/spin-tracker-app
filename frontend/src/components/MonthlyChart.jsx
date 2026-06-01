import {
ResponsiveContainer,
LineChart,
Line,
CartesianGrid,
XAxis,
YAxis,
Tooltip,
Area,
AreaChart,
gradient,
animationDuration

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
height={320}
>

<AreaChart
data={data}
>

<defs>

<linearGradient
id="colorDistance"
x1="0"
y1="0"
x2="0"
y2="1"
>

<stop
offset="5%"
stopColor="#42a5f5"
stopOpacity={0.8}
/>

<stop
offset="95%"
stopColor="#42a5f5"
stopOpacity={0.05}
/>

</linearGradient>

</defs>

<CartesianGrid
strokeDasharray="3 3"
opacity={0.15}
/>

<XAxis
dataKey="week_start"
/>

<YAxis />

<Tooltip
contentStyle={{

borderRadius:'14px',

border:'none',

boxShadow:
'0 8px 24px rgba(0,0,0,0.12)'

}}
/>

<Area

type="monotone"

dataKey="total_distance_km"

stroke="#1976d2"

strokeWidth={3}

fillOpacity={1}

fill="url(#colorDistance)"

animationDuration={1800}

/>

</AreaChart>

</ResponsiveContainer>

</div>

);

};

export default MonthlyChart;