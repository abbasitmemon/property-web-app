import { useState } from "react";
import { createBooking } from "../../services/bookingService";
import toast from "react-hot-toast";

const Booking = ({ propertyId }) => {
  const [form, setForm] = useState({
    property_id: propertyId,
    guest_name: "",
    guest_email: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createBooking(form);
      toast.success("Booking submitted successfully!");
      // Optionally reset form
      setForm({
        property_id: propertyId,
        guest_name: "",
        guest_email: "",
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      console.error("Booking failed:", error);
      // Show backend error message if available
      const message =
        error?.response?.data?.message ||
        "Failed to submit booking. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Book This Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={form.guest_name}
              onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.guest_email}
              onChange={(e) =>
                setForm({ ...form, guest_email: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition-colors ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Submitting..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
