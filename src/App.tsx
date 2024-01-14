import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Product from "./components/product";
import Customer from "./components/customer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/customers" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;
