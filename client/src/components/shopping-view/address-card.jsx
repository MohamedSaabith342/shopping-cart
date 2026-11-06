import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, Phone, Edit, Trash2, CheckCircle } from "lucide-react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-200 rounded-2xl overflow-hidden border ${
        isSelected
          ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-600/30"
          : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <MapPin className="w-3.5 h-3.5" /> Address Card
          </div>
          {isSelected && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3" /> Selected
            </span>
          )}
        </div>

        <div className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
          <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            {addressInfo?.address}
          </p>
          <p>{addressInfo?.city}, {addressInfo?.pincode}</p>
          <div className="flex items-center gap-1.5 pt-1 text-zinc-500">
            <Phone className="w-3 h-3 text-zinc-400" />
            <span>{addressInfo?.phone}</span>
          </div>
          {addressInfo?.notes && (
            <p className="text-zinc-400 italic pt-1 text-[11px]">
              Notes: {addressInfo?.notes}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-5 py-3 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200/60 dark:border-zinc-800 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
          className="h-8 px-2.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 flex items-center gap-1"
        >
          <Edit className="w-3.5 h-3.5" /> Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="h-8 px-2.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
