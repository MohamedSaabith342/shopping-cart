import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const isOnSale = product?.salePrice > 0;

  return (
    <Card className="w-full mx-auto border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative w-full h-[220px] bg-zinc-100 dark:bg-zinc-800">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
          {isOnSale && (
            <Badge className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
              Sale Active
            </Badge>
          )}
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
            {product?.title}
          </h3>
          <div className="flex items-baseline gap-2">
            {isOnSale ? (
              <>
                <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                  ${product?.salePrice}
                </span>
                <span className="text-xs text-zinc-400 line-through">
                  ${product?.price}
                </span>
              </>
            ) : (
              <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
          className="flex-1 h-9 text-xs font-bold rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 flex items-center justify-center gap-1.5"
        >
          <Edit2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Edit</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleDelete(product?._id)}
          className="flex-1 h-9 text-xs font-bold rounded-xl border-zinc-200 dark:border-zinc-800 text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
