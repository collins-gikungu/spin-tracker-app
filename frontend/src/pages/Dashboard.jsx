import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';

const Dashboard = () => {
  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#1565c0',
          marginBottom: '30px',
        }}
      >
        Spin Tracker Dashboard 🚴
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1fr 1fr',
          gap: '20px',
        }}
      >
        <WorkoutForm />

        <WorkoutHistory />
      </div>
    </div>
  );
};

export default Dashboard;