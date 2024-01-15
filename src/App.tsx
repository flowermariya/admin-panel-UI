import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Product from "./components/product";
import Customer from "./components/customer";
import FetchSales from "./components/fetchSales";
import Sales from "./components/sales";

function App() {
  function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  const PrivateRoute: React.FC<any> = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Dashboard>
                <Customer />
              </Dashboard>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard>
                <Sales />
              </Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Dashboard>
                <Product />
              </Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <Dashboard>
                <FetchSales />
              </Dashboard>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
