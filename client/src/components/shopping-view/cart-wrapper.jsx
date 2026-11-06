import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { Separator } from "../ui/separator";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent side="right" className="w-full sm:max-w-md p-6 flex flex-col justify-between bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800">
      <div>
        <SheetHeader className="pb-4 border-b border-zinc-200/80 dark:border-zinc-800 text-left">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold font-heading">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            Shopping Cart ({cartItems?.length || 0})
          </SheetTitle>
          <SheetDescription className="text-xs text-zinc-500">
            Review your selected items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>

        {/* Cart Item List */}
        <div className="mt-6 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto" />
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Your cart is empty</p>
              <p className="text-xs text-zinc-400">Discover our collection and add items to your cart.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Summary & Checkout Button */}
      <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 space-y-4">
        <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">${totalCartAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
          <Separator className="my-2 bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="flex justify-between text-base font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
            <span>Total</span>
            <span className="text-emerald-700 dark:text-emerald-400">${totalCartAmount.toFixed(2)}</span>
          </div>
        </div>

        <Button
          disabled={!cartItems || cartItems.length === 0}
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full py-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Guaranteed Safe & Secure Checkout</span>
        </div>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
