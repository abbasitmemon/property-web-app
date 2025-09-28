import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminRoutes from "./routes/AdminRoutes";
import GuestRoutes from "./routes/GuestRoutes";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        {/* Guest routes */}
        <GuestRoutes />

        {/* Admin routes */}
        <AdminRoutes />
      </Router>
    </>
  );
}

export default App;
