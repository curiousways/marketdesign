import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import BidderForm from "./BidderForm";

type Open = boolean;
type Bidder = any;
type Props = {
  open: Open;
  setOpen: (open: Open) => void;
  type: "Seller" | "Buyer";
  addBidder: (bidder: Bidder) => void;
};

export default function PersonModal({ open, type, setOpen, addBidder }: Props) {
  const [bids, setBids] = useState<any[]>([]);
  const [name, setName] = useState("");

  const cancelButtonRef = useRef(null);

  const add = () => {
    const newBidder = { name, bids };
    addBidder(newBidder);
    setOpen(false);
  };

  return (
    <Transition appear={true} show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-8">
                {/* Form */}
                <BidderForm
                  type={type}
                  bids={bids}
                  name={name}
                  updateName={setName}
                  updateBids={setBids}
                />
                <div className="mt-8 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={add}
                    ref={cancelButtonRef}
                  >
                    Add {type}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
