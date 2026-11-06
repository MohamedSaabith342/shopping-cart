import { Card, CardContent } from "@/components/ui/card";
import { capturePayment } from "../../store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center rounded-3xl border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl space-y-6">
        <CardContent className="p-0 space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 font-heading">
            Verifying PayPal Payment...
          </h2>
          <p className="text-xs text-zinc-500">
            Please do not refresh or close this window while we finalize your transaction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaypalReturnPage;
