import { useState, useEffect } from 'react';
import { fetchAvailability, createAvailability } from '../../services/availabilityService';

const Availability = ({ propertyId }) => {
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ property_id: propertyId, start_date: '', end_date: '' });

  useEffect(() => {
    (async () => {
      const res = await fetchAvailability(propertyId);
      setSlots(res.data);
    })();
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAvailability(form);
    alert('Availability added');
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Availability</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="date" onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="border p-2" />
        <input type="date" onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>
      <ul className="mt-4">
        {slots.map((slot) => (
          <li key={slot.id} className="border-b py-1">
            {slot.start_date} to {slot.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Availability;
