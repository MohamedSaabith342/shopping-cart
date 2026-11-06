import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center rounded-3xl border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl space-y-6">
        <CardContent className="p-0 space-y-6">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-900/20">
            <CheckCircle2 className="w-10 h-10 animate-in zoom-in-50 duration-500" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Payment Confirmed
            </span>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-heading">
              Order Placed Successfully!
            </h1>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
              Thank you for shopping with SHOPVERSE. We have received your order and are preparing it for shipment.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              onClick={() => navigate("/shop/account")}
              className="w-full py-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
            >
              <span>View Order Details</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => navigate("/shop/home")}
              variant="outline"
              className="w-full py-5 rounded-xl border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
