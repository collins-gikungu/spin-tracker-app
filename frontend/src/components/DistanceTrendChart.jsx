import {
ResponsiveContainer,
LineChart,
Line,
CartesianGrid,
XAxis,
YAxis,
Tooltip
} from 'recharts';

const DistanceTrendChart = ({
data,
theme
}) => {

return (

<div
className="stat-card"
style={{

background:
theme.cardBackground,

padding:'20px',

borderRadius:'20px'

}}
>

<h3
style={{
marginBottom:'20px'
}}
>

📈 Distance Trends

</h3>

<ResponsiveContainer
width="100%"
height={300}
>

<LineChart
data={data}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
dataKey="date"
/>

<YAxis />

<Tooltip />

<Line

type="monotone"

dataKey="distance"

stroke={
theme.primary
}

strokeWidth={3}

dot={{
r:5
}}

activeDot={{
r:8
}}

/>

</LineChart>

</ResponsiveContainer>

</div>

);

};

export default DistanceTrendChart;