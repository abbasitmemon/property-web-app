import { useEffect, useState } from "react";
import { fetchGuestProperties } from "../../services/propertyService";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    min_price: "",
    max_price: "",
    date: "",
  });
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchGuestProperties(page, filters);
        setProperties(res.data || []);
        setMeta(res.meta || {});
      } catch {
        toast.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    })();
  }, [page, filters]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">
        Explore Properties
      </h2>

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

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div key={p.id} className="bg-white shadow rounded overflow-hidden">
              <div className="flex overflow-x-auto gap-2 p-2 bg-gray-100">
                {(p.images || []).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`p-${p.id}-${i}`}
                    className="h-40 w-40 object-cover rounded"
                  />
                ))}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-gray-600">{p.description}</p>
                <p className="text-sm text-gray-500 mt-1">📍 {p.location}</p>
                <p className="text-sm text-gray-700 mt-1">
                  💰 ${p.price_per_night} / night
                </p>

                <div className="mt-3">
                  <h4 className="font-medium text-gray-700 mb-1">Amenities</h4>
                  <ul className="flex flex-wrap gap-2">
                    {(p.amenities || []).map((a, i) => (
                      <li
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/property/${p.id}`}
                    className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/book/${p.id}`}
                    className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Book now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination meta={meta} onPageChange={setPage} />
    </div>
  );
};

export default Properties;
