import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./addProduct";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  code: string;
  itemName: string;
  itemImage: string;
  batchCode: string;
  qty: number;
  unitPrice: string;
  mrp: string;
  taxValue: string;
  gstPercentage: string;
  gstAmount: string;
  total: string;
  staff: string;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      let url = `http://localhost:3000/product?belongsTo=${filter.toUpperCase()}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data);
      navigate("/products");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [filter]);

  const deleteProduct = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      let url = `http://localhost:3000/product/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete product");
      fetchProducts();

      await response.json();
      if (response) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, filter]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-end flex-1">
          <h2 className="text-l leading-tight text-gray-900">
            <Link to="/dashboard">Go to dashboard</Link>
          </h2>
        </div>
        <br />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
            Products
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg text-sm px-4 py-2.5"
            >
              <option value="all">ALL</option>
              <option value="owner">OWNER</option>
            </select>
            <button
              onClick={() => setShowModal(true)}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Product
            </button>
          </div>
          {showModal && (
            <AddProduct
              onClose={() => setShowModal(false)}
              onProductAdded={() => {
                setShowModal(false);
                fetchProducts();
              }}
            />
          )}{" "}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <div className="w-full flex justify-center">
                <img
                  src={product.itemImage} // Using the image URL from product data
                  alt={product.itemImage}
                  className="h-32 w-32 object-cover rounded-md mb-4"
                />
              </div>

              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.itemName}
                </h3>
              </div>

              <div className="text-center text-sm">
                <p className="text-gray-500">Quantity: {product.qty}</p>
                <p className="font-medium text-gray-900">MRP: ₹{product.mrp}</p>
                <p className="text-gray-600">
                  GST: {product.gstAmount} ({product.gstPercentage}%)
                </p>
              </div>
              <button
                onClick={() => deleteProduct(product?.id)}
                className="absolute top-2 right-2 hidden group-hover:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500 hover:text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 6l-1.5 1.5M4.5 6l1.5 1.5M15 6h-6m1.5 0V5.25c0-.414.336-.75.75-.75h1.5c.414 0 .75.336.75.75V6m0 0v10.5c0 .414-.336.75-.75.75h-3c-.414 0-.75-.336-.75-.75V6"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
