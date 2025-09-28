import { useEffect, useState } from "react";
import {
  fetchProperty,
  guestFetchProperty,
} from "../../services/propertyService";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast"; // <-- Added 'Toaster' import

// NOTE: You must include the <Toaster /> component somewhere in your app
// (usually in App.js or a layout component) for the toasts to actually appear.

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if ID is present before fetching
    if (!id) {
      toast.error("Missing property ID");
      return;
    }

    const loadProperty = async () => {
      try {
        setLoading(true);
        // The fetchProperty service likely returns an object like: { data: propertyData }
        const res = await guestFetchProperty(id);

        // CORRECTION: Destructure the property data from the 'data' key.
        setProperty(res.data);
      } catch (error) {
        // You can log the error for better debugging
        console.error("Fetch property failed:", error);
        toast.error("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) return <Loader />;

  // NOTE: 'property' will be null on initial render, but also if the fetch fails
  // or the property doesn't exist, so this is a good check.
  if (!property)
    return (
      <div className="p-6 text-center text-red-600">
        Property not found or failed to load.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
      <p className="text-gray-700 mb-2">{property.description}</p>

      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <p className="text-sm text-gray-500 flex items-center">
          <span className="mr-1">📍</span> {property.location}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          💰 ${parseFloat(property.price_per_night).toFixed(2)} / night
        </p>
      </div>

      {/* Image Gallery */}
      <h3 className="font-semibold mb-2">Gallery</h3>
      <div className="flex overflow-x-auto gap-3 p-2 bg-gray-50 border rounded my-4">
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
      <h3 className="font-semibold mb-1 mt-4">Amenities</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {(property.amenities || []).map((a, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {a.charAt(0).toUpperCase() + a.slice(1)}{" "}
            {/* Capitalize first letter */}
          </span>
        ))}
      </div>

      <Link
        to={`/book/${property.id}`}
        className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Book this property now
      </Link>
    </div>
  );
};

export default PropertyDetails;
