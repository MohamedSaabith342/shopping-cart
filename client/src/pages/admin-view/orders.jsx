import AdminOrdersView from "@/components/admin-view/orders";

function AdminOrders() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Fulfillment
        </span>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-heading mt-1">
          Customer Orders Overview
        </h1>
      </div>
      <AdminOrdersView />
    </div>
  );
}

export default AdminOrders;
