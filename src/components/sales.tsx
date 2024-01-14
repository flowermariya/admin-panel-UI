import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const short = require("short-uuid");

const Sales = () => {
  const navigate = useNavigate();
  const [deliveryDate, setDeliveryDate] = useState(getFormattedDate());
  const [billNumber, setBillNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isGst, setIsGst] = useState(false);
  const [transactionMode, setTransactionMode] = useState("CASH");
  const [note, setNote] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [totalTaxableAmount, setTotalTaxableAmount] = useState("");
  const [outstanding, setOutstanding] = useState("");
  const [discount, setDiscount] = useState("");
  const [gstAmount, setGstAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [amount, setAmount] = useState("");
  const [roundOff, setRoundOff] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [itemName, setItemName] = useState("");
  const [productDetails, setProductDetails] = useState({
    id: "",
    code: "",
    batchCode: "",
    price: "",
    qty: "",
    unitPrice: "",
    mrp: "",
    taxValue: "",
    gstPercentage: "",
    gstAmount: "",
    total: "",
  });

  function getFormattedDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function generateBillNumber() {
    let newBillNumber = short.generate();
    newBillNumber = `TR_${newBillNumber}`;
    return newBillNumber;
  }

  const handleItemNameChange = async (e: any) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const newItemName = e.target.value;
    setItemName(newItemName);

    let url = `http://localhost:3000/product/search/${newItemName}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const productData = await response.json();

    setProductDetails({
      id: productData[0].id,
      code: productData[0]?.code,
      price: productData[0]?.price,
      batchCode: productData[0]?.batchCode,
      qty: productData[0]?.qty,
      unitPrice: productData[0]?.unitPrice,
      mrp: productData[0]?.mrp,
      taxValue: productData[0]?.taxValue,
      gstPercentage: productData[0]?.gstPercentage,
      gstAmount: productData[0]?.gstAmount,
      total: productData[0]?.total,
    });
  };

  const handleSalesSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      let url = `http://localhost:3000/sales`;

      const decodedToken = jwtDecode(token);
      const userId: any = decodedToken?.sub;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          billNo: billNumber,
          billDate: new Date(),
          eWayBillNumber: billNumber,
          deliveryDate: new Date(),
          customer: {
            customerName: customerName,
            phoneNumber: parseInt(phoneNumber),
            address: address,
            deliveryAddress: deliveryAddress,
            isGST: isGst,
            Mode: transactionMode.toUpperCase(),
          },
          note: note,
          vehicleNumber: parseInt(vehicleNumber),
          deliveryCharge: deliveryCharge,
          totalTaxableAmount: parseInt(totalTaxableAmount),
          outStanding: parseInt(outstanding),
          discount: parseInt(discount),
          gstAmount: parseInt(gstAmount),
          paymentMode: paymentMode.toUpperCase(),
          amount: parseInt(amount),
          roundOff: parseInt(roundOff),
          grandTotal: parseInt(grandTotal),
          staffId: userId,
          productId: productDetails?.id,
        }),
      });

      if (!response.ok) throw new Error("Failed create sales");

      const data = await response.json();
      if (data) {
        navigate("/sales");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const generatedNumber = generateBillNumber();
    setBillNumber(generatedNumber);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <p className="text-gray-500 mb-6">Sales Billing Window </p>{" "}
          <form onSubmit={handleSalesSubmit}>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-4">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-1">
                      <label form="bill number">Bill No</label>
                      <input
                        type="text"
                        name="bill number"
                        disabled
                        id="bill number"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={billNumber}
                        readOnly
                        placeholder="bill number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label form="bill date">Bill Date</label>
                      <input
                        type="text"
                        name="bill date"
                        id="bill date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={deliveryDate}
                        readOnly
                        disabled
                        placeholder="bill date"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="eway bill number">Eway Bill Number</label>
                      <input
                        type="text"
                        name="eway bill number"
                        id="eway bill number"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={billNumber}
                        readOnly
                        placeholder="eway bill number"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="delivery date">Delivery Date</label>
                      <input
                        type="text"
                        name="delivery date"
                        id="delivery date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={deliveryDate}
                        readOnly
                        disabled
                        placeholder="delivery date"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="customer name">Customer Name</label>
                      <input
                        type="text"
                        name="customer name"
                        id="customer name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="customer name"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="phone number">Phone Number</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="phone number"
                          id="phone number"
                          placeholder="phone number"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label form="address">Address</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <textarea
                          name="address"
                          id="address"
                          placeholder="address"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label form="delivery address">Delivery Address</label>
                      <textarea
                        name="delivery address"
                        id="delivery address"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="delivery address"
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        value={deliveryAddress}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="isGst">Is GST</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          type="checkbox"
                          name="isGst"
                          id="isGst"
                          className="h-5 w-5 text-blue-500 ml-2 mr-3"
                          onChange={(e) => setIsGst(e.target.checked)}
                          checked={isGst}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label form="transaction mode">Transaction Mode</label>
                      <select
                        name="transactionMode"
                        id="transactionMode"
                        onChange={(e) => setTransactionMode(e.target.value)}
                        value={transactionMode}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      >
                        <option value="CASH">CASH</option>
                        <option value="CREDIT">CREDIT</option>
                        <option value="DEBIT">DEBIT</option>
                      </select>
                    </div>
                  </div>{" "}
                  <br /> <br />
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-1">
                      <label form="zipcode">Code</label>
                      <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        value={productDetails.code}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="item name">Item Name</label>
                      <input
                        type="text"
                        name="item name"
                        id="item name"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="item name"
                        value={itemName}
                        onChange={handleItemNameChange}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="batch code">Batch Code</label>
                      <input
                        type="text"
                        name="batch code"
                        id="batch code"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="batch code"
                        value={productDetails?.batchCode}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="Qty">Qty</label>
                      <input
                        type="text"
                        name="Qty"
                        id="Qty"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="qty"
                        value={productDetails?.qty}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="unit price">Unit Price</label>
                      <input
                        type="text"
                        name="unit price"
                        id="unit price"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="unit price"
                        value={productDetails?.unitPrice}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="mrp">MRP</label>
                      <input
                        type="text"
                        name="mrp"
                        id="mrp"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="mrp"
                        value={productDetails?.mrp}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="tax value">Tax Value</label>
                      <input
                        type="text"
                        name="tax value"
                        id="tax value"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="tax value"
                        value={productDetails?.taxValue}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="gst %">GST %</label>
                      <input
                        type="text"
                        name="gst %"
                        id="gst %"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="gst %"
                        value={productDetails?.gstPercentage}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="gst amount">GST Amount</label>
                      <input
                        type="text"
                        name="gst amount"
                        id="gst amount"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="gst amount"
                        value={productDetails?.gstAmount}
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="total">Total</label>
                      <input
                        type="text"
                        name="total"
                        id="total"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="total"
                        value={productDetails?.total}
                        readOnly
                      />
                    </div>
                  </div>
                  <br /> <br />
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-1">
                      <label form="note">Note</label>
                      <textarea
                        name="note"
                        id="note"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="note"
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="vehicle number">Vehicle Number</label>
                      <input
                        type="text"
                        name="vehicle number"
                        id="vehicle number"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="vehicle number"
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        value={vehicleNumber}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="delivery charge">Delivery Charge</label>
                      <input
                        type="text"
                        name="delivery charge"
                        id="delivery charge"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="delivery charge"
                        onChange={(e) => setDeliveryCharge(e.target.value)}
                        value={deliveryCharge}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="total taxable amount">
                        Total Taxable Amount
                      </label>
                      <input
                        type="text"
                        name="total taxable amount"
                        id="total taxable amount"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="total taxable amount"
                        onChange={(e) => setTotalTaxableAmount(e.target.value)}
                        value={totalTaxableAmount}
                      />
                    </div>{" "}
                    <div className="md:col-span-1">
                      <label form="out standing">Out standing</label>
                      <input
                        type="text"
                        name="out standing"
                        id="out standing"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="out standing"
                        onChange={(e) => setOutstanding(e.target.value)}
                        value={outstanding}
                      />
                    </div>{" "}
                    <div className="md:col-span-1">
                      <label form="discount">Discount</label>
                      <input
                        type="text"
                        name="discount"
                        id="discount"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="discount"
                        onChange={(e) => setDiscount(e.target.value)}
                        value={discount}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="gst amount">GST Amount</label>
                      <input
                        type="text"
                        name="gst amount"
                        id="gst amount"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="gst amount"
                        onChange={(e) => setGstAmount(e.target.value)}
                        value={gstAmount}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label form="payment mode">Payment Mode</label>
                      <select
                        name="transactionMode"
                        id="transactionMode"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setPaymentMode(e.target.value)}
                        value={paymentMode}
                      >
                        <option value="CASH">CASH</option>
                        <option value="CREDIT">CREDIT</option>
                        <option value="DEBIT">DEBIT</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label form="amount">Amount</label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                      />
                    </div>
                  </div>{" "}
                  <br /> <br />
                </div>

                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-2">
                    <label form="round off">Round Off</label>
                    <input
                      type="text"
                      name="round off"
                      id="round off"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="round off"
                      onChange={(e) => setRoundOff(e.target.value)}
                      value={roundOff}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label form="grand total">Grand Total</label>
                    <input
                      type="text"
                      name="grand total"
                      id="grand total"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="grand total"
                      onChange={(e) => setGrandTotal(e.target.value)}
                      value={grandTotal}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-white-300 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded">
                    Clear
                  </button>{" "}
                  &nbsp;
                  <br />
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sales;
