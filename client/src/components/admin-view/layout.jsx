import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
function AdminLayout() {
  return (
    <div>
        <AdminSidebar />
        <div>
            <AdminHeader />
            <main>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout;