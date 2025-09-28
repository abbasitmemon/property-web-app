import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";
import {
  createProperty,
  fetchProperty,
  updateProperty,
} from "../../services/propertyService";

const PropertyForm = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price_per_night: "",
    amenities: "",
    images: "",
  });
  const [loading, setLoading] = useState(false);

  // Load property if in edit mode
  useEffect(() => {
    if (editMode && id) {
      (async () => {
        try {
          setLoading(true);
          const res = await fetchProperty(id); // should return { data: { ...property } }
          const p = res.data;
          setForm({
            title: p.title || "",
            description: p.description || "",
            location: p.location || "",
            price_per_night: p.price_per_night || "",
            amenities: (p.amenities || []).join(", "),
            images: (p.images || []).join(", "),
          });
        } catch (err) {
          console.error("Failed to load property", err);
          toast.error("Failed to load property");
        } finally {
          setLoading(false);
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

      const payload = {
        ...form,
        amenities: form.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        images: form.images
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      };

      if (editMode) {
        await updateProperty(id, payload);
        toast.success("Property updated successfully!");
      } else {
        await createProperty(payload);
        toast.success("Property created successfully!");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">
          {editMode ? "Edit Property" : "Create New Property"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Price per Night
            </label>
            <input
              type="number"
              name="price_per_night"
              value={form.price_per_night}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Amenities (comma separated)
            </label>
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Images (comma separated URLs)
            </label>
            <input
              type="text"
              name="images"
              value={form.images}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 px-4 rounded ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Saving..."
              : editMode
              ? "Update Property"
              : "Create Property"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PropertyForm;
