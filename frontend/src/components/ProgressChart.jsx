import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ProgressChart = ({ data }) => {

  const formattedData = data.map(
    (item) => ({
      week: new Date(
        item.week_start
      ).toLocaleDateString(),

      distance: Number(
        item.total_distance_km
      ),
    })
  );

  return (
    <div
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '25px',
      }}
    >
      <h2>Weekly Distance Progress</h2>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="week" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="distance"
              stroke="#1565c0"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;