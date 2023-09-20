import NavBar from "~/components/partials/navBar";
import SideBar from "~/components/partials/sideBar";
import AuthGuard from "~/components/guards/authGuard";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const AppLayout = ({ children, isLoading }: Props) => (
  <AuthGuard>
    <NavBar />
    <div className="drawer w-full lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex w-full shrink flex-col px-4 py-8 pt-24 md:px-12">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          children
        )}
      </div>
      <SideBar />
    </div>
  </AuthGuard>
);

export default AppLayout;
