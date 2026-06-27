import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const ProgressChart = ({ data, theme }) => {

  return (
    <div
      style={{
        background: theme.card,
        color: theme.text,
        padding: '20px',
        borderRadius: '12px',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '25px',
      }}
    >
      <h2>Weekly Distance Progress</h2>

      <div
       style={{
          width: '100%',
          height: '300px',
  }}
>
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
    </div>
  );
};

export default ProgressChart;