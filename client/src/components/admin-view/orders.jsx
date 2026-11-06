import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { Package, Eye } from "lucide-react";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(id) {
    dispatch(getOrderDetailsForAdmin(id));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <CardHeader className="border-b border-zinc-200/80 dark:border-zinc-800 p-5">
        <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-heading">
          <Package className="w-4 h-4 text-emerald-600" />
          <span>All Customer Orders ({orderList?.length || 0})</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Dialog
          open={openDetailsDialog}
          onOpenChange={(open) => {
            setOpenDetailsDialog(open);
            if (!open) dispatch(resetOrderDetails());
          }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50 dark:bg-zinc-900/80">
                <TableRow className="border-b border-zinc-200/80 dark:border-zinc-800">
                  <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Order ID</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Order Date</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Status</TableHead>
                  <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Total Price</TableHead>
                  <TableHead className="text-right text-xs font-bold text-zinc-700 dark:text-zinc-300">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orderList && orderList.length > 0 ? (
                  orderList.map((orderItem) => {
                    const isConfirmed = orderItem?.orderStatus === "confirmed" || orderItem?.orderStatus === "delivered";
                    const isRejected = orderItem?.orderStatus === "rejected";

                    return (
                      <TableRow key={orderItem._id} className="border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                        <TableCell className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {orderItem._id}
                        </TableCell>
                        <TableCell className="text-xs text-zinc-600 dark:text-zinc-400">
                          {orderItem.orderDate?.split("T")[0]}
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={`py-0.5 px-2.5 rounded-full text-[11px] font-bold ${
                              isConfirmed
                                ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                                : isRejected
                                ? "bg-rose-600 hover:bg-rose-600 text-white"
                                : "bg-amber-600 hover:bg-amber-600 text-white"
                            }`}
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          ${orderItem.totalAmount}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.currentTarget.blur();
                              handleFetchOrderDetails(orderItem._id);
                            }}
                            className="h-8 text-xs font-semibold rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            <span>Manage</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-xs text-zinc-400">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <AdminOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
