import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProperty } from "../../services/propertyService";
import AdminLayout from "../../components/AdminLayout";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const AdminPropertyView = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchProperty(id); // should call admin endpoint
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to fetch property", err);
        toast.error("Failed to load property");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (!property) return <p className="p-6">Property not found.</p>;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
        <p className="text-gray-600 mb-4">{property.description}</p>
        <p className="text-sm text-gray-500">📍 {property.location}</p>
        <p className="text-sm text-gray-700 mb-4">
          💰 ${property.price_per_night} / night
        </p>

        {/* Image Gallery */}
        <h3 className="font-semibold mb-2">Gallery</h3>
        <div className="flex overflow-x-auto gap-3 p-2 bg-gray-50 border rounded mb-6">
          {(property.images || []).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${property.title} image ${i + 1}`}
              className="flex-shrink-0 h-48 w-64 object-cover rounded shadow-md"
            />
          ))}
        </div>

        {/* Amenities */}
        <h3 className="font-semibold mb-2">Amenities</h3>
        <ul className="flex flex-wrap gap-2 mb-6">
          {(property.amenities || []).map((a, i) => (
            <li
              key={i}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
            >
              {a}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Link
            to={`/admin/properties/edit/${property.id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </Link>
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPropertyView;
