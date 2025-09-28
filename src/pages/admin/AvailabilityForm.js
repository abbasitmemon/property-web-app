import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import toast from "react-hot-toast";
import {
  createAvailability,
  updateAvailability,
  fetchAvailabilities,
} from "../../services/propertyService";

const AvailabilityForm = ({ editMode = false }) => {
  const { id } = useParams(); // property_id
  const navigate = useNavigate();

  const [form, setForm] = useState({
    property_id: id,
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  // If edit mode, fetch existing availability
  useEffect(() => {
    if (editMode) {
      (async () => {
        try {
          const res = await fetchAvailabilities(id);
          if (res.data) {
            setForm({
              property_id: id,
              start_date: res.data.start_date,
              end_date: res.data.end_date,
            });
          }
        } catch (err) {
          toast.error("Failed to load availability");
        }
      })();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editMode) {
        await updateAvailability(id, form);
        toast.success("Availability updated successfully!");
      } else {
        await createAvailability(form);
        toast.success("Availability created successfully!");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Failed to save availability", err);
      toast.error("Failed to save availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">
          {editMode ? "Update Availability" : "Add Availability"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 px-4 rounded ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Saving..."
              : editMode
              ? "Update Availability"
              : "Add Availability"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AvailabilityForm;
