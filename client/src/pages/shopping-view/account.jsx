import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Package, MapPin, Sparkles, UserCheck } from "lucide-react";

function ShoppingAccount() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-background min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Account Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 p-8 md:p-10 text-white border border-zinc-800 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Avatar className="h-16 w-16 border-2 border-emerald-500 shadow-lg">
                <AvatarFallback className="bg-emerald-950 text-emerald-400 font-black text-xl">
                  {user?.userName ? user.userName[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black font-heading text-white">
                    {user?.userName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
                    <UserCheck className="w-3 h-3" /> Member
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-medium">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-400 bg-zinc-900/80 border border-zinc-800/80 px-4 py-3 rounded-2xl">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>SHOPVERSE VIP Member Perks Active</span>
            </div>
          </div>
        </div>

        {/* Tabbed Content Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 md:p-8 shadow-sm">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-8 h-12 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl">
              <TabsTrigger
                value="orders"
                className="rounded-lg text-xs font-bold flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="rounded-lg text-xs font-bold flex items-center justify-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Address Book</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>

            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
