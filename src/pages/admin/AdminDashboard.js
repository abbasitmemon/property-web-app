import { useEffect, useState } from "react";
import { fetchAdminProperties } from "../../services/propertyService";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    min_price: "",
    max_price: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchAdminProperties(page, filters);
        setProperties(res.data || []);
        setMeta(res.meta || {});
      } catch (err) {
        console.error("Failed to fetch properties", err);
        toast.error("Failed to load properties");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, filters]);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Properties</h2>
        <Link
          to="/admin/properties/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Property
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          className="border rounded p-2"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          className="border rounded p-2"
          placeholder="Min Price"
          value={filters.min_price}
          onChange={(e) =>
            setFilters({ ...filters, min_price: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          placeholder="Max Price"
          value={filters.max_price}
          onChange={(e) =>
            setFilters({ ...filters, max_price: e.target.value })
          }
        />
        <input
          className="border rounded p-2"
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Price/Night</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No properties found.
                </td>
              </tr>
            ) : (
              properties.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">{p.location}</td>
                  <td className="px-4 py-2">${p.price_per_night}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`/admin/properties/view/${p.id}`}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/properties/edit/${p.id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/admin/properties/${p.id}/availability`}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Availability
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination meta={meta} onPageChange={setPage} />
    </AdminLayout>
  );
};

export default AdminDashboard;
