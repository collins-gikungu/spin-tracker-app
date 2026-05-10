import WorkoutForm from '../components/WorkoutForm';
import WorkoutHistory from '../components/WorkoutHistory';

const Dashboard = () => {
  return (
    <div>
      <h1>Spin Tracker Dashboard 🚴</h1>

      <WorkoutForm />

      <WorkoutHistory />
    </div>
  );
};

export default Dashboard;