import { useState } from 'react';
import API from '../services/api';

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    duration_minutes: '',
    duration_seconds: '',
    distance: '',
    distance_unit: 'km',
    calories: '',
    odometer: '',
    rpm: '',
    power: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        duration_minutes: Number(formData.duration_minutes),
        duration_seconds: Number(formData.duration_seconds),
        calories: Number(formData.calories),
        odometer: Number(formData.odometer),
        rpm: Number(formData.rpm),
        power: Number(formData.power),
      };

      // Handle km/miles dynamically
      if (formData.distance_unit === 'km') {
        payload.distance_km = Number(formData.distance);
      } else {
        payload.distance_miles = Number(formData.distance);
      }

      const response = await API.post(
        '/workouts',
        payload
      );

      console.log(response.data);

      alert('Workout added successfully 🚴');

      // Reset form
      setFormData({
        duration_minutes: '',
        duration_seconds: '',
        distance: '',
        distance_unit: 'km',
        calories: '',
        odometer: '',
        rpm: '',
        power: '',
      });

    } catch (error) {
      console.error(error);

      alert('Failed to add workout');
    }
  };

  return (
    <div>
      <h2>Add Workout</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="duration_minutes"
          placeholder="Minutes"
          value={formData.duration_minutes}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="duration_seconds"
          placeholder="Seconds"
          value={formData.duration_seconds}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="distance"
          placeholder="Distance"
          value={formData.distance}
          onChange={handleChange}
          required
        />

        <select
          name="distance_unit"
          value={formData.distance_unit}
          onChange={handleChange}
        >
          <option value="km">KM</option>
          <option value="miles">Miles</option>
        </select>

        <input
          type="number"
          step="0.01"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.01"
          name="odometer"
          placeholder="Odometer"
          value={formData.odometer}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rpm"
          placeholder="RPM"
          value={formData.rpm}
          onChange={handleChange}
        />

        <input
          type="number"
          name="power"
          placeholder="Power"
          value={formData.power}
          onChange={handleChange}
        />

        <button type="submit">
          Save Workout
        </button>

      </form>
    </div>
  );
};

export default WorkoutForm;