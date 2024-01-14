import { useState } from "react";

interface Props {
  onClose: () => void;
  onProductAdded: () => void;
}

const AddProduct: React.FC<Props> = ({ onClose, onProductAdded }) => {
  const [productCode, setProductCode] = useState("");
  const [productImage, setProductImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [productName, setProductName] = useState("");

  const add = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: productCode,
          itemImage: productImage,
          qty: parseInt(quantity),
          unitPrice: parseInt(unitPrice),
          mrp: parseInt(mrp),
          itemName: productName,
          staff: "ds",
        }),
      });

      if (!response.ok) throw new Error("Failed create products");

      const data = await response.json();
      if (data) {
        onProductAdded();
        onClose();
      }

      console.log("Products:", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>{" "}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {" "}
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-xl overflow-hidden w-full max-w-lg p-6">
          {" "}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Add New Product
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={add}>
            <div className="mb-3">
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <input
                id="productName"
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Paste Product Image URL"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Product Code
              </label>
              <input
                id="productName"
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Product Code"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                id="Quantity"
                type="number"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="mrp"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                MRP
              </label>
              <input
                id="mrp"
                type="number"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="MRP"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="Unit Price"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Unit Price
              </label>
              <input
                id="Unit Price"
                type="number"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Unit Price"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
