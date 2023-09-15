import NavBar from "~/components/partials/navBar";
import SideBar from "~/components/partials/sideBar";
import AuthGuard from "~/components/guards/authGuard";
const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard>
    <NavBar />
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex w-full flex-col px-12 py-8 pt-24">
        {children}
      </div>
      <SideBar />
    </div>
  </AuthGuard>
);

export default AppLayout;
