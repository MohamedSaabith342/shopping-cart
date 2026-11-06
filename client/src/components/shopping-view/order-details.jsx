import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Package, MapPin, CreditCard, Clock } from "lucide-react";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const isConfirmed = orderDetails?.orderStatus === "confirmed" || orderDetails?.orderStatus === "delivered";
  const isRejected = orderDetails?.orderStatus === "rejected";

  return (
    <>
      <DialogOverlay className="backdrop-blur-md bg-zinc-950/40" />
      <DialogContent className="sm:max-w-[620px] p-6 rounded-3xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 max-h-[85vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            View complete information about your order, including items and shipping details.
          </DialogDescription>
        </VisuallyHidden>

        <div className="space-y-6">
          {/* Header Badge & Title */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Order Receipt
              </span>
              <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
                Order Details
              </h2>
            </div>
            <Badge
              className={`py-1 px-3 rounded-full text-xs font-bold ${
                isConfirmed
                  ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                  : isRejected
                  ? "bg-rose-600 hover:bg-rose-600 text-white"
                  : "bg-amber-600 hover:bg-amber-600 text-white"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>

          {/* Key Value Metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800">
            <div>
              <span className="text-zinc-400 font-medium">Order ID</span>
              <p className="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs truncate mt-0.5">
                {orderDetails?._id}
              </p>
            </div>
            <div>
              <span className="text-zinc-400 font-medium">Order Date</span>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {orderDetails?.orderDate?.split("T")[0]}
              </p>
            </div>
            <div>
              <span className="text-zinc-400 font-medium">Payment Method</span>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase mt-0.5">
                {orderDetails?.paymentMethod}
              </p>
            </div>
            <div>
              <span className="text-zinc-400 font-medium">Payment Status</span>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize mt-0.5">
                {orderDetails?.paymentStatus}
              </p>
            </div>
          </div>

          {/* Items Purchased List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-emerald-600" /> Items Purchased
            </h3>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover border" />
                        )}
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{item.title}</p>
                          <p className="text-zinc-400 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                        ${item.price}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>

          <Separator />

          {/* Total & Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Shipping Destination
              </span>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200 pt-1">{user?.userName}</p>
              <p className="text-zinc-500">{orderDetails?.addressInfo?.address}</p>
              <p className="text-zinc-500">{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}</p>
              <p className="text-zinc-500">Phone: {orderDetails?.addressInfo?.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500/20 flex flex-col justify-between">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Total Price Paid</span>
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-heading">
                ${orderDetails?.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
}

export default ShoppingOrderDetailsView;