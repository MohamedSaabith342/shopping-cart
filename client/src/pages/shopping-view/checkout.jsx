import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";
import { ShieldCheck, CreditCard, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast.warning("Your cart is empty. Please add items to proceed");
      return;
    }
    if (currentSelectedAddress === null) {
      toast.warning("Please select a delivery address to proceed.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="bg-background min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-8 border-b border-zinc-200/80 dark:border-zinc-800 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Secure Checkout
          </span>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-heading mt-1">
            Complete Your Order
          </h1>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                  1. Select Shipping Address
                </h2>
              </div>
              <Address
                selectedId={currentSelectedAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            </div>
          </div>

          {/* Right Column: Order Summary & Payment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                  2. Order Summary
                </h2>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                  cartItems.items.map((item) => (
                    <UserCartItemsContent key={item.productId} cartItem={item} />
                  ))
                ) : (
                  <p className="text-xs text-zinc-400 italic">No items in cart</p>
                )}
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    ${totalCartAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Delivery</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">$0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-black text-zinc-900 dark:text-zinc-100 font-heading">
                  <span>Total Amount</span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    ${totalCartAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment CTA */}
              <Button
                onClick={handleInitiatePaypalPayment}
                disabled={isPaymentStart || !cartItems?.items?.length}
                className="w-full py-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 text-base transition-all disabled:opacity-50"
              >
                <CreditCard className="w-5 h-5" />
                <span>
                  {isPaymentStart
                    ? "Redirecting to PayPal..."
                    : "Pay Now with PayPal"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted 256-bit PayPal Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
