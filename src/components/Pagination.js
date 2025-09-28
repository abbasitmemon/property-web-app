const Pagination = ({ meta, onPageChange }) => {
  if (!meta?.links) return null;
  return (
    <div className="flex gap-2 justify-center mt-6">
      {meta.links.map((link, i) => {
        const label = link.label.replace(/&laquo;|&raquo;/g, '').trim();
        const page = link.url ? Number(new URL(link.url).searchParams.get('page')) : null;
        return (
          <button
            key={i}
            disabled={!page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded border ${
              link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
export default Pagination;
