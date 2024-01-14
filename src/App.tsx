import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Product from "./components/product";
import Customer from "./components/customer";
import FetchSales from "./components/fetchSales";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/sales" element={<FetchSales />} />
      </Routes>
    </Router>
  );
}

export default App;
