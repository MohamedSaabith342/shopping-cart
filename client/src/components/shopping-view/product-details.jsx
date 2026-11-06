import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/products-slice";
import StarRatingComponent from "../common/star-rating";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ShoppingBag, Star, MessageSquare } from "lucide-react";
import { Badge } from "../ui/badge";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const { reviews } = useSelector((state) => state.shopReview);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    if (!reviewMsg.trim()) return;
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Review added successfully!");
      }
    });
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.warning(`Only ${getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const isOutOfStock = productDetails?.totalStock === 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-4xl sm:max-w-4xl p-0 overflow-hidden rounded-3xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto md:overflow-hidden">
          {/* Left Column: Image Container */}
          <div className="relative bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-6 md:p-8">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-full max-h-[450px] object-cover rounded-2xl shadow-lg"
            />
            {isOutOfStock && (
              <Badge className="absolute top-4 left-4 bg-rose-600 text-white font-bold px-3 py-1 text-xs rounded-full">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Right Column: Product Info & Reviews */}
          <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[600px] space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {productDetails?.category}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  Brand: {productDetails?.brand}
                </span>
              </div>

              <DialogTitle className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
                {productDetails?.title}
              </DialogTitle>

              <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                {productDetails?.description}
              </DialogDescription>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-baseline gap-2">
                  {productDetails?.salePrice > 0 ? (
                    <>
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                        ${productDetails?.salePrice}
                      </span>
                      <span className="text-sm text-zinc-400 line-through">
                        ${productDetails?.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                      ${productDetails?.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800">
                  <StarRatingComponent rating={averageReview} />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    ({averageReview.toFixed(1)})
                  </span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="mt-6">
                {isOutOfStock ? (
                  <Button disabled className="w-full py-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 font-bold">
                    Out of Stock
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleAddToCart(productDetails?._id, productDetails?.totalStock)
                    }
                    className="w-full py-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 text-base transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Shopping Cart</span>
                  </Button>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Reviews Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Customer Reviews ({reviews?.length || 0})
              </h3>

              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7 border border-emerald-600/30">
                            <AvatarFallback className="bg-zinc-900 text-white font-bold text-[10px]">
                              {reviewItem?.userName ? reviewItem.userName[0].toUpperCase() : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            {reviewItem?.userName}
                          </span>
                        </div>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-normal pl-9">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-400 italic">No reviews yet. Be the first to share your feedback!</p>
                )}
              </div>

              {/* Add Review Box */}
              <div className="pt-2 space-y-3">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Write a Review</Label>
                <div className="flex items-center gap-2">
                  <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
                  <span className="text-xs text-zinc-400 font-medium">
                    {rating > 0 ? `${rating} / 5 Stars` : "Select stars"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    name="reviewMsg"
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    className="h-10 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-600"
                  />
                  <Button
                    onClick={handleAddReview}
                    disabled={!reviewMsg.trim() || rating === 0}
                    className="bg-zinc-900 hover:bg-emerald-600 text-white text-xs font-semibold h-10 px-4 rounded-xl shrink-0"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
