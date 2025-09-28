import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import toast from "react-hot-toast";
import {
  fetchAvailabilities,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../../services/propertyService";

const AvailabilityManager = () => {
  const { id } = useParams(); // property_id
  const [availabilities, setAvailabilities] = useState([]);
  const [form, setForm] = useState({
    property_id: id,
    start_date: "",
    end_date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load all availabilities
  const loadAvailabilities = async () => {
    try {
      const res = await fetchAvailabilities(id);
      setAvailabilities(res.data || []);
    } catch (err) {
      toast.error("Failed to load availabilities");
    }
  };

  useEffect(() => {
    loadAvailabilities();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Check if new range overlaps with existing ones
  const hasOverlap = (start, end, excludeId = null) => {
    const newStart = new Date(start);
    const newEnd = new Date(end);

    return availabilities.some((a) => {
      if (excludeId && a.id === excludeId) return false;
      const existingStart = new Date(a.start_date);
      const existingEnd = new Date(a.end_date);

      return (
        (newStart >= existingStart && newStart <= existingEnd) ||
        (newEnd >= existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.end_date < form.start_date) {
      toast.error("End date cannot be before start date");
      return;
    }

    if (hasOverlap(form.start_date, form.end_date, editingId)) {
      toast.error("This availability overlaps with an existing one");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await updateAvailability(editingId, form);
        toast.success("Availability updated");
      } else {
        await createAvailability(form);
        toast.success("Availability created");
      }
      resetForm();
      loadAvailabilities();
    } catch (err) {
      //   console.log("errrrrr", err?.response?.data?.message || err.message);
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (a) => {
    setForm({
      property_id: id,
      start_date: a.start_date,
      end_date: a.end_date,
    });
    setEditingId(a.id);
  };

  const handleDelete = async (availabilityId) => {
    if (!window.confirm("Delete this availability?")) return;
    try {
      await deleteAvailability(availabilityId);
      toast.success("Availability deleted");
      loadAvailabilities();
    } catch (err) {
      toast.error("Failed to delete availability");
    }
  };

  const resetForm = () => {
    setForm({ property_id: id, start_date: "", end_date: "" });
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Availability</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 text-white font-semibold py-2 px-4 rounded ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Availability"
                : "Add Availability"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <h3 className="text-xl font-semibold mb-2">Existing Availabilities</h3>
        {availabilities.length === 0 ? (
          <p>No availabilities found.</p>
        ) : (
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {availabilities.map((a) => (
                <tr
                  key={a.id}
                  className={`border-t ${
                    editingId === a.id ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="px-4 py-2 border">{a.start_date}</td>
                  <td className="px-4 py-2 border">{a.end_date}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AvailabilityManager;
