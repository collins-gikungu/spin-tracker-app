import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const MonthlyChart = ({ data, theme }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '350px'
      }}
    >
      <h3
        style={{
          marginBottom: '20px',
          color: theme.text
        }}
      >
        Monthly Distance Trend
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="colorMonthlyDistance"
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
            dataKey="month"
            tick={{ fill: theme.text }}
            axisLine={{ stroke: theme.text }}
          />

          <YAxis 
            tick={{ fill: theme.text }}
            axisLine={{ stroke: theme.text }}
            label={{
              value: 'Distance (km)',
              angle: -90,
              position: 'insideLeft',
              style: { fill: theme.text }
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: '14px',
              border: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              backgroundColor: theme.card,
              color: theme.text
            }}
            formatter={(value) => [`${Number(value).toFixed(1)} km`, 'Distance']}
            labelFormatter={(label) => `Month: ${label}`}
          />

          <Area
            type="monotone"
            dataKey="distance"
            stroke="#1976d2"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMonthlyDistance)"
            animationDuration={1800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;