const Loader = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
    <span className="text-gray-700">{text}</span>
  </div>
);
export default Loader;
