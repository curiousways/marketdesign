import { useState } from "react";

type Bid = any;
type Bids = any[];
type Name = string;

type Props = {
  type: "Seller" | "Buyer";
  bids: Bids;
  name: Name;
  updateBids: (bid: Bid) => void;
  updateName: (name: Name) => void;
};

const BidderForm = ({ type, bids, name, updateName, updateBids }: Props) => {
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const clearBidForm = () => {
    setPrice("");
    setProduct("");
    setQuantity("");
  };

  const addBid = () => {
    const v = type === "Buyer" ? Number(price) : -Math.abs(Number(price));
    const q = type === "Buyer" ? -Math.abs(Number(quantity)) : Number(quantity);

    updateBids([...bids, { v, q: { P: q } }]);
    clearBidForm();
  };

  return (
    <div className="space-y-8">
      {/* Add Bidder Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          {type === "Buyer" ? "Buyer's" : "Seller's"} Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            className="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Enter name"
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </div>
      </div>

      {/* Bids Form */}
      <div className="space-y-4">
        <h4 className="text-xl">Add Bids</h4>
        <div className="space-y-4">
          {/* Add Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="price"
                id="price"
                className="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Add Product and Quantity */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productname"
                className="block text-sm font-medium text-gray-700"
              >
                Product
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Product name"
                  id="productname"
                  className="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                  placeholder="Enter Product Name"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
              </div>
            </div>

            {/* Product Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                  placeholder="Enter Product Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            onClick={addBid}
          >
            Add Bid
          </button>
        </div>
      </div>

      {/* Bids List */}
      <ul className="space-y-2 text-gray-500">
        {bids.map((bid: any, i) => (
          <li
            className="flex justify-between shadow-sm border border-gray-200 rounded-md p-4 max-w-md"
            key={i}
          >
            <span>P: {bid.q.P}</span>
            <span>{Math.abs(bid.v)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidderForm;
