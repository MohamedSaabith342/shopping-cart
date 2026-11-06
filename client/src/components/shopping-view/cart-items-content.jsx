import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        if (getCurrentProductIndex > -1) {
          const getTotalStock = productList[getCurrentProductIndex].totalStock;
          if (indexOfCurrentCartItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
            if (getQuantity + 1 > getTotalStock) {
              toast.warning(`Only ${getQuantity} quantity available for this item`);
              return;
            }
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart updated");
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item removed from cart");
      }
    });
  }

  const effectivePrice = cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;

  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 transition-all">
      {/* Product Image */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-16 h-16 rounded-xl object-cover border border-zinc-200/80 dark:border-zinc-800 shrink-0"
      />

      {/* Item info & Quantity stepper */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
          {cartItem?.title}
        </h4>
        <p className="text-xs text-zinc-400 mt-0.5 font-medium">
          ${effectivePrice} each
        </p>

        {/* Stepper controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0.5">
            <Button
              variant="ghost"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
              className="h-6 w-6 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-30"
            >
              <Minus className="w-3 h-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="px-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
              {cartItem?.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
              className="h-6 w-6 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            >
              <Plus className="w-3 h-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Item total price & delete button */}
      <div className="flex flex-col items-end justify-between h-full space-y-3">
        <span className="font-extrabold text-xs text-zinc-900 dark:text-zinc-100">
          ${(effectivePrice * cartItem?.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => handleCartItemDelete(cartItem)}
          className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
