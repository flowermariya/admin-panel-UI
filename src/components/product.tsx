// Product.js
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./addProduct";

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
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:3000/product", {
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
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl leading-tight text-gray-900">Products</h2>
          <button
            onClick={() => setShowModal(true)}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add Product
          </button>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
