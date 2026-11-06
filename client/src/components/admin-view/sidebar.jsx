import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "products",
    label: "Products Catalog",
    path: "/admin/products",
    icon: <ShoppingBasket className="w-4 h-4" />,
  },
  {
    id: "orders",
    label: "Customer Orders",
    path: "/admin/orders",
    icon: <BadgeCheck className="w-4 h-4" />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;

        return (
          <button
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              if (setOpen) setOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 text-left ${
              isActive
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40 font-extrabold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-zinc-950 text-white p-6 border-r border-zinc-800">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-zinc-800 pb-4 text-left">
              <SheetTitle className="flex items-center gap-2 text-xl font-bold font-heading text-white">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                SHOPVERSE Admin
              </SheetTitle>
              <SheetDescription className="text-xs text-zinc-400">
                Store management dashboard controls
              </SheetDescription>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-zinc-800 bg-zinc-950 p-6 lg:flex text-white shrink-0 min-h-screen">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2.5 pb-6 border-b border-zinc-800"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight font-heading">
              SHOPVERSE <span className="text-xs text-emerald-400 font-semibold uppercase">Admin</span>
            </h1>
          </div>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
