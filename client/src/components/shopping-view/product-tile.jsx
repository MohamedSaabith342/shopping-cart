import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { categoryOptionsMap, brandOptionsMap } from "@/config";
import { ShoppingBag, Eye } from "lucide-react";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock > 0 && product?.totalStock < 10;
  const isOnSale = product?.salePrice > 0;

  return (
    <Card className="w-full max-w-sm mx-auto group border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between">
      <div 
        onClick={() => handleGetProductDetails(product?._id)} 
        className="cursor-pointer flex flex-col flex-1"
      >
        {/* Product Image Container */}
        <div className="relative w-full h-[280px] bg-zinc-100 dark:bg-zinc-800/60 overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          {/* Quick View Floating Overlay Button */}
          <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 text-xs font-semibold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-3.5 h-3.5 text-emerald-600" /> Quick View
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isOutOfStock ? (
              <Badge className="bg-rose-600 hover:bg-rose-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                Out Of Stock
              </Badge>
            ) : isLowStock ? (
              <Badge className="bg-amber-600 hover:bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : isOnSale ? (
              <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                Sale
              </Badge>
            ) : null}
          </div>
        </div>

        {/* Card Details */}
        <CardContent className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase text-[11px]">
                {categoryOptionsMap[product?.category] || product?.category}
              </span>
              <span className="text-zinc-400 font-medium text-[11px]">
                {brandOptionsMap[product?.brand] || product?.brand}
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
              {product?.title}
            </h3>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            {isOnSale ? (
              <>
                <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">
                  ${product?.salePrice}
                </span>
                <span className="text-xs text-zinc-400 line-through font-medium">
                  ${product?.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* Action Footer */}
      <CardFooter className="px-5 pb-5 pt-0">
        {isOutOfStock ? (
          <Button disabled className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 font-medium rounded-xl cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-zinc-900 hover:bg-emerald-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-emerald-500 dark:hover:text-white text-white font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
