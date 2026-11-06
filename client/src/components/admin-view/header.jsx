import { Menu, LogOut, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    sessionStorage.removeItem("filters");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="lg:hidden rounded-xl"
      >
        <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/20">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>Administrator Portal</span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="h-9 px-4 text-xs font-bold rounded-xl border-zinc-200 dark:border-zinc-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;