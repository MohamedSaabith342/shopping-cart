import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

function ProductFilter({ filters, handleFilter }) {
  const hasActiveFilters = filters && Object.keys(filters).some(key => filters[key]?.length > 0);

  function handleClearFilters() {
    sessionStorage.removeItem("filters");
    window.location.reload();
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden h-fit sticky top-24">
      <div className="p-5 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
            Filter Catalog
          </h2>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-zinc-500 hover:text-rose-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
        )}
      </div>

      <div className="p-5 space-y-6">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={keyItem}>
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {keyItem}
              </h3>
              <div className="space-y-2.5">
                {filterOptions[keyItem].map((option) => {
                  const isChecked =
                    filters &&
                    Object.keys(filters).length > 0 &&
                    filters[keyItem] &&
                    filters[keyItem].indexOf(option.id) > -1;

                  return (
                    <Label
                      key={option.id}
                      className={`flex items-center gap-2.5 text-xs font-medium cursor-pointer transition-colors p-1.5 rounded-lg ${
                        isChecked
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                        className="rounded-md border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <span>{option.label}</span>
                    </Label>
                  );
                })}
              </div>
            </div>
            {index < Object.keys(filterOptions).length - 1 && <Separator className="bg-zinc-200/60 dark:bg-zinc-800" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
