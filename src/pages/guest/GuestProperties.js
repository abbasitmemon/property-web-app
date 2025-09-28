import { useEffect, useState } from 'react';
import { get } from '../../api/http';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

const GuestProperties = () => {
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await get('/guest/properties', { page });
      setProperties(res.data);
      setMeta(res.meta);
    })();
  }, [page]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Available Properties</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex overflow-x-auto space-x-2 p-2">
              {p.images.map((img, i) => (
                <img key={i} src={img} alt={`Property ${p.id}`} className="h-40 w-40 object-cover rounded" />
              ))}
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{p.title}</h3>
              <p className="text-gray-600 mb-2">{p.description}</p>
              <p className="text-sm text-gray-500 mb-2">📍 {p.location}</p>
              <p className="text-sm text-gray-500 mb-2">💰 ${p.price_per_night} / night</p>

              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-1">Amenities:</h4>
                <ul className="flex flex-wrap gap-2">
                  {p.amenities.map((a, i) => (
                    <li key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate(`/book/${p.id}`)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Pagination meta={meta} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default GuestProperties;
